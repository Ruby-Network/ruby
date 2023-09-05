import * as esbuild from 'esbuild';
async function buildRH() {
    const rh = await esbuild.build({
        entryPoints: ['rammerhead/rh.js'],
        bundle: true,
        format: 'iife',
        minify: true,
        platform: 'browser',
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: 'src/public/js/rh/rh.js',
        metafile: true,
        plugins: []
    });
    const rhApi = await esbuild.build({ 
        entryPoints: ['rammerhead/rhAPI.js'],
        bundle: true,
        format: 'iife',
        minify: true,
        platform: 'browser',
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: 'src/public/js/rh/rhAPI.js',
        metafile: true,
        plugins: []
    });
    const rhHelper = await esbuild.build({
        entryPoints: ['rammerhead/rhHelper.js'],
        bundle: true,
        format: 'iife',
        minify: true,
        platform: 'browser',
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: 'src/public/js/rh/rhHelper.js',
        metafile: true,
        plugins: []
    });
    console.log(await esbuild.analyzeMetafile(rh.metafile));
}
export default buildRH;
