import React, { Component } from "react";

class CmsSelector extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <div className="inline-select" id="cms-selector">
          <label>
            <input
              type="radio"
              value="WordPress"
              checked={this.state.selectedOption === "WordPress"}
              onChange={this.onValueChange}
            />
            WordPress
          </label>
          <label>
            <input
              type="radio"
              value="Drupal"
              checked={this.state.selectedOption === "Drupal"}
              onChange={this.onValueChange}
            />
            Drupal (all)
          </label>
          <label>
            <input
              type="radio"
              value="Drupal 7"
              checked={this.state.selectedOption === "Drupal 7"}
              onChange={this.onValueChange}
            />
            Drupal 7
          </label>
          <label>
            <input
              type="radio"
              value="Drupal 8"
              checked={this.state.selectedOption === "Drupal 8"}
              onChange={this.onValueChange}
            />
            Drupal 8
          </label>
          <label>
            <input
              type="radio"
              value="Drupal 9"
              checked={this.state.selectedOption === "Drupal 9"}
              onChange={this.onValueChange}
            />
            Drupal 9
          </label>
          &nbsp; &nbsp; Selected option is : {this.state.selectedOption} &nbsp; &nbsp;
        <button className="btn btn-default" type="submit">
          Submit
        </button>
        </div>
      </form>
    );
  }
}

export default CmsSelector;