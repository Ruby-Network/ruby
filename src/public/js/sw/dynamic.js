importScripts('../lib/localforage.js');
importScripts('/dynamic/dynamic.config.js')
importScripts('/dynamic/dynamic.worker.js');
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
        self.__dynamic$config.bare.path = bare;
        self.dynamic = new Dynamic(self.__dynamic$config);
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
        }
        catch (err) {}
        if (await self.dynamic.route(event)) {
            return await self.dynamic.fetch(event);
        }
        await fetch(event.request);
    })());
});
