import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	// render different content based on the state of auth
	renderContent = () => {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Google</a></li>;
			default:
				return <li><a>Logout</a></li>;
		}
	};

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo">Emaily</a>
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