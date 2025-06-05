import '@styles/components/Stats.scss'
import { STATS } from '@const'

export default function Stats() {
    return (
        <section id='stats'>
            <div className='stats-container'>
                {STATS.map(({ label, value }) => (
                    <div className='stat' key={label}>
                        <h3 className='value'>{value}</h3>
                        <p className='label'>{label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}