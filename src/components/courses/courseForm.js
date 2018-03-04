"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var CourseForm = React.createClass({
	propTypes: {
		course:	React.PropTypes.object.isRequired,
		authors: React.PropTypes.array.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Course</h1>
				<Input
					name="title"
					label="Title"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />

				<SelectInput 
					name="author"
					label="Author"
					value={this.props.course.author.id}
					onChange={this.props.onChange}
					error={this.props.errors.author}
					options={this.props.authors}
					optionDisplay="name"
					optionValue="id" />
                    
                <Input
					name="category"
					label="Category"
					value={this.props.course.category}
					onChange={this.props.onChange}
					error={this.props.errors.category} />

                <Input
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = CourseForm;