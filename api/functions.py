from flask import jsonify
from playhouse.shortcuts import model_to_dict
from models import Evaluation, ManagementUnit

def clear_null(list_dictionaries):
    for dictionary in list_dictionaries:
        for key, value in list(dictionary.items()):
            if value is None:
                del dictionary[key]
    return list_dictionaries

def get_timestamp_expression(first_timestamp, second_timestamp):
    if first_timestamp and second_timestamp:
        expression = "Evaluation.end_datetime.between(first_timestamp, second_timestamp)"
    elif first_timestamp:
        expression = "Evaluation.end_datetime >= first_timestamp"
    else:
        expression = "Evaluation.end_datetime <= second_timestamp"

    return expression

def score_sort(evaluation):
    return evaluation['score']