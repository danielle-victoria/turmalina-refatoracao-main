from flask import Flask, jsonify, request, send_from_directory, render_template
from flask_cors import CORS
from playhouse.shortcuts import model_to_dict
from models import Evaluation, ManagementUnit
from functions import clear_null, get_timestamp_expression, score_sort
from report import ReportEditor
from datetime import datetime
from collections import defaultdict
from scrapyd_api import ScrapydAPI
from bs4 import BeautifulSoup
import os

CRAWLER_URL = "http://host.docker.internal:6800"

app = Flask(__name__)
CORS(app)

package_directory = os.path.dirname(os.path.abspath(__file__))


@app.route("/api/turmalina")
def evaluations_output():
    """
    [Route that returns all ratings available in the database]

    returns:
        [JSON]: [JSON with all ratings]
    """

    evaluations = Evaluation.select()
    evaluations = list(map(model_to_dict, evaluations))

    return jsonify(evaluations)


@app.route("/api/turmalina_dates")
def evaluations_dates():
    """
    [Route that returns all dates and identification of evaluations of a Public Entity]

    Args:
        entity([string]): [Public entity (send without graphic accent)]

    returns:
        [JSON]: [JSON with all dates and IDs]
    """

    public_entity = request.args.get('entity')

    try:
        dates = (Evaluation
                 .select(Evaluation.id, Evaluation.end_datetime)
                 .join(ManagementUnit)
                 .where((ManagementUnit.public_entity == public_entity) & (Evaluation.status == True) & (Evaluation.show == True))
                 .order_by(Evaluation.end_datetime.desc()))
    except:
        dates = []
    else:
        dates = clear_null(list(map(model_to_dict, dates)))

    return jsonify(dates)


@app.route("/api/turmalina_units")
def evaluations_units():
    """
    [Route that returns all Management Units available in the Database]

    returns:
        [JSON]: [JSON with the names of the Management Units]
    """

    try:
        units = (ManagementUnit
                 .select(ManagementUnit.id, ManagementUnit.name, ManagementUnit.public_entity)
                 .order_by(ManagementUnit.name))
    except:
        units = []
    else:
        units = clear_null(list(map(model_to_dict, units)))

    return jsonify(units)


@app.route("/api/turmalina_evaluationbyid")
def evaluations_by_id():
    """
    [Route that returns a rating from your ID]

    Args:
        id ([int]): [Identification of a database assessment]

    returns:
        [JSON]: [JSON with all evaluation fields]
    """

    identification = request.args.get('id')

    try:
        evaluation = (Evaluation
                      .select()
                      .where((Evaluation.id == int(identification)) & (Evaluation.show == True))
                      .get())
    except:
        evaluation = []
    else:
        evaluation = model_to_dict(evaluation)

    return jsonify(evaluation)


@app.route("/api/turmalina_managementunitdate")
def evaluation_managementunitdate(management_unit, date):
    """
    [Route taken to return the assessment with the best score given the Management Unit and date]

    Args:
        management_unit ([string]): [Management Unit Name (send without graphic accents)]
        date ([timestamp]): [Evaluation End Date (YYYY/MM/DD)]

    returns:
        [JSON]: [Evaluation JSON for role]
    """

    # management_unit = request.args.get('management_unit')
    # date = request.args.get('date')

    try:
        date = datetime.strptime(date, '%Y-%m-%d')
        evaluation = (
            Evaluation
            .select()
            .join(ManagementUnit)
            .where(
                (ManagementUnit.name == management_unit) &
                (Evaluation.end_datetime.year == date.year) &
                (Evaluation.end_datetime.month == date.month) &
                (Evaluation.end_datetime.day == date.day) &
                (Evaluation.status == True) & (Evaluation.show == True)
            )
            .order_by(Evaluation.score.desc())
            .get()
        )
    except:
        evaluation = []
    else:
        evaluation = model_to_dict(evaluation)

    return jsonify(evaluation)


@app.route("/api/turmalina_report")
def turmalina_report():
    """
    [Route made for the Tourmaline report, which will receive the parameters by the function and return the evaluation to the previous route]

    Args:

    returns:
        [PDF]: [PDF of the Evaluation Report]
    """

    management_unit = request.args.get('management_unit')
    date = request.args.get('date')

    response = evaluation_managementunitdate(management_unit, date)
    evaluation = response.json

    if not evaluation:
        print(f'Evaluation not found!')
        return
    try:
        ReportEditor.report_edit(evaluation, date)
    except Exception as err:
        print(f"Erro: {err}")
        return
    return send_from_directory(f"{package_directory}/report/outputs/", "Report.pdf")


@app.route("/api/turmalina_entitiestimestamp")
def evaluations_entitiestimestamp():
    """
    [Route that will return all ratings given two time periods and a Public Entity. If both timestamps are sent, the route returns all ratings that fall between the two dates.
    If only the first_timestamp is sent, the route returns all ratings that are after the date. If only the second_timestamp is sent, the route returns all ratings
    that are before the date.]

    Args:
        entity([string]): [Public entity (send without graphic accent)]
        first_timestamp ([timestamp]): [First timestamp - from when we get the ratings (YYYY/MM/DD HH:mm:ss.sss)]
        second_timestamp ([timestamp]): [Second timestamp - until when we get the ratings (YYYY/MM/DD HH:mm:ss.sss)]

    returns:
        [JSON]: [JSON with all ratings]
    """

    public_entity = request.args.get('entity')
    first_timestamp = request.args.get('first_timestamp')
    second_timestamp = request.args.get('second_timestamp')

    expression = get_timestamp_expression(first_timestamp, second_timestamp)

    try:
        evaluations = (
            Evaluation
            .select(Evaluation.id, Evaluation.management_unit_id, Evaluation.start_datetime, Evaluation.log_path, Evaluation.detailed_evaluation, Evaluation.score, Evaluation.end_datetime, Evaluation.status)
            .join(ManagementUnit)
            .where((ManagementUnit.public_entity == public_entity) & (eval(expression)) & (Evaluation.status == True) & (Evaluation.show == True))
            .order_by(Evaluation.end_datetime)
        )
    except:
        evaluations = []
    else:
        evaluations = clear_null(list(map(model_to_dict, evaluations)))

    return jsonify(evaluations)


@app.route("/api/turmalina_entitieslatest")
def evaluations_entities():
    """
    [Route that will return the last X ratings given a Public Entity and X amount.]

    Args:
        entity([string]): [Public entity (send without graphic accent)]
        quantity ([int]): [Number of reviews to be retrieved from the database]

    returns:
        [JSON]: [JSON with the last X ratings]
    """

    public_entity = request.args.get('entity')
    evaluation_quantity = request.args.get('quantity')

    try:
        evaluations = (
            Evaluation
            .select(Evaluation.id, Evaluation.management_unit_id, Evaluation.start_datetime, Evaluation.log_path, Evaluation.detailed_evaluation, Evaluation.summary_evaluation, Evaluation.score, Evaluation.end_datetime, Evaluation.status)
            .join(ManagementUnit)
            .where((ManagementUnit.public_entity == public_entity) & (Evaluation.status == True) & (Evaluation.show == True))
            .order_by(Evaluation.end_datetime.desc())
            .limit(int(evaluation_quantity))
        )
    except:
        evaluations = []
    else:
        evaluations = clear_null(list(map(model_to_dict, evaluations)))

    return jsonify(evaluations)


@app.route("/api/turmalina_getbestevaluation")
def get_best_evaluation():
    """
    [Route that will return the best evaluation of a Management Unit.]

    Args:
        entity([string]): [Public entity (send without graphic accent)]

    returns:
        [JSON]: [JSON with the best of the last 5 ratings]
    """

    public_entity = request.args.get('entity')

    try:
        evaluations = (
            Evaluation
            .select(Evaluation.id, Evaluation.management_unit_id, Evaluation.start_datetime,
                    Evaluation.log_path, Evaluation.detailed_evaluation, Evaluation.summary_evaluation,
                    Evaluation.score, Evaluation.end_datetime, Evaluation.status)
            .join(ManagementUnit)
            .where(
                (ManagementUnit.public_entity == public_entity) &
                (Evaluation.status == True) &
                (Evaluation.show == True))
            .order_by(Evaluation.end_datetime.desc())
            .limit(4)
            )

        # Sort the 4 most recent reviews by score and choose the best one
        evaluations = list(evaluations)
        evaluations.sort(key=lambda x: x.score, reverse=True)
        evaluation = evaluations[0]

    except Evaluation.DoesNotExist:
        evaluation = []
    else:
        evaluation = model_to_dict(evaluation)

    return jsonify(evaluation)


@app.route("/api/turmalina_ranking")
def evaluations_ranking():
    """
    [Route that will return a ranking among all Management Units based on the last evaluation score of each one.]

    returns:
        [JSON]: [JSON with ratings in ranking order]
    """

    management_unities = ManagementUnit.select(ManagementUnit.id)
    evaluations_ranking = []

    for unit_id in management_unities:
        try:
            evaluations = (
                Evaluation
                .select(Evaluation.id, Evaluation.management_unit, Evaluation.end_datetime, Evaluation.score)
                .where((Evaluation.management_unit_id == unit_id) & (Evaluation.status == True) & (Evaluation.show == True))
                .order_by(Evaluation.end_datetime.desc())
                .limit(4)
                )
            
            # Sort the 4 most recent reviews by score and choose the best one
            evaluations = list(evaluations)

            if len(evaluations) == 0:
                continue

            evaluations.sort(key=lambda x: x.score, reverse=True)
            evaluation = evaluations[0]

            evaluations_ranking.append(evaluation)
        except Evaluation.DoesNotExist:
            continue
    
    evaluations_ranking = clear_null(
        list(map(model_to_dict, evaluations_ranking)))
    
    evaluations_ranking.sort(key=score_sort, reverse=True)
    ##evaluations_ranking.sort(key=lambda x: (x.score, x.end_datetime), reverse=True)

    return jsonify(evaluations_ranking)


@app.route("/api/turmalina_summarymean")
def evaluations_summarymean():
    """
    [Route that will return a JSON of the averages of the categories among all the Management Units based on the last evaluation score of each one.]

    returns:
        [JSON]: [JSON with average of categories]
    """
    management_unities = ManagementUnit.select(ManagementUnit.id)
    
    evaluations = []
    for unit_id in management_unities:
        try:
            evaluations_query = (
                Evaluation
                    .select(Evaluation.summary_evaluation, Evaluation.score)
                    .where(
                        (Evaluation.management_unit_id == unit_id) & 
                        (Evaluation.summary_evaluation.is_null(False)) &
                        (Evaluation.status == True) & (Evaluation.show == True))
                    .order_by(Evaluation.end_datetime.desc())
                    .limit(4)
                )
            
            # Sort the 4 most recent reviews by score and choose the best one
            evaluations_query = list(evaluations_query)

            if len(evaluations_query) == 0:
                continue

            evaluations_query.sort(key=lambda x: x.score, reverse=True)
            evaluation = evaluations_query[0]

        except Evaluation.DoesNotExist:
            continue

        evaluations.append(evaluation)

    evaluations = list(map(model_to_dict, evaluations))

    evaluation_length = len(evaluations)
    summary_mean = defaultdict(int)
    for evaluation in evaluations:
        for key in evaluation['summary_evaluation']:
            summary_mean[key] += evaluation['summary_evaluation'][key]

    for key in summary_mean:
        summary_mean[key] = summary_mean[key] / evaluation_length

    return jsonify(summary_mean)


@app.route("/api/turmalina_sandbox", methods=['POST'])
def send_to_crawler():
    """
    [Route to send a request to the crawler to run a test on the past sites.]
    
    Args:
        start_urls ([string]): [Start URLs for the crawler to access (separate each URL with a comma)]
        receiver_address ([string]): [Virtual address that will be the recipient of the report made from the data that the crawler gets]
    """

    start_urls = request.form.get('start_urls')
    receiver_address = request.form.get('receiver_address')

    print(start_urls, receiver_address)

    try:
        ScrapydAPI(CRAWLER_URL).schedule(
            'crawler',
            'turmalina',
            start_urls=start_urls,
            receiver_address=receiver_address,
            jobid=f'test-execution-{receiver_address}-{datetime.now()}',
            test_execution=True
        )
    except Exception as err:
        print(f"Error: {err}")

    return ('', 204)

@app.route("/api/logs")
def get_crawler_logs():
    test = os.popen('curl http://host.docker.internal:6800/logs/crawler/turmalina/').read()
    soup = BeautifulSoup(test, 'html.parser')
    links = soup.findAll('a', href=True)

    link_list = ""
    for i in links:
        link_list += f'<a href="http://host.docker.internal:5000/get_log?log={i["href"]}">{i["href"].replace("%3A", ":").replace("%20", " ").replace(".log", "")}</a><br>\n'

    return f"<h1>Logs</h1>\n{link_list}"

@app.route("/api/get_log")
def get_log():
    return os.popen(f'curl http://host.docker.internal:6800/logs/crawler/turmalina/{request.args.get("log").replace(":", "%3A").replace(" ", "%20")}').read()


@app.route("/api/tmstatus")
def tm_status():
    result = []
    units = ManagementUnit.select().order_by(ManagementUnit.name)

    for unit in units:
        try:
            evaluation_end = unit.evaluations.order_by(Evaluation.end_datetime.desc()).get()
            evaluation_start = unit.evaluations.order_by(Evaluation.start_datetime.desc()).get()


            result.append({'name': unit.name, 'start': evaluation_end.start_datetime,
                           'end': evaluation_end.end_datetime, 'status': evaluation_start.status,
                           'score': evaluation_end.score, 'summary': evaluation_end.summary_evaluation,
                           'running_start': evaluation_start.start_datetime})
        except Evaluation.DoesNotExist:
            result.append({'name': unit.name, 'status': 'Not Found'})

    return render_template('status.html', evaluations=result)


if __name__ == '__main__':
    app.run(debug=False, port=os.environ.get('PORT', 5000), host='0.0.0.0')
