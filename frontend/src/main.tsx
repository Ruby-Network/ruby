import 'dreamland/dev';
import { Route, Router } from 'dreamland-router';
import Home from './routes/home';
//base styles
import '@styles/index.scss';
new Router(
    <Route>
        <Route path="" show={<Home />} />
    </Route>
).mount(document.getElementById('app')!);
