import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from decouple import config
import os

EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")

TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "otp_template.html")

def render_template(otp):
    """Load and replace placeholder inside HTML template."""
    with open(TEMPLATE_PATH, "r") as f:
        html = f.read()
    return html.replace("{{OTP}}", str(otp))

def send_email(to_email, subject, otp):
    msg = MIMEMultipart("alternative")
    msg["From"] = EMAIL_HOST_USER
    msg["To"] = to_email
    msg["Subject"] = subject

    html_content = render_template(otp)
    msg.attach(MIMEText(html_content, "html"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)

        if EMAIL_USE_TLS:
            server.starttls()

        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, to_email, msg.as_string())
        server.quit()

        return True

    except Exception as e:
        print("Email Error:", e)
        return False