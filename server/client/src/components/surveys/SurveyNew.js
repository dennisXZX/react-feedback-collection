// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
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
			return <SurveyFormReview />
		} else {
			return <SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true }) }
			/>
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

export default SurveyNew;