//all Ultraviolet realted stuff goes here
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/js/lib/localforage.js');
importScripts(__uv$config.sw || '/uv/uv.sw.js');
localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'Ruby',
    version : 1.0,
    storeName: 'ruby_config',
    description: 'Ruby Config for things in sw'
});
const promise = new Promise(async (resolve) => {
    try {
        const bare = await localforage.getItem('bare');
        self.__uv$config.bare = bare;
        self.uv = new UVServiceWorker(self.__uv$config);
    }
    catch (err) {
        console.error(err);
    }
    resolve();
});
self.addEventListener('fetch', function (event) {
    event.respondWith((async function() {
        try {
            await promise;
            return await self.uv.fetch(event);
        }
        catch (err) {
            //console.error(err);
        }
    })());
});
