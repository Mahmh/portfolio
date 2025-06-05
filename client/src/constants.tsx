import AIEcomApp from '@img/projects/ai-ecom-app.png'
import SemanticCourseSearch from '@img/projects/semantic-course-search.png'
import { siReact, siNextdotjs, siVite, siFastapi, siOpenjdk, siTypescript, siMysql, siSqlite, siPostgresql, siPytorch, siDocker, siGit, siNginx, siLinux, siGnubash, siPandas, siScikitlearn, siSass, siPython, siHuggingface, siTensorflow, siPlotly, siGithubactions, siPreact } from 'simple-icons'

export const STATS = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Tech Stack Mastery', value: 'Full-Stack AI' }
]

export const PROJECTS = [
    {
        title: 'AI-Personalized E-Commerce',
        description: 'An intelligent storefront that recommends products in real-time and includes a built-in AI shopping assistant powered by a language model.',
        stack: ['Next.js', 'FastAPI', 'MySQL', 'SCSS'],
        link: '/projects/ai-ecom',
        img: AIEcomApp
    },
    {
        title: 'Semantic Course Search',
        description: 'A smarter search engine for 100+ tech courses that understands meaning — not just keywords.',
        stack: ['Vite', 'FastAPI', 'SQLite', 'ChromaDB'],
        link: '/projects/semantic-search',
        img: SemanticCourseSearch
    },
    {
        title: 'Resume Screener',
        description: 'Instantly matches resumes to job descriptions using AI-powered similarity analysis.',
        stack: ['Vite', 'FastAPI', 'Pandas'],
        link: '/projects/resume-matcher',
        img: undefined
    }
]

export const SERVICES = [
    {
        title: 'Full-Stack Web Development',
        description: 'I build scalable, responsive web apps from UI to backend using modern tools like Next.js and FastAPI.'
    },
    {
        title: 'AI Integration',
        description: 'I add AI to products — from smart search to recommendations — using open-source models and APIs.'
    },
    {
        title: 'Lean MVP Development',
        description: 'I quickly turn ideas into working demos, ideal for validation or pitching.'
    },
    {
        title: 'Tech Strategy & Architecture',
        description: 'I help pick the right stack and design scalable systems that won’t break later.'
    }
]

export const SKILLS = {
    'Frontend': [
        { name: 'TypeScript', icon: siTypescript },
        { name: 'SCSS', icon: siSass },
        { name: 'React', icon: siReact },
        { name: 'Next.js', icon: siNextdotjs },
        { name: 'Vite', icon: siVite },
        { name: 'Preact Signals', icon: siPreact }
    ],
    'Backend': [
        { name: 'Python', icon: siPython },
        { name: 'Java (OpenJDK)', icon: siOpenjdk },
        { name: 'FastAPI', icon: siFastapi },
        { name: 'SQLite', icon: siSqlite },
        { name: 'MySQL', icon: siMysql },
        { name: 'PostgreSQL', icon: siPostgresql }
    ],
    'AI/ML': [
        { name: 'PyTorch', icon: siPytorch },
        { name: 'TensorFlow', icon: siTensorflow },
        { name: 'Pandas', icon: siPandas },
        { name: 'Plotly', icon: siPlotly },
        { name: 'scikit-learn', icon: siScikitlearn },
        { name: 'Hugging Face', icon: siHuggingface }
    ],
    'Tools & DevOps': [
        { name: 'Linux', icon: siLinux },
        { name: 'Bash Terminal', icon: siGnubash },
        { name: 'Docker', icon: siDocker },
        { name: 'Git', icon: siGit },
        { name: 'GitHub Actions', icon: siGithubactions },
        { name: 'Nginx', icon: siNginx }
    ]
}