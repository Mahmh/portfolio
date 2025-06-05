import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@const': path.resolve(__dirname, 'src/constants'),
            '@img': path.resolve(__dirname, '../public/img')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@styles/globals.scss" as *;`
            }
        }
    }
})