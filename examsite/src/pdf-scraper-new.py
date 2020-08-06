import re
from PyPDF2 import PdfFileWriter, PdfFileReader
import pdfminer
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.pdfpage import PDFPage
from pdfminer.layout import *
from pdf2image import convert_from_path
from PIL import Image

"""THREE CASES:
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

pdfName = "examsite/papers/cs2018q.pdf"
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

outputFolder = "examsite/pdfParses/"
outputFolder += "questionsOutput" if not isMarkscheme else "markschemeOutput"

questionRegexMatch = re.compile(r"(\d+\.(\D|\s*$))") #ADDED (\D|\s*$) TO PREVENT THINGS LIKE "100.4" FROM MATCHING
subQuestionRegexMatch = re.compile(r"\(\w\)")

questionContinued = re.compile(r"\(*Q*uestion \d+ continued\)*")

parsingQuestionNum = 0
filenameQuestionNum = 0
contQuestionMarker = ""

for index, page in enumerate(PDFPage.get_pages(document)):
    print("++++++++++++ NEXT PAGE ++++++++")
    firstQuestionOnPage = True
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
                    yValuesForQuestion.append(element.y1)
                    parsingQuestionNum += 1
            elif isinstance(element, LTTextBoxHorizontal): #CASE 2 AND 3, CASE 4 AND 5
                stripped = element.get_text().strip()
                if re.search("^\d+\.(\s+|$)", stripped): #CASE 2 AND 3
                    print("case 2 and 3")
                    print(stripped.split(".")[0])
                    
                    if continuedQuestion or (isNewMarkscheme and len(yValuesForSubQuestion) > 0): #CASE 4 AND 5 AND 6 OR CASE 8
                        if (not isNewMarkscheme and len(yValuesForSubQuestion) > 0) \
                            or (isNewMarkscheme and yValuesForSubQuestion[0] > element.y1):
                            yValuesForQuestion.append(yValuesForSubQuestion[0])
                            print("add previous sub question")
                        elif noSubQuestionIndicator: #CASE 7
                            yValuesForQuestion.append(tempYForContinued)
                        indexesOfOverflowQ.append(len(yValuesForQuestion) - 1)
                    
                    firstQuestionOnPage = False
                    noQuestionIndicator = False
                    continuedQuestion = False
                    yValuesForQuestion.append(element.y1)
                    parsingQuestionNum += 1
                elif re.search("^\(*\w?\)", stripped) and firstQuestionOnPage: #CASE 4 AND 5
                    firstQuestionOnPage = False
                    noSubQuestionIndicator = False
                    yValuesForSubQuestion.append(element.y1) #EVERY OTHER CONTINUED CASE
                    print("question:" , stripped, "end")
                if not isNewMarkscheme and questionContinued.match(stripped): #CASE 4, 5
                    print("continued question")
                    continuedQuestion = True
                    tempYForContinued = element.y1 #CASE 7
                
        else: #if it's a question paper
            if isinstance(element, LTTextBox):
                print(element)
                stripped = element.get_text().strip()
                if(questionRegexMatch.match(element.get_text())):
                    firstQuestionOnPage = False
                    noQuestionIndicator = False
                    if len(yValuesForSubQuestion) > 0:
                        yValuesForQuestion.append(yValuesForSubQuestion[0])
                        indexesOfOverflowQ.append(len(yValuesForQuestion) - 1)
                    yValuesForQuestion.append(element.y1)
                    print("question:" , repr(questionRegexMatch.match(element.get_text()).group()), "end")
                elif(subQuestionRegexMatch.match(element.get_text()) and firstQuestionOnPage):
                    yValuesForSubQuestion.append(element.y1)
                    print("question:" , repr(subQuestionRegexMatch.match(element.get_text()).group()), "end")
                elif(questionContinued.match(element.get_text())):
                    noQuestionIndicator = False
                    print("next page: ", element.get_text(), "end")
                    qNum = element.get_text().split(" ")[1]
                    print("questionNum " + str(qNum))
                    yValuesForQuestion.append(element.y1)
                    indexesOfOverflowQ.append(len(yValuesForQuestion) - 1)
    
    if noQuestionIndicator: #if no indicator, add the whole page
        print("somehow triggered noQuestion")
        if isMarkscheme:
            yValuesForQuestion.append(layout.height)
            indexesOfOverflowQ.append(len(yValuesForQuestion) - 1)
    
    #if question paper or new markscheme
    print("len(yValuesForQuestion)", len(yValuesForQuestion))
    yValuesForQuestion.sort(reverse=True) #ensures question y values are in order of the questions
    for i in range(0, len(yValuesForQuestion)):
        #https://stackoverflow.com/a/465901
        output = PdfFileWriter()
        page1 = pdf_file.getPage(index)

        if(i == len(yValuesForQuestion) - 1):
            page1.cropBox.upperRight = (page1.mediaBox.getLowerLeft_x(), yValuesForQuestion[i])
            page1.cropBox.lowerLeft = (page1.mediaBox.getLowerRight_x(),  page1.mediaBox.getLowerRight_y())
        else:
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
        
        jpgOutputPath = outputFolder + "/jpgs/question_" + str(filenameQuestionNum) + contQuestionMarker + ".jpg"
        questionsJpg = convert_from_path(pdfOutputPath, use_cropbox=True)
        for jpg in questionsJpg:
            jpg.save(jpgOutputPath, "JPEG")


        