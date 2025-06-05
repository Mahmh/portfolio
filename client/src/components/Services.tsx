import '@styles/components/Services.scss'
import { SERVICES } from '@const'

export default function Services() {
    return (
        <section id='services'>
            <h2 className='section-title'>Services</h2>
            <div className='service-list'>
                {SERVICES.map(service => (
                    <div className='service-card' key={service.title}>
                        <h3 className='service-title'>{service.title}</h3>
                        <p className='service-description'>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}