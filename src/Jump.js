import React, { Component } from 'react'

export default class Jump extends Component {
  render() {
    return (
      <a
        {...this.props}
        className={`Jump${this.props.selected ? ' selected' : ''}`}
        href={`#${this.props.to}`}
        onClick={() => this.props.onClick(this.props.to)}
      >
        {this.props.content || this.props.children}
      </a>
    )
  }
}
