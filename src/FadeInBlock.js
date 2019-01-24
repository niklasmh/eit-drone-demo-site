import React, { Component } from 'react'
import { ReactBasicScroll } from 'react-basic-scroll'
import './FadeInBlock.css'

export default class FadeInBlock extends Component {
  render() {
    const fadeIn = {
      from: 'top-bottom',
      to: 'top-middle',
      direct: true,
      props: {
        '--opacity': {
          from: 0.1,
          to: 0.99,
        },
        '--slideIn': {
          from: '100px',
          to: '0px',
        },
      },
    }
    return (
      <ReactBasicScroll config={fadeIn}>
        <div className="FadeInBlock" {...this.props}>
          {this.props.title ? <h3>{this.props.title}</h3> : null}
          {this.props.children}
        </div>
      </ReactBasicScroll>
    )
  }
}
