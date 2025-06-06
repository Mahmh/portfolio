from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from lib.constants import BACKEND_SERVER_URL, WEB_SERVER_URL
from lib.emails import send_contact_email
from lib.utils import ContactForm

# Init
app = FastAPI()
limiter = Limiter(key_func=get_remote_address)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[BACKEND_SERVER_URL, WEB_SERVER_URL],
    allow_methods=['GET', 'POST'],
    allow_headers=['*'],
    allow_credentials=True
)


# Endpoints
@app.post('/contact')
@limiter.limit('3/minute')
async def contact(request: Request, form: ContactForm):
    try:
        await send_contact_email(form)
        return {'detail': 'Message sent successfully!', 'success': True}
    except Exception as e:
        print('EXCEPTION', e)
        return {'detail': 'Sorry, the system could not send your message due to an internal error. Please try again later.', 'success': False}