import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@const': path.resolve(__dirname, 'src/utils/constants'),
            '@certs': path.resolve(__dirname, 'src/utils/certificates'),
            '@types': path.resolve(__dirname, 'src/utils/types')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@styles/globals.scss" as *;`
            }
        }
    },
    server: {
        allowedHosts: ['mahermah.com']
    }
});
