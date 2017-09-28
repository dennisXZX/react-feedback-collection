// SurveyForm shows a form for a user to add inputs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import formFields from './formFields';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';

class SurveyForm extends Component {

	// iterate formFields array, generate a <Field> component for each object
	renderFields() {
		return _.map(formFields, ({ label, name, placeholder }) => {
			return (
				<Field
					key={name}
					name={name}
					type="text"
					label={label}
					placeholder={placeholder}
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
	errors.recipients = validateEmails(values.recipients || '');

	// iterate formFields array, check if each field exists in the 'values' object
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

/*
* validate: accepts a function that validates all the form fields
* form: accepts a string that specifies the namespace for the current form
* destroyOnUnmount: accepts a boolean to indicate whether form field values are perserved when the redux form is destroyed
*/
export default reduxForm({
	validate: validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);