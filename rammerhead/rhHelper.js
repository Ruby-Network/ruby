import { RammerheadAPI, StrShuffler  } from './rhAPI.js';

let rhFunc = {}

rhFunc = {
    rhInteract:
        async function(origin, url){
            let api = new RammerheadAPI(origin);
            await fetch(origin);
            if ( localStorage.getItem('rammerhead_session') && (await api.sessionExists(localStorage.getItem('rammerhead_session'))) ) {
	            const test = await fetch( new URL(localStorage.getItem('rammerhead_session'), origin) );
		        //await api.deleteSession(localStorage.getItem('rammerhead_session'));
		        // 404 = good, 403 = Sessions must come from the same IP
		        if (test.status === 403) localStorage.removeItem('rammerhead_session');
	        } else {
		        localStorage.removeItem('rammerhead_session');
	        }
            let session;
            switch (localStorage.getItem('rammerhead_session')) {
                case null:
                case undefined:
                case 'null':
                case 'undefined':
                    session = (await api.newSession());
                    break;
                default:
                    session = localStorage.getItem('rammerhead_session')
            }
            localStorage.setItem('rammerhead_session', session)
            await api.editSession(session, false, true);
            const dict = await api.shuffleDict(session);
            const shuffler = new StrShuffler(dict);
            return new URL(`${session}/${shuffler.shuffle(url)}`, origin);
        },
    rhDecrypt:
        async function(origin, value){
            let api = new RammerheadAPI(origin);
            let session = localStorage.getItem('rammerhead_session')
            const dict = await api.shuffleDict(session);
            const shuffler = new StrShuffler(dict);
            return shuffler.unshuffle(value)
        }
}
export {rhFunc}
