from textwrap import dedent
from email.utils import parseaddr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import html
from lib.constants import MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM, MAIL_PORT, MAIL_SERVER, MAIL_TLS, MAIL_SSL
from lib.utils import errlog
from lib.models import ContactForm

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_STARTTLS=MAIL_TLS,
    MAIL_SSL_TLS=MAIL_SSL,
    USE_CREDENTIALS=True
)
fm = FastMail(conf)

async def send_email(name: str, body: str, recipients: list[str], reply_to: list[str] = []) -> None:
    try:
        message = MessageSchema(
            subject=f'Portfolio Inquiry by "{name}"',
            recipients=recipients,
            body=body,
            subtype='html',
            reply_to=reply_to
        )
        await fm.send_message(message)
    except Exception as e:
        errlog('send_email', e, 'emails')
        raise e

async def send_contact_email(form: ContactForm) -> None:
    sanitized_name = html.escape(form.name.strip())
    sanitized_message = html.escape(form.message.strip())
    _, sanitized_email = parseaddr(form.email.strip())
    if '@' not in sanitized_email:
        raise ValueError("Invalid email address")

    body = dedent(f"""
        <body style="background-color:#0F0F0F; color:#EDEDED; font-family:'Inter', sans-serif; font-size:1.1rem; line-height:1.6; padding:2rem;">
        <div style="max-width:600px; margin:0 auto; background-color:#121212; padding:2rem; border:1px solid rgba(255,255,255,0.1); border-radius:0.5rem;">
            <h2 style="color:#35C2C1; font-size:1.6rem; margin-top:0;">New Portfolio Message</h2>
            <p><strong style="color:#B0B0B0;">Name:</strong> {sanitized_name}</p>
            <p><strong style="color:#B0B0B0;">Email:</strong> <a href="mailto:{sanitized_email}" style="color:#35C2C1; text-decoration:none;">{sanitized_email}</a></p>
            <p style="margin-top:2rem;"><strong style="color:#B0B0B0;">Message:</strong></p>
            <p style="white-space:pre-wrap;">{sanitized_message}</p>
        </div>
        </body>
    """)

    await send_email(sanitized_name, body, recipients=[MAIL_FROM], reply_to=[sanitized_email])