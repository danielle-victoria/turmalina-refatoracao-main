from report.evaluation import EVALUATION_MODEL
from urllib.parse import urlencode, quote
from docxtpl import InlineImage
from docx.shared import Cm
import matplotlib.pyplot as plt
from subprocess import Popen
import requests
import os

import matplotlib
matplotlib.use('agg')

package_directory = os.path.dirname(os.path.abspath(__file__))

# Need to be adapted to the server
LIBRE_OFFICE = os.getenv("PRODUCTION_PATH")


def get_score(evaluation):
    return sum(
        [sum(properties.values()) for properties in evaluation.values()]
    )


def get_score_dict(evaluation):
    score_dict = dict()
    for itemtype, properties in evaluation.items():
        score_dict[itemtype] = dict()
        for itemprop, value in properties.items():
            score_dict[itemtype][itemprop] = value
        score_dict[itemtype]['total'] = sum(properties.values())
    score_dict['total'] = get_score(evaluation)
    return score_dict

def get_percent_dict(evaluation):
    percent_scores = dict()
    for category, max_scores in EVALUATION_MODEL.items():
        if category in evaluation:
            percent_scores[category] = dict()
            received_scores = evaluation[category]
            total_received = sum(received_scores.values())
            total_max = sum(max_scores.values())
            for score_key, score_value in received_scores.items():
                percent = round(score_value / max_scores[score_key] * 100)
                percent_scores[category][score_key] = percent
            total_percent = round(total_received / total_max * 100)
            percent_scores[category]['total'] = total_percent
        percent_scores['total'] = get_score(evaluation)
    return percent_scores


def get_scores(evaluation):
    return {
        'receivedScore': get_score_dict(evaluation),
        'maxScore': get_score_dict(EVALUATION_MODEL),
        'percentScore': get_percent_dict(evaluation),
    }


def convert_to_pdf(input_docx, out_folder):
    p = Popen([LIBRE_OFFICE, '--headless', '--convert-to',
              'pdf', input_docx, '--outdir', out_folder])
    p.communicate()



def donut_plot(document, scores, itemtype, propertie, donutScores):
    # For cases where some item has all its scores reset
    if scores['maxScore'][itemtype]['total'] == 0:
        # Only a white image is generated
        my_circle = plt.Circle((0, 0), 0.8, color='white')

        plt.savefig(f'{package_directory}/outputs/Donut' + itemtype + '.png')

        donutChart = InlineImage(
            document, f'{package_directory}/outputs/Donut' + itemtype + '.png', Cm(6))

        plt.close()

        return donutChart

    else:
        # Original turmalina colors: #64c9c5 #ebebeb
        colors = ['#b90504', '#ebebeb']
        # Adjust for donut charts to be defaulted
        plt.pie(donutScores, colors=colors, startangle=90, counterclock=False)
        # Adjust the size of the chart
        plt.size = (5, 5)
        my_circle = plt.Circle((0, 0), 0.8, color='white')
        plt.title(propertie, y=-0.07, fontsize=24)
        plt.text(0, 0, f'{donutScores[0]}/{donutScores[1] + donutScores[0]}',
                 fontsize=30, ha='center', va='center')
        p = plt.gcf()
        p.gca().add_artist(my_circle)

        # File with name referring to the correct type
        plt.savefig(f'{package_directory}/outputs/Donut' + itemtype + '.png')

        # Add objects to the list
        donutChart = InlineImage(
            document, f'{package_directory}/outputs/Donut' + itemtype + '.png', Cm(6))

        plt.close()

        return donutChart


def performance_plot(document, properties, performance):
    barList = plt.barh(properties, performance,
                       color='#b90504')  # The green one was #04b907
    plt.xlim(xmax=101)
    plt.title('Desempenho por Parâmetro')
    # plt.ylabel('Parâmetro')
    plt.xlabel('Avaliação (%)')
    for i, v in enumerate(performance):
        plt.text(v + 1.0, i - 0.09, '{:.0f}%'.format(v))

    plt.savefig(
        f'{package_directory}/outputs/ChartPerformance.png', bbox_inches='tight')

    chartPerformance = InlineImage(
        document, f'{package_directory}/outputs/ChartPerformance.png', Cm(18))

    plt.close()

    return chartPerformance
