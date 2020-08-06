import re
from PyPDF2 import PdfFileWriter, PdfFileReader
import pdfminer
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.pdfpage import PDFPage
from pdfminer.layout import *
from pdf2image import convert_from_path

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

pdfName = "examsite/papers/cs2018Mq.pdf"
document = open(pdfName, "rb") #Create resource manager
pdf_file = PdfFileReader(open(pdfName,"rb"))
rsrcmgr = PDFResourceManager()
laparams = LAParams(detect_vertical=True, line_margin=0.1) # detect_vertical allows q nums to be parsed as individual elements, line_margin allows parsed text to be in order
device = PDFPageAggregator(rsrcmgr, laparams=laparams)
interpreter = PDFPageInterpreter(rsrcmgr, device)

isMarkscheme = True if input("Is this a markscheme? (Y/N)").strip().lower() == "y" else False
isNewMarkscheme = True
if isMarkscheme:
    isNewMarkscheme = True if int(input("Enter year please: (eg. 2014)")) > 2014 else False #if year entered is > 2014, then isNewMarkscheme = True

#config output path folders
outputFolder = "examsite/pdfParses/"  
outputFolder += "questionsOutput" if not isMarkscheme else "markschemeOutput"

#regex matches to check for questions and subquestions
questionRegexMatch = re.compile(r"(\d+\.(\D|\s*$))") #EDIT: ADDED (\D|\s*$) TO PREVENT THINGS LIKE "100.4" FROM MATCHING
subQuestionRegexMatch = re.compile(r"\(\w\)")
questionContinued = re.compile(r"\(*Q*uestion \d+ continued\)*")

#vars to keep track of question numbers for parsing and output purposes
parsingQuestionNum = 0 #prevents triggers for textboxes that contain a digit but are not a question num
filenameQuestionNum = 0
contQuestionMarker = ""

for index, page in enumerate(PDFPage.get_pages(document)): #parse page by page
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
                    print("case 1")
                    print(stripped)
                    firstQuestionOnPage = False
                    noQuestionIndicator = False
                    yValuesForQuestion.append(element.y1) #add the question to crop for later
                    parsingQuestionNum += 1 
            elif isinstance(element, LTTextBoxHorizontal): #CASE 2 AND 3, CASE 4 AND 5
                stripped = element.get_text().strip()
                if re.search("^\d+\.(\s+|$)", stripped): #CASE 2 AND 3
                    print("case 2 and 3")
                    print(stripped.split(".")[0])
                    
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
                    print("question:" , stripped, "end")
                if not isNewMarkscheme and questionContinued.match(stripped): #CASE 4, 5, if old markscheme and matches Question _ continued
                    print("continued question")
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
        print("triggering no question indicator")
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

        pdfOutputPath = outputFolder + "/question_" + str(filenameQuestionNum) + contQuestionMarker + ".pdf"
        with open(pdfOutputPath, "wb") as out_f:
            output.write(out_f)
        
        #convert to jpg
        jpgOutputPath = outputFolder + "/jpgs/question_" + str(filenameQuestionNum) + contQuestionMarker + ".jpg"
        questionsJpg = convert_from_path(pdfOutputPath, use_cropbox=True)
        for jpg in questionsJpg:
            jpg.save(jpgOutputPath, "JPEG")


        