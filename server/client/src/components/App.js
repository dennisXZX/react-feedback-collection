import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import components
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	// check if the user has already logged in
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route path="/" exact={true} component={Landing} />
						<Route path="/surveys" exact={true} component={Dashboard} />
						<Route path="/survey/new" exact={true} component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);