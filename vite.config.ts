/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [react()],
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['./src/**/*.{test,spec}.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'browser',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    include: ['./src/**/*.{test,spec}.tsx'],
                    setupFiles: './vitest-setup-client.ts',
                },
            },
        ],
    },
})
