import React, { Component } from 'react'
import { ReactBasicScroll } from 'react-basic-scroll'
import './FadeInBlock.css'

export default class FadeInBlock extends Component {
  render() {
    const fadeIn = {
      from: 'middle-bottom',
      to: 'middle-middle',
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
          <h3>{this.props.title}</h3>
          <p>{this.props.children}</p>
        </div>
      </ReactBasicScroll>
    )
  }
}
