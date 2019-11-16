import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as serviceWorker from './serviceWorker';
import { SessionListProvider } from './contexts/SessionListContext';
import { SessionProvider } from './contexts/SessionContext';
import App from './components/App/App';
import './index.css';

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import {
	faBookOpen,
	faComment,
	faGift,
	faGlobeAmericas,
	faListOl,
	faListUl,
	faPenAlt,
	faQuoteLeft,
	faStar as fasStar
} from '@fortawesome/free-solid-svg-icons';

library.add(
	fab,
	faGift, // logo
	faListUl, // style: listicle
	faListOl, // style: howto
	faGlobeAmericas, // style: news
	faPenAlt, // style: interview
	faBookOpen, // style: story
	faComment,
	faQuoteLeft,
	farStar,
	fasStar
);

ReactDOM.render(
	<BrowserRouter>
		<SessionListProvider>
			<SessionProvider>
				<App />
			</SessionProvider>
		</SessionListProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
