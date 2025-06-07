import '@styles/routes/BlogPost.scss'
import 'highlight.js/styles/github-dark.css'
import rehypeHighlight from 'rehype-highlight'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { BlogPost, ServerMsg } from '@types'
import { BACKEND_SERVER_URL } from '@const'

export default function BlogPost() {
    const { slug } = useParams()
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${BACKEND_SERVER_URL}/blog/${slug}`)
                if (!res.ok) throw new Error('Failed to load post')

                const data: BlogPost | ServerMsg = await res.json()
                if ('success' in data && !data.success) {
                    throw new Error(data.detail)
                } else if ('title' in data) {
                    setPost(data)
                }
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        if (slug) fetchPost()
    }, [slug])

    if (loading) return (
        <section id='blog-post' style={{ alignItems: 'flex-start' }}>
            <div className='loading'>
                <span className='spinner' />
                <p>Loading article...</p>
            </div>
        </section>
    )

    if (error || !post) return (
        <section id='blog-post' style={{ alignItems: 'flex-start' }}>
            <div className='not-found'>
                <h2>Post Not Found</h2>
                <p>Sorry, we couldn’t find that blog post. It either does not exist or this URL is incorrect.</p>
                <a href='/blog' className='back-link'>← Back to Blog</a>
            </div>
        </section>
    )

    return (
        <article id='blog-post'>
            <div id='post-container'>
                <img src={post.img} alt={post.title} id='post-img'/>
                <section id='title-and-date'>
                    <h1>{post.title}</h1>
                    <p>
                        <em>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em>
                    </p>
                </section>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    )
}