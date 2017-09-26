// SurveyForm shows a form for a user to add inputs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';

// TODO provide customized error messages
// an array to store info for each form field
const FIELDS = [
	{ label: 'Survey Title', name: 'title', noValueError: 'You must provide a survey title.'},
	{ label: 'Subject Title', name: 'subject'},
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {

	// iterate FIELDS array, generate a <Field> component for each object
	renderFields() {
		return _.map(FIELDS, ({ label, name }) => {
			return (
				<Field
					key={name}
					name={name}
					type="text"
					label={label}
					component={SurveyField}
				/>
			)
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		)
	}
}

// validate all form fields
// 'values' parameter containing all field values
function validate(values) {
	const errors = {};

	// check if there are any invalid emails
	errors.emails = validateEmails(values.emails || '');

	// iterate FIELDS array, check if each field exists in the 'values' object
	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'surveyForm'
})(SurveyForm);