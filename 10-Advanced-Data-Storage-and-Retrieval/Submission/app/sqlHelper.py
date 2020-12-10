from sqlalchemy import create_engine, inspect
import pandas as pd
import numpy as np

class SQLHelper():

    def __init__(self):
        self.connection_string = f"sqlite:///Resources/hawaii.sqlite"
        self.engine = create_engine(self.connection_string)
    
    def get_precipitation(self):
        query = ""
        with open("queries/prcp_last_12_months.sql", "r") as f:
            query = f.read()

        conn = self.engine.connect()
        df = pd.read_sql(query, con=conn)
        conn.close()

        return df

    def get_stations(self):
        station_query = """
                    SELECT
                        *
                    FROM
                        station
                    """
        conn = self.engine.connect()
        df_station = pd.read_sql(station_query, con=conn)
        conn.close()

        return df_station
    
    def get_most_active_over_last_year(self):
        query = ""
        with open("queries/most_active_last_year.sql", "r") as f:
            query = f.read()

        conn = self.engine.connect()
        df = pd.read_sql(query, con=conn)
        conn.close()

        return df

    #date must be in format YYY-MM-DD
    def get_temp_start_date(self, start_date):
        query = f"""
                SELECT
                    min(tobs) as min_tobs,
                    max(tobs) as max_tobs,
                    avg(tobs) as avg_tobs
                FROM
                    measurement
                WHERE
                    date = '{start_date}'
                """ 
        
        conn = self.engine.connect()
        df = pd.read_sql(query, con=conn)
        conn.close()

        return df

    #date must be in format YYY-MM-DD
    def get_temp_date_range(self, start_date, end_date):
        query = f"""
                SELECT
                    min(tobs) as min_tobs,
                    max(tobs) as max_tobs,
                    avg(tobs) as avg_tobs
                FROM
                    measurement
                WHERE
                    date >= '{start_date}'
                    AND date <= '{end_date}'
                """ 
        
        conn = self.engine.connect()
        df = pd.read_sql(query, con=conn)
        conn.close()

        return df





       


        