importScripts('../dip/dip.worker.js');
importScripts('../dip/dip.config.js');
importScripts('../lib/localforage.js');
importScripts('/js/lib/localforage.js');
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
        self.dip = new DIPServiceWorker('../dip/dip.worker.js', bare);
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
            return await self.dip.fetch(event);
        }
        catch (err) {
            console.error(err);
        }
    })());
});
