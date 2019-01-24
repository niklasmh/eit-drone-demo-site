import React, { Component } from 'react'
import './Tabs.css'

export default class Tabs extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scroll !== this.props.scroll) {
      let left = 0
      let width = 100
      if (nextProps.scroll) {
        const rect = nextProps.scroll.getBoundingClientRect()
        left = rect.left
        width = rect.width
      }
      if (this.ref) {
        if (left < 0 || left + width > this.ref.offsetWidth) {
          this.ref.scrollLeft = this.ref.scrollLeft + left
        }
      }
    }
  }

  getRef(ref) {
    if (ref !== null) {
      this.ref = ref
    }
  }

  render() {
    return (
      <div className="Tabs" ref={this.getRef.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}
