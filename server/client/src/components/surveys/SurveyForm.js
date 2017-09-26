// SurveyForm shows a form for a user to add inputs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';

const FIELDS = [
	{ label: 'Survey Title', name: 'title', noValueError: 'You must provide a survey title.'},
	{ label: 'Subject Title', name: 'subject'},
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {

	renderFields() {
		return _.map(FIELDS, (field) => {
			return (
				<Field
					key={field.name}
					name={field.name}
					type="text"
					label={field.label}
					component={SurveyField}
				/>
			)
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

function validate(values) {
	const errors = {};

	errors.emails = validateEmails(values.emails || '');

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