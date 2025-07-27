import '@styles/routes/BlogPost.scss'
import 'highlight.js/styles/github-dark.css'
import rehypeHighlight from 'rehype-highlight'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link, useParams } from 'react-router-dom'
import { useLayoutEffect, useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { signal } from '@preact/signals-react'
import { BACKEND_SERVER_URL } from '@const'
import type { BlogPost, ServerMsg } from '@types'
import 'katex/dist/katex.min.css'

const post = signal<BlogPost | null>(null)
const loading = signal(true)
const error = signal<string | null>(null)

export default function BlogPost() {
    useSignals()
    const { slug } = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                loading.value = true
                error.value = null

                const res = await fetch(`${BACKEND_SERVER_URL}/blog/${slug}`)
                if (!res.ok) throw new Error('Failed to load post')

                const data: BlogPost | ServerMsg = await res.json()
                if ('success' in data && !data.success) {
                    throw new Error(data.detail)
                } else if ('title' in data) {
                    post.value = data
                }
            } catch (err) {
                error.value = (err as Error).message
            } finally {
                loading.value = false
            }
        }

        if (slug) fetchPost()
    }, [slug])

    useLayoutEffect(() => {
        if (!post.value) return
        document.title = `${post.value.title} | Maher Mahmoud`
        const header = document.getElementById('header')
        const img = document.getElementById('post-img')
        if (header && img) {
            const height = header.offsetHeight
            img.style.top = `${height}px`
        }
    }, [post.value])

    if (loading.value) return (
        <section id='blog-post' style={{ alignItems: 'flex-start' }}>
            <div className='loading'>
                <span className='spinner' />
                <p>Loading article...</p>
            </div>
        </section>
    )

    if (error.value || !post.value) return <>
        <title>Post Not Found | Maher Mahmoud</title>
        <section id='blog-post' style={{ alignItems: 'flex-start' }}>
            <div className='not-found'>
                <h2>Post Not Found</h2>
                <p>Sorry, we couldn’t find that blog post. It either does not exist or this URL is incorrect.</p>
                <Link to='/blog' className='back-link'>← Back to Blog</Link>
            </div>
        </section>
    </>

    return (
        <div id='blog-post'>
            <img src={post.value.img} alt={post.value.title} id='post-img' />
            <article id='post-container'>
                <section id='title-and-date'>
                    <h1>{post.value.title}</h1>
                    <p>
                        <em>{new Date(post.value.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })}</em>
                    </p>
                </section>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeHighlight, rehypeKatex]}
                    components={{
                        a: ({ node, ...props }) => <a {...props} target='_blank' rel='noopener noreferrer' />
                    }}
                >
                    {post.value.content}
                </ReactMarkdown>
            </article>
        </div>
    )
}