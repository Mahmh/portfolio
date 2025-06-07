from typing import Optional
from datetime import date
from pydantic import BaseModel, EmailStr

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class BlogPost(BaseModel):
    title: str              # The title of the blog post (shown as the main heading)
    slug: str               # URL-friendly identifier (e.g., 'my-first-blog'), used in routes
    date: date              # The published date (used for sorting or showing "Posted on...")
    tags: list[str]         # List of tags or categories (e.g., ['AI', 'FastAPI'])
    img: str                # URL of the image file
    excerpt: str            # A short summary or teaser for the blog post (used in previews)
    content: Optional[str]  # The full Markdown content (can be rendered client-side)