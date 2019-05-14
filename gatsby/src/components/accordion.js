import React, { Component } from "react";


class Accordion extends Component {
  constructor(props) {
    super(props)
    this.state = { isCollapsed: false }
  }

  collapseAccordion = () => {
    var oldValue = this.state.isCollapsed
    this.setState({
      ...this.state,
      isCollapsed: !oldValue,
    })
  }
  render() {
    let classCollapsed = this.state.isCollapsed ? "collapse in" : "collapse"
    return (
      <>
        <div className="panel panel-drop panel-guide" id="accordion">
          <div class="panel-heading panel-drop-heading">
            <a
              className={`accordion-toggle panel-drop-title ${this.state.isCollapsed ? '' : 'collapsed'}`}
              data-toggle={classCollapsed}
              data-parent="#accordion"
              data-proofer-ignore=""
              data-target={`#${this.props.id}`}
              aria-expanded="false"
              onClick={this.collapseAccordion}
            >
              <h3
                className="panel-title panel-drop-title info"
              >
                <span
                  className={`glyphicons glyphicons-${this.props.icon}}`}
                />
                {this.props.title}
              </h3>
            </a>
          </div>
          <div
            id={`${this.props.id}`}
            className={classCollapsed}
            aria-expanded="false"
          >
            <div className="panel-inner" >
              {this.props.children}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Accordion
