

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        strictPort: true
        //,
        // proxy: {
        //     '/api': {
        //         target: "http://localhost:8000",
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             Connection: 'Keep-Alive'
        //         }
        //     }
        // },
    },
    build: {
        outDir: "build",
        sourcemap: false
    },
    resolve: {
        alias: {
            api: "/src"
        }
    }
})



/* server: {
        port: 3000,
        open: true,
        strictPort: true,
        proxy: {
            '/api': {
                target: target,
                changeOrigin: "http://localhost:8000",
                secure: false,
                headers: {
                    Connection: 'Keep-Alive'
                }
            }
        },
    }, */