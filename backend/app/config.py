from decouple import config

class Config:
    SECRET_KEY = config("SECRET_KEY")
    
    # MySQL Connection
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{config('DB_USER')}:{config('DB_PASSWORD')}"
        f"@{config('DB_HOST')}:{config('DB_PORT')}/{config('DB_NAME')}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Settings
    JWT_SECRET_KEY = config("JWT_SECRET_KEY")
