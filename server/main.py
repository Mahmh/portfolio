from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from lib.constants import BACKEND_SERVER_URL, WEB_SERVER_URL, BLOG_URL
from lib.emails import send_contact_email
from lib.models import BlogPost, ContactForm
from lib.blog import list_blogs, get_blog

# Init
app = FastAPI()
limiter = Limiter(key_func=get_remote_address)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[BACKEND_SERVER_URL, WEB_SERVER_URL, BLOG_URL],
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
    except:
        return {'detail': 'Sorry, the system could not send your message due to an internal error. Please try again later.', 'success': False}


@app.get('/blog')
async def blog_posts() -> list[BlogPost] | dict:
    try:
        return list_blogs()
    except:
        return {'detail': 'Failed to fetch blog posts.', 'success': False}


@app.get('/blog/{slug}')
async def blog_post(slug: str) -> BlogPost | dict:
    try:
        post = get_blog(slug)
        if not post:
            return {'detail': 'Blog post not found.', 'success': False}
        return post
    except:
        return {'detail': 'Failed to fetch blog post.', 'success': False}