import { defineConfig } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

export default defineConfig({
    plugins: [
        ViteImageOptimizer({
            png: {
                quality: 87,
            }
        }),
    ]
})