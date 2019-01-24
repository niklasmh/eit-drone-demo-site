import React, { Component } from 'react'

export default class Jump extends Component {
  render() {
    return (
      <a
        className={`Jump${this.props.selected ? ' selected' : ''}`}
        href={`#${this.props.to}`}
        ref={e => this.props.refCallback(e)}
        onClick={() => this.props.onClick(this.props.to)}
      >
        {this.props.content || this.props.children}
      </a>
    )
  }
}
