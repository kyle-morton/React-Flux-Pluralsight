"use strict";

var React = require('react');

var SelectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        optionDisplay: React.PropTypes.string.isRequired,
        optionValue: React.PropTypes.string.isRequired
      },
      render: function() {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
          wrapperClass += " " + 'has-error';
        }
        var createOption = function(option) {
            console.log('option: ' + JSON.stringify(option));
            return (
                <option value={option[this.props.optionValue]}>{option[this.props.optionDisplay]}</option>
            );
        };
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select 
                        name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value}>
                        <option></option>
                        {this.props.options.map(createOption, this)}
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>    
        );
      }
});

module.exports = SelectInput;