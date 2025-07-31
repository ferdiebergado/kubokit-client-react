import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            { find: '@components', replacement: '/src/components' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@lib', replacement: '/src/lib' },
        ],
    },
    plugins: [react()],
})
