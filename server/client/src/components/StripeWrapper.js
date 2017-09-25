import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*
Documentation:
https://github.com/azmenak/react-stripe-checkout
*/
class StripeWrapper extends Component {
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				// amount in cent (US dollar)
				amount={500}
				// token property expects a function to handle the return token object
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			>
				<button className="btn">
					Add Credits
				</button>
			</StripeCheckout>
		)
	}
}

export default connect(null, actions)(StripeWrapper);