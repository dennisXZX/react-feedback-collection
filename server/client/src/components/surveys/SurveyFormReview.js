// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

class SurveyFormReview extends Component {

	render() {
		// 'history' object is provided by withRouter()
		const { formValues, onCancel, submitSurvey, history } = this.props;
		const reviewFields = _.map(formFields, ({ name, label }) => {
			return (
				<div key={name}>
					<label>{label}</label>
					<div>
						{formValues[name]}
					</div>
				</div>
			);
		});

		return (
			<div>
				<h5>Please confirm the entries</h5>
				{reviewFields}
				<button
					className="yellow darken-3 white-text btn-flat"
					onClick={onCancel}
				>
					Back
				</button>
				<button
					onClick={() => submitSurvey(formValues, history)}
					className="teal btn-flat right white-text">
					Send Survey
					<i className="material-icons right">email</i>
				</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.surveyForm.values
	};
}

// withRouter will pass 'history' prop to the wrapper component
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));