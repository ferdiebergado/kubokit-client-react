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
                    include: ['./tests/unit/**/*.{test,spec}.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'component',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    include: ['./tests/component/**/*.{test,spec}.tsx'],
                    setupFiles: './vitest-setup-client.ts',
                },
            },
        ],
    },
})
