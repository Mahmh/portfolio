from typing import Optional
import os, frontmatter
from lib.constants import BLOG_DIR
from lib.models import BlogPost
from lib.utils import errlog

def list_blogs() -> list[BlogPost]:
    try:
        posts = []
        for filename in os.listdir(BLOG_DIR):
            if filename.endswith('.md'):
                path = os.path.join(BLOG_DIR, filename)
                post = frontmatter.load(path)
                slug = filename.removesuffix('.md')  # infer from filename
                posts.append(BlogPost(
                    title=post.get('title'),
                    slug=slug,
                    date=post.get('date'),
                    tags=post.get('tags') or [],
                    img=post.get('img'),
                    excerpt=post.get('excerpt'),
                    content=None  # Exclude full content in list view
                ))
        return sorted(posts, key=lambda p: p.date, reverse=True)
    except Exception as e:
        errlog('list_blogs', e, 'blog')
        raise e


def get_blog(slug: str) -> Optional[BlogPost]:
    try:
        filename = f'{slug}.md'
        path = os.path.join(BLOG_DIR, filename)
        if os.path.exists(path):
            post = frontmatter.load(path)
            return BlogPost(
                title=post.get('title'),
                slug=slug,
                date=post.get('date'),
                tags=post.get('tags') or [],
                img=post.get('img'),
                excerpt=post.get('excerpt'),
                content=post.content
            )
        return None
    except Exception as e:
        errlog('get_blog', e, 'blog')
        raise e