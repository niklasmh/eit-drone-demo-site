import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import './App.css'

import Demo from './Demo'
import Page from './Page'
import Jump from './Jump'
import Tabs from './Tabs'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDemo: true,
    }
    this.pages = {}
    this.refPage = page => {
      this.pages[page.props.page] = page
    }
  }

  componentDidMount() {
    if (window.location.hash) {
      setTimeout(() => {
        scrollToComponent(this.pages[window.location.hash.slice(1)], {
          offset: 0,
          align: 'top',
          duration: 0,
        })
      }, 1000)
    }
  }

  scroll(page) {
    scrollToComponent(this.pages[page], {
      offset: 0,
      align: 'top',
      duration: 500,
      ease: 'inOutSine',
    })
  }

  render() {
    return (
      <div className="App">
        <Page color="white" page="tittel" ref={this.refPage}>
          <div className="logo">
            <h1 className="name">eDrone</h1>
            <img
              className="image"
              alt="eDrone logo"
              src={process.env.PUBLIC_URL + 'logo.svg'}
            />
          </div>
          <h1>Effektivisere Akutten med Droner</h1>
          <p>
            Dette er en alternativ presentasjonsform i EiT fra gruppe 5 i
            landsbyen for Fremtidens Smarte Sykehus.
          </p>
        </Page>

        <Tabs>
          <Jump to="edrone" onClick={this.scroll.bind(this)}>
            Hva er eDrone?
          </Jump>
          <Jump to="om" onClick={this.scroll.bind(this)}>
            Om oss
          </Jump>
          <Jump to="tidslinje" onClick={this.scroll.bind(this)}>
            Hva kan eDrone gjøre?
          </Jump>
          <Jump to="demo" onClick={this.scroll.bind(this)}>
            Interaktiv demo
          </Jump>
        </Tabs>

        <Page color="white" page="edrone" ref={this.refPage}>
          <h2>Hva er eDrone?</h2>
          <p>asdasdasd</p>
        </Page>

        <Page color="white" page="om" ref={this.refPage}>
          <h2>Om oss</h2>
          <p />
        </Page>

        <Page color="white" page="tidslinje" ref={this.refPage}>
          <h2>Om oss</h2>
          <p />
        </Page>

        <Page
          color="white"
          page="demo"
          ref={this.refPage}
          style={{ padding: '0' }}
        >
          {this.state.showDemo ? <Demo /> : null}
        </Page>
      </div>
    )
  }
}

export default App
