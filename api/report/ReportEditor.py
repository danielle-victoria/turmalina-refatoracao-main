from report import helpers
from docxtpl import DocxTemplate
from report.evaluation import EVALUATION_MODEL, dictionary_order
import os
import copy



package_directory = os.path.dirname(os.path.abspath(__file__))


def report_edit(raw_evaluation, date):
    # key name workaround
    raw_evaluation['detailed_evaluation']['Bid'] = raw_evaluation['detailed_evaluation']['Bidding']
    del raw_evaluation['detailed_evaluation']['Bidding']

    document = DocxTemplate(f"{package_directory}/resources/ReportTemplate.docx")

    evaluation = raw_evaluation['detailed_evaluation']

    s_evaluation = copy.deepcopy(evaluation)

    # Assign values with SIM and NÃO values
    for itemtype in evaluation:
        for itemprop, value in evaluation[itemtype].items():
            new_value = 'SIM' if value is not None else 'NÃO'
            s_evaluation[itemtype][itemprop] = new_value

    # Replace None values with 0
    for key in evaluation:
        for key2 in evaluation[key]:
            if evaluation[key][key2] == None:
                evaluation[key][key2] = 0

    scores = helpers.get_scores(evaluation)

    # =================== Values ===================

    # Assignment of total sums
    totalReceived = helpers.get_score(evaluation)
    totalMax = helpers.get_score(EVALUATION_MODEL)

    totalReceivedMax = round((totalReceived / totalMax) * 100)
    totalReceivedMaxString = str(totalReceivedMax) + '%'  # String with the percentage
    ## totalReceivedMaxString = totalReceivedMaxString.replace('.', ',')

    totalRM = str(totalReceived)+'/'+str(totalMax)

    totalGrade = round(((totalReceived / totalMax) * 10), 1)
    totalGrade = str(totalGrade)
    totalGrade = totalGrade.replace('.', ',')
    

    # =================== Graphics ===================

    # List with categories
    properties = []

    for itemtype, itemprop in dictionary_order.items():
        properties.append(itemprop)

    # =================== Donut Graphs Plot ========================
    w, h = 0, 10
    donutScores = [[0 for x in range(w)] for y in range(h)]

    # Two-dimensional list containing all received and "remaining" scores
    for index, itemtype in enumerate(dictionary_order):
        donutScores[index].append(scores['receivedScore'][itemtype]['total'])
        donutScores[index].append(max(
            scores['maxScore'][itemtype]['total'] - scores['receivedScore'][itemtype]['total'], 0))

    donutCharts = []  # List that will contain the objects related to the donut charts
    for index, itemtype in enumerate(dictionary_order):
        # At each interaction, a donut chart is created for a category
        donutCharts.append(helpers.donut_plot(
            document, scores, itemtype, properties[index], donutScores[index]))

    # =================== Performance Graph Plot ===================
    performance = []  # List with the grades of the categories

    for itemtype, itemprop in dictionary_order.items():
        if scores['maxScore'][itemtype]['total'] > 0:
            performance.append(
                (scores['receivedScore'][itemtype]['total'] / scores['maxScore'][itemtype]['total']) * 100)
        else:
            # Any categories with a maximum score of zero are removed
            properties.remove(itemprop)

    # Inversion of Order
    properties = list(reversed(properties))
    performance = list(reversed(performance))

    chartPerformance = helpers.performance_plot(
        document, properties, performance)

    # =================== Context ===================
    raw_evaluation["start_datetime"] =  date[8:] + "/" + date[5:7] + "/" + date[:4]

    context = {
        'record': raw_evaluation,
        'totalGrade': totalGrade,
        'totalReceivedMax': totalReceivedMax,
        'totalReceivedMaxString': totalReceivedMaxString,
        'totalRM': totalRM,
        'chartPerformance': chartPerformance,
        'donutPlanningInstrument': donutCharts[0],
        'donutBidding': donutCharts[1],
        'donutContract': donutCharts[2],
        'donutAgreement': donutCharts[3],
        'donutBudgetRevenue': donutCharts[4],
        'donutExtraBudgetRevenue': donutCharts[5],
        'donutBudgetExpenditure': donutCharts[6],
        'donutExtraBudgetExpenditure': donutCharts[7],
        'donutPaymentDocument': donutCharts[8],
        'donutEmployeeInformation': donutCharts[9]
    }

    for itemtype in s_evaluation:
        context[itemtype] = s_evaluation[itemtype]

    for itemtype in scores:
        context[itemtype] = scores[itemtype]

    document.render(context)
    document.save(f'{package_directory}/outputs/Report.docx')

    # Code to convert docx to pdf Libreoffice
    helpers.convert_to_pdf(f'{package_directory}/outputs/Report.docx', f'{package_directory}/outputs')

### {{ chartScore }} in ReportTemplate.docx