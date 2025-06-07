export type ServerMsg = {
    detail: string
    success: boolean
} 

export type BlogPost = {
    title: string
    slug: string
    date: string
    tags: string[]
    img: string
    excerpt: string
    content: string
}