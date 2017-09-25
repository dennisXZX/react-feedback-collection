import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import components
import StripeWrapper from './StripeWrapper';

// import CSS
import './Header.css';

class Header extends Component {
	// render different content based on the state of auth
	renderContent = () => {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Google</a></li>;
			default:
				return [
					<li key="stripe"><StripeWrapper /></li>,
					<li key="credit">Credits: {this.props.auth.credits}</li>,
					<li key="logout"><a href="/api/logout">Logout</a></li>
				];
		}
	};

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo"
					>
						Emaily
					</Link>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(Header);