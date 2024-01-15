import { RammerheadAPI, StrShuffler } from './rhAPI.js';

async function startRH(){
    let api = new RammerheadAPI('http://localhost:3000');
    await fetch('http://localhost:3000');
    if ( localStorage.getItem('rammerhead_session') && (await api.sessionExists(localStorage.getItem('rammerhead_session'))) ) {
	    const test = await fetch( new URL(localStorage.getItem('rammerhead_session'), 'http://localhost:3000') );
		await api.deleteSession(localStorage.getItem('rammerhead_session'));
		// 404 = good, 403 = Sessions must come from the same IP
		if (test.status === 403) localStorage.removeItem('rammerhead_session');
	} else {
		localStorage.removeItem('rammerhead_session');
	}
    let session = (async api.newSession());
    localStorage.setItem('rammerhead_session', session)
    await api.editSession(session, false, true);
    const dict = await api.shuffleDict(session);
    const shuffler = new StrShuffler(dict);
    location.replace(new URL(`${session}/${shuffler.shuffle('https://google.com')}`, 'http://localhost:3000'));
}
window.onload = startRH()
