import '@styles/routes/Contact.scss'
import { useSignals } from '@preact/signals-react/runtime'
import { signal } from '@preact/signals-react'
import { CONTACT_EMAIL, BACKEND_SERVER_URL } from '@const'
import type { ServerMsg } from '@types'

const feedback = signal<ServerMsg | null>(null)
const sending = signal(false)

export default function Contact() {
    useSignals()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())

        sending.value = true
        feedback.value = null

        try {
            const response = await fetch(`${BACKEND_SERVER_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result: ServerMsg = await response.json()
        
            if (response.status === 429) {
                feedback.value = {
                    detail: 'You have sent too many requests. Please try again later.',
                    success: false
                }
                return
            }

            if (result.success) form.reset()
            feedback.value = result
        } catch {
            feedback.value = {
                detail: 'Network error occured. Please check your connection then try again.',
                success: false
            }
        } finally {
            sending.value = false
        }
    }

    return <>
        <title>Contact | Maher Mahmoud</title>
        <section id='contact'>
            <h2 className='section-title'>Contact</h2>

            <div className='contact-wrapper'>
                <form className='contact-form' onSubmit={submit}>
                    <input type='text' name='name' placeholder='Your Name' required />
                    <input type='email' name='email' placeholder='Your Email' required />
                    <textarea name='message' placeholder='Your Message' rows={6} required />
                    <button type='submit' disabled={sending.value || feedback.value?.success}>
                        {sending.value ? 'Sending...' : feedback.value?.success ? 'Sent ✓' : 'Send Message'}
                    </button>

                    {feedback.value && (
                        <div className={`form-feedback ${feedback.value.success ? 'success' : 'error'}`}>
                            {feedback.value.detail}
                        </div>
                    )}
                </form>

                <div className='contact-info'>
                    <p><b>Email:</b> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                    <p><b>Location:</b> Doha, Qatar</p>
                    <div className='social-links'>
                        <a href='https://github.com/Mahmh' target='_blank' rel='noopener noreferrer'>GitHub</a>
                    </div>
                </div>
            </div>
        </section>
    </>
}