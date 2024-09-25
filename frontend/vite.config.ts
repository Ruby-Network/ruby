import path from 'node:path';
import { defineConfig } from 'vite';
import { dreamlandPlugin } from 'vite-plugin-dreamland';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

export default defineConfig({
    plugins: [
        dreamlandPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: `${uvPath}/**/*`.replace(/\\/g, '/'),
                    dest: 'uv',
                    overwrite: false
                },
                {
                    src: `${epoxyPath}/**/*`.replace(/\\/g, '/'),
                    dest: 'epoxy',
                    overwrite: false
                },
                {
                    src: `${baremuxPath}/**/*`.replace(/\\/g, '/'),
                    dest: 'baremux',
                    overwrite: false
                }
            ]
        })
    ],
    resolve: {
        alias: {
            //@ts-ignore DIRNAME IS DEFINED, SUCK IITT
            "@components": path.resolve(__dirname, "./src/components"),
            //@ts-ignore DIRNAME IS DEFINED, SUCK IITT
            "@styles": path.resolve(__dirname, "./src/styles"),
            //@ts-ignore DIRNAME IS DEFINED, SUCK IITT
            "@utils": path.resolve(__dirname, "./src/utils")
        }
    },
    server: {
        proxy: {
            '/wisp/': {
                target: 'https://ruby.rubynetwork.co/wisp/',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/wisp\//, '')
            }
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
