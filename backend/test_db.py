
from db import get_db_connection

try:
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT DB_NAME()")
    result = cursor.fetchone()

    print("Database connected successfully!")
    print("Connected database:", result[0])

    cursor.close()
    connection.close()

except Exception as error:
    print("Database connection failed:")
    print(error)
