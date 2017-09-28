// SurveyField contains logic to render a single label and text input

import React, { Component } from 'react';

class SurveyField extends Component {
	render() {
		// extract 'input' object from this.props provided by redux-form, which contains all the event handlers
		// 'meta.error' property contains the error message passed from the validate()
		// 'meta.touched' property indicates the field has been touched
		const { input, label, placeholder, meta: { error, touched } } = this.props;

		return (
			<div>
				<label>{label}</label>
				{/* wire up event handlers to custom field */}
				<input {...input} placeholder={placeholder} style={{ marginBottom: "5px" }} />
				<div className="red-text" style={{ marginBottom: "20px" }}>
					{touched && error}
				</div>
			</div>
		)
	}
}

export default SurveyField;