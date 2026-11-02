
import pyodbc
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    connection_string = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=LAPTOP-C2KQL5SD\\SQLEXPRESS;"
        "DATABASE=ekart_db;"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

    return pyodbc.connect(connection_string)
