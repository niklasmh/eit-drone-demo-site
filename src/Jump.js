import React, { Component } from 'react'

export default class Jump extends Component {
  render() {
    return (
      <a
        {...this.props}
        className="Jump"
        href={`#${this.props.to}`}
        onClick={() => this.props.onClick(this.props.to)}
      >
        {this.props.content || this.props.children}
      </a>
    )
  }
}
