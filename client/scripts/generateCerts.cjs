const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '../public/certificates')
const OUTPUT_FILE = path.join(__dirname, '../src/certificates.ts')
const VALID_EXTS = ['.pdf', '.png', '.jpeg', '.jpg', '.webp']

function walk(dir, issuer, relPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const certs = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        const relativePath = path.join(relPath, entry.name)

        if (entry.isDirectory()) {
            const subIssuer = issuer || entry.name // capture first-level issuer
            certs.push(...walk(fullPath, subIssuer, relativePath))
        } else {
            const ext = path.extname(entry.name).toLowerCase()
            if (!VALID_EXTS.includes(ext)) continue

            const type = ['.pdf'].includes(ext) ? 'pdf' : 'image'
            const fileName = path.basename(entry.name, ext)
                .replace(/[_\-]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()

            certs.push({
                title: fileName.replace(/\b\w/g, c => c.toUpperCase()),
                issuer,
                category: path.dirname(relativePath).replace(/\\/g, '/').split('/').slice(1).join(' / ') || null,
                path: `/certificates/${relativePath.replace(/\\/g, '/')}`,
                type
            })
        }
    }

    return certs
}

const unsorted = walk(ROOT_DIR, null)

// Put Codecademy certificates at the end
const certificates = [
    ...unsorted.filter(cert => cert.issuer !== 'Codecademy'),
    ...unsorted.filter(cert => cert.issuer === 'Codecademy')
]

const content = `export const CERTIFICATES = ${JSON.stringify(certificates, null, 2)}\n`
fs.writeFileSync(OUTPUT_FILE, content)

console.log(`Generated ${certificates.length} certificates → ${OUTPUT_FILE}`)