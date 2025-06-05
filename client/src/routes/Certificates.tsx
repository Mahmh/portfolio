import '@styles/routes/Certificates.scss'
import { useSignals } from '@preact/signals-react/runtime'
import { signal, computed } from '@preact/signals-react'
import { CERTIFICATES } from '@certs'

/** Variables & functions */
const search = signal('')
const category = signal<string | null>(null)
const showAll = signal(false)

const filteredCerts = computed(() =>
    CERTIFICATES.filter(cert => {
        const matchesCategory = !category.value || cert.category === category.value
        const matchesSearch =
            cert.title.toLowerCase().includes(search.value.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(search.value.toLowerCase())
        return matchesCategory && matchesSearch
    })
)

const visibleCerts = computed(() => showAll.value ? filteredCerts.value : filteredCerts.value.slice(0, 15))

const getUniqueCategories = () => Array.from(new Set(CERTIFICATES.map(cert => cert.category).filter(Boolean)))


/** Components */
export default function Certificates() {
    return (
        <section id='certificates'>
            <h2 className='section-title'>My Certificates</h2>
            <div className='cert-wrapper'>
                <CertControls/>
                <CertGrid/>
            </div>
        </section>
    )
}


const CertControls = () => {
    useSignals()
    const categories = getUniqueCategories()

    return (
        <div className='cert-controls'>
            <input
                type='text'
                placeholder='Search certificates...'
                value={search.value}
                onInput={e => (search.value = (e.target as HTMLInputElement).value)}
            />
            <div className='cert-filters'>
                <button onClick={() => {
                    category.value = null
                    showAll.value = false
                }} className={!category.value ? 'active' : ''}>
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            category.value = cat
                            showAll.value = false
                        }}
                        className={category.value === cat ? 'active' : ''}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    )
}


const CertGrid = () => {
    useSignals()
    return (
        <>
            <div className='cert-grid'>
                {visibleCerts.value.map(cert => (
                    <div
                        className='cert-card'
                        key={cert.path}
                        onClick={() => window.open(cert.path, '_blank', 'noopener,noreferrer')}
                        role='button'
                        tabIndex={0}
                        onKeyDown={e =>
                            e.key === 'Enter' ? window.open(cert.path, '_blank', 'noopener,noreferrer') : null
                        }
                    >
                        {cert.type === 'image' ? (
                            <img src={cert.path} alt={cert.title} className='cert-preview' />
                        ) : (
                            <iframe
                                src={`${cert.path}#toolbar=0`}
                                className='cert-preview'
                                title={cert.title}
                                loading='lazy'
                            />
                        )}
                        <div className='cert-info'>
                            <h3>{cert.title}</h3>
                            <p>{cert.issuer}</p>
                            {cert.category && <span className='cert-category'>{cert.category}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {!showAll.value && filteredCerts.value.length > 16 && (
                <div className='show-all-container'>
                    <button className='show-all' onClick={() => (showAll.value = true)}>
                        Show All ({filteredCerts.value.length - 16})
                    </button>
                </div>
            )}
        </>
    )
}