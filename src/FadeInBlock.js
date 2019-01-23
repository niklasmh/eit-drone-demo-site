import React, { Component } from 'react'
import './FadeInBlock.css'

export default class FadeInBlock extends Component {
  render() {
    return (
      <div className="FadeInBlock" {...this.props}>
        <h3>{this.props.title}</h3>
        <p>{this.props.children}</p>
      </div>
    )
  }
}
