import re
import os
import io
from PyPDF2 import PdfFileWriter, PdfFileReader
import pdfminer
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.pdfpage import PDFPage
from pdfminer.layout import *
from pdf2image import convert_from_path, convert_from_bytes
from google.cloud import storage
from tempfile import NamedTemporaryFile, mkstemp

"""
FOR MARKSCHEME:
THREE CASES:
1. <LTTextBoxVertical(30) 42.730,715.548,48.730,745.296 ' 1\n'>
2. <LTTextBoxHorizontal(28) 42.730,715.308,54.730,758.904 '4. \n \n \n'>
3. <LTTextBoxHorizontal(3) 42.730,646.188,502.280,662.256 '10.  Award [1 mark...

CONTINUED CASES:
4. <LTTextBoxHorizontal(15) 42.730,743.148,154.380,759.108 'Question 12 continued \n'>
5. <LTTextBoxHorizontal(3) 51.396,715.548,154.380,731.508 'uestion 14 continued \n'>
6. <LTTextBoxHorizontal(12) 71.080,715.548,257.768,731.616 '(e)  Award up to [3 marks max] for: \n'>
   <LTTextBoxHorizontal(13) 42.730,743.148,154.380,759.108 'Question 14 continued \n'>
    continued trigger comes after the subquestion trigger, not in order
7. <LTTextBoxHorizontal(15) 42.730,743.148,154.380,759.108 'Question 12 continued \n'>
    but then no "(a)" or "1." trigger
8. <LTTextBoxHorizontal(1) 374.396,782.700,555.905,797.394 'M15/4/COMSC/HP1/ENG/TZ0/XX/M \n'>
   <LTTextBoxHorizontal(2) 70.918,731.823,325.390,759.809 '(d)  Award marks as follows up to [3 marks max]. \n \n'>
    no "Question _ continued" trigger
"""

#MAKE THIS TO views.py AND RECEIVE FETCH REQUEST FROM JS INCLUDING THE PDF, THEN PROCESS PDF WITH THIS CODE, AND THEN SEND BACK HTTP RESPONSE WITH JSON OF STRINGS
#DOWNLOAD PDF HERE

#data["paperType"], data["year"], data["session"], data["level"], data["filename"], data["isMarkscheme"]
def parse_pdf_util(paperType, year, session, level, filename, pageStartNum, isMarkscheme):
    #download_pdf(filename)

    # https://stackoverflow.com/a/38642680
    # Initialize
    client = storage.Client()
    bucket = client.get_bucket('examprep-a775e.appspot.com')

    # Download
    download_blob = bucket.get_blob('uploadedPdfs/' + filename)
    pdfData = download_blob.download_as_string()  
    # https://stackoverflow.com/questions/13619600/how-to-generate-temporary-file-in-django-and-then-destroy
    tempPdf = NamedTemporaryFile()
    tempPdf.write(pdfData)

    pdf_file = PdfFileReader(tempPdf)
    rsrcmgr = PDFResourceManager()
    laparams = LAParams(detect_vertical=True, line_margin=0.1) # detect_vertical allows q nums to be parsed as individual elements, line_margin allows parsed text to be in order
    device = PDFPageAggregator(rsrcmgr, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)

    isNewMarkscheme = True
    if isMarkscheme:
        isNewMarkscheme = True if int(year) > 2014 else False #if year entered is > 2014, then isNewMarkscheme = True
    
    # #config output path folders
    outputFolder = "parsed/"
    outputFolder += str(session) + year[2:] + level + "P" + str(paperType) + "/"
    outputFolder += "questions/" if not isMarkscheme else "answers/"
    
    #regex matches to check for questions and subquestions
    questionRegexMatch = re.compile(r"(\d+\.(\D|\s*$))") #EDIT: ADDED (\D|\s*$) TO PREVENT THINGS LIKE "100.4" FROM MATCHING
    subQuestionRegexMatch = re.compile(r"\(\w\)")
    questionContinued = re.compile(r"\(*Q*uestion \d+ continued\)*")

    #vars to keep track of question numbers for parsing and output purposes
    parsingQuestionNum = 0 #prevents triggers for textboxes that contain a digit but are not a question num
    filenameQuestionNum = 0
    contQuestionMarker = ""

    for index, page in enumerate(PDFPage.get_pages(tempPdf)): #parse page by page
        if index < (int(pageStartNum) - 1):
            continue
        firstQuestionOnPage = True #used mainly for subquestion checking so it only adds the first subquestion's y value of a question, keeps the other subqs in 1 image
        noQuestionIndicator = True #whether or not there's a question trigger for this whole page
        noSubQuestionIndicator = True #whether or not there's a subquestion trigger for continuedQuestion
        continuedQuestion = False #whether or not it's a continued question (i.e. "Question _ continued")
        yValuesForQuestion = [] #store y1 values of questions (eg. "1.", "2.", "3.")
        yValuesForSubQuestion = [] #store y1 values of subquestions (eg. "(a)", "(b)", "(c)")
        indexesOfOverflowQ = [] #store indexes of elements in yValuesForQuestion where the question is 
        tempYForContinued = 0.0 #temporarily store y1 value of "Question _ continued" element in case no sub question trigger

        interpreter.process_page(page) # receive the LTPage object for the page.
        layout = device.get_result()
        
        for element in layout:
            if isMarkscheme: #if it is a markscheme
                if isinstance(element, LTTextBoxVertical): #CASE 1
                    stripped = element.get_text().strip()
                    if re.search("^\d+", stripped) and int(stripped) == parsingQuestionNum + 1: #if it's number and corresponds to next q num 
                        firstQuestionOnPage = False
                        noQuestionIndicator = False
                        yValuesForQuestion.append(element.y1) #add the question to crop for later
                        parsingQuestionNum += 1 
                elif isinstance(element, LTTextBoxHorizontal): #CASE 2 AND 3, CASE 4 AND 5
                    stripped = element.get_text().strip()
                    if re.search("^\d+\.(\s+|$)", stripped): #CASE 2 AND 3
                        if continuedQuestion or (isNewMarkscheme and len(yValuesForSubQuestion) > 0): #CASE 4 AND 5 AND 6 OR CASE 8
                            if (not isNewMarkscheme and len(yValuesForSubQuestion) > 0) \
                                or (isNewMarkscheme and yValuesForSubQuestion[0] > element.y1): #if old markscheme and there's subquestions, or if new markscheme and the subquestion is above currently parsed question
                                yValuesForQuestion.append(yValuesForSubQuestion[0]) #add the subquestion to crop for later
                            elif noSubQuestionIndicator: #CASE 7
                                yValuesForQuestion.append(tempYForContinued) #add the text to crop for later
                            indexesOfOverflowQ.append(len(yValuesForQuestion) - 1) #incidate it's a continued q and add "i"s to filename
                        
                        firstQuestionOnPage = False
                        noQuestionIndicator = False
                        continuedQuestion = False
                        yValuesForQuestion.append(element.y1) #add the question to crop for later
                        parsingQuestionNum += 1
                    elif re.search("^\(*\w?\)", stripped) and firstQuestionOnPage: #CASE 4 AND 5, if matches subquestion regex and is first subquestion on page
                        firstQuestionOnPage = False
                        noSubQuestionIndicator = False
                        yValuesForSubQuestion.append(element.y1) #add the subquestion to temp list, potentially crop for later
                    if not isNewMarkscheme and questionContinued.match(stripped): #CASE 4, 5, if old markscheme and matches Question _ continued
                        continuedQuestion = True
                        tempYForContinued = element.y1 #CASE 7, set top of page to temp in case no subquestion trigger
                    
            else: #if it's a question paper
                if isinstance(element, LTTextBox):
                    stripped = element.get_text().strip()
                    if(questionRegexMatch.match(element.get_text())): #if there's a question number
                        firstQuestionOnPage = False
                        noQuestionIndicator = False
                        if len(yValuesForSubQuestion) > 0: #if there were subquestions before the question trigger
                            yValuesForQuestion.append(yValuesForSubQuestion[0]) #add the subquestion to crop for later
                            indexesOfOverflowQ.append(len(yValuesForQuestion) - 1) #incidate it's a continued q and add "i"s to filename
                        yValuesForQuestion.append(element.y1) #add the question to crop for later
                    elif(subQuestionRegexMatch.match(element.get_text()) and firstQuestionOnPage): #if subquestion and it's the first thing on page
                        yValuesForSubQuestion.append(element.y1) #add the subquestion to temp list, potentially crop for later
                    elif(questionContinued.match(element.get_text())): #if (Question _ continued)
                        noQuestionIndicator = False
                        qNum = element.get_text().split(" ")[1] #get the continued question num
                        yValuesForQuestion.append(element.y1) #add text to crop for later
                        indexesOfOverflowQ.append(len(yValuesForQuestion) - 1) #incidate it's a continued q and add "i"s to filename
        
        if noQuestionIndicator and isMarkscheme: #if no indicator and is markscheme, add the whole page
            yValuesForQuestion.append(layout.height)
            indexesOfOverflowQ.append(len(yValuesForQuestion) - 1)
        
        yValuesForQuestion.sort(reverse=True) #ensures question y values are in order of the questions
        for i in range(0, len(yValuesForQuestion)): #loop through y values to crop
            #https://stackoverflow.com/a/465901
            output = PdfFileWriter()
            page1 = pdf_file.getPage(index)

            if(i == len(yValuesForQuestion) - 1): #if last question on page, crop till the bottom of page
                page1.cropBox.upperRight = (page1.mediaBox.getLowerLeft_x(), yValuesForQuestion[i])
                page1.cropBox.lowerLeft = (page1.mediaBox.getLowerRight_x(),  page1.mediaBox.getLowerRight_y())
            else: #crop till next question
                page1.cropBox.upperRight = (page1.mediaBox.getLowerLeft_x(), yValuesForQuestion[i])
                page1.cropBox.lowerLeft = (page1.mediaBox.getLowerRight_x(), yValuesForQuestion[i + 1])
                
            output.addPage(page1)
            if i not in indexesOfOverflowQ: #if current crop is NOT a question that's continued from previous page
                contQuestionMarker = ""
                filenameQuestionNum += 1
            else:
                contQuestionMarker += "i"

            filename = str(filenameQuestionNum) + contQuestionMarker + ".jpg"

            handle, filepath = mkstemp()
            tempQ = open(filepath, "wb")
            output.write(tempQ)
            tempQ.seek(0) #go back to beginning of file

            questionsJpg = convert_from_path(filepath, use_cropbox=True)
            for jpg in questionsJpg:
                # https://stackoverflow.com/a/56055505
                imgByteArr = io.BytesIO()
                jpg.save(imgByteArr, format='JPEG')
                data = imgByteArr.getvalue()
                upload_blob = bucket.blob(outputFolder + filename)
                upload_blob.upload_from_string(data, content_type="image/jpeg")
 
            os.remove(filepath)
            
    tempPdf.close()

        