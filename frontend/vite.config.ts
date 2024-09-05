import path from 'node:path';
import { defineConfig } from 'vite';
import { dreamlandPlugin } from 'vite-plugin-dreamland';

export default defineConfig({
    plugins: [dreamlandPlugin()],
    resolve: {
        alias: {
            //@ts-ignore DIRNAME IS DEFINED, SUCK IITT
            "@components": path.resolve(__dirname, "./src/components"),
            //@ts-ignore DIRNAME IS DEFINED, SUCK IITT
            "@styles": path.resolve(__dirname, "./src/styles")
        }
    },
    //i'm a nerd and DON'T want files randomly generated
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    }
});
