import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
// import PostsIndex from './components/posts_index';
import Login from './components/login';
import Resources from './components/resources';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Login} />
		<Route path="EventCreation" component={Resources} />
	</Route>
);
