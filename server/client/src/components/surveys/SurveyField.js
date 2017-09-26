// SurveyField contains logic to render a single label and text input

import React, { Component } from 'react';

class SurveyField extends Component {
	render() {
		// extract the input object from this.props provided by redux-form
		const { input, label, meta: { error, touched } } = this.props;

		return (
			<div>
				<label>{label}</label>
				{/* wire up event handlers to custom field */}
				<input {...input} style={{ marginBottom: "5px;" }} />
				<div className="red-text" style={{ marginBottom: "20px" }}>
					{touched && error}
				</div>
			</div>
		)
	}
}

export default SurveyField;