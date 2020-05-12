import React, { Component } from 'react';

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    this.id = 'addsearch-ui-' + ('' + Math.random()).split('.')[1];
  }

  componentDidMount() {
    this.props.ui.searchField({
      containerId: this.id,
      ...this.props
    });
  }

  render() {
    return (
      <div id={this.id}></div>
    );
  }
}