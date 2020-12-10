import datetime as dt
import numpy as np
import pandas as pd
from flask import Flask, jsonify
import json
from sqlHelper import SQLHelper


app = Flask(__name__)

sqlHelper = SQLHelper()

#Home Route
@app.route("/")
def home():
    #return all possible routes
    return """<html>
                <h1>Welcome to the Hawaii Climate App (Flask App API)</h1><br/>

                <h3>Precipitation Analysis:</h3>
                <ul>
                    <li><p><a target="_blank" href="api/v1.0/precipitation">api/v1.0/precipitation</a></p></li>
                </ul>

                <h3>Station Analysis:</h3>
                <ul>
                    <li><p><a target="_blank" href="/api/v1.0/stations">/api/v1.0/stations</a></p></li>
                </ul>

                <h3>TOBS Analysis:</h3>
                <ul>
                    <li><p><a target="_blank" href="/api/v1.0/tobs">/api/v1.0/tobs</a></p></li>
                </ul>

                <h3>Start Date:</h3>
                <ul>
                    <li><p> Use date format YYYY-MM-DD</p></li>
                    <li><p><a target="_blank" href="/api/v1.0/<start_date>">/api/v1.0/<start_date></a></p></li>
                </ul>

                <h3>Start Date/End Date:</h3>
                <ul>
                    <li><p> Use date format YYYY-MM-DD</p></li>
                    <li><p><a target="_blank" href="/api/v1.0/<start_date>/<end_date>">/api/v1.0/<start_date>/<end_date></a></p></li>
                </ul>
            <html>"""

#Precipitation Route
@app.route("/api/v1.0/precipitation")
def get_precipitation():
    data = sqlHelper.get_precipitation()
    return jsonify(json.loads(data.to_json(orient="records")))

#Stations Route
@app.route("/api/v1.0/stations")
def get_stations():
    data = sqlHelper.get_stations()
    return jsonify(json.loads(data.to_json(orient="records")))

#TOBS Route
@app.route("/api/v1.0/tobs")
def get_most_active_over_last_year():
    data = sqlHelper.get_most_active_over_last_year()
    return jsonify(json.loads(data.to_json(orient="records")))

#Start Route
@app.route("/api/v1.0/<start_date>")
def get_temp_start_date(start_date):
    data = sqlHelper.get_temp_start_date(start_date)
    return jsonify(json.loads(data.to_json(orient="records")))

#Start/End Route
@app.route("/api/v1.0/<start_date>/<end_date>")
def get_temp_date_range(start_date, end_date):
    data = sqlHelper.get_temp_date_range(start_date, end_date)
    return jsonify(json.loads(data.to_json(orient="records")))

if __name__ == "__main__":
    app.run(debug=True)
