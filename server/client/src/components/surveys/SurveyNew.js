// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

	constructor(props) {
		super(props);

		this.state = {
			// indicate if <SurveyFormReview> should show or not
			showFormReview: false
		};
	}

	// render a component based on component state
	renderContent() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			)
		} else {
			return (
				<SurveyForm
					onSurveySubmit={() => this.setState({ showFormReview: true })}
				/>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		)
	}
}

export default reduxForm({
	form: 'surveyForm',
	destroyOnUnmount: true
})(SurveyNew);