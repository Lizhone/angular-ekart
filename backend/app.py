
from flask import Flask, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "eKart Flask API is running!"
    })


@app.route("/api/health", methods=["GET"])
def health():
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT DB_NAME()")
        database = cursor.fetchone()[0]

        return jsonify({
            "status": "success",
            "message": "Database connected successfully",
            "database": database
        })

    except Exception as error:
        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@app.route("/api/products", methods=["GET"])
def get_products():
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("""
    SELECT
        ProductId,
        ProductName,
        Description,
        Price,
        ImageURL,
        Category,
        Stock,
        Brand,
        Gender,
        Size,
        Color,
        DiscountPrice,
        Slug
    FROM dbo.Products
    ORDER BY ProductId
""")

        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()

        products = []

        for row in rows:
            product = dict(zip(columns, row))

            if product["Price"] is not None:
                product["Price"] = float(product["Price"])

            products.append(product)

        return jsonify(products)

    except Exception as error:
        return jsonify({
            "error": "Unable to retrieve products",
            "details": str(error)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
