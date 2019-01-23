import React, { Component } from 'react'
import './Page.css'

export default class Page extends Component {
  render() {
    const style = Object.assign({}, this.props.style, {
      color: this.props.color || 'white',
    })
    return (
      <div className={`Page ${this.props.page}`} style={style} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
