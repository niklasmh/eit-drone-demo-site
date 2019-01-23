import React, { Component } from 'react'
import './Tabs.css'

export default class Tabs extends Component {
  render() {
    return (
      <div className="Tabs" {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
