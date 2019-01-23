import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import './App.css'

import Demo from './Demo'
import Page from './Page'
import Jump from './Jump'
import Tabs from './Tabs'
import FadeInBlock from './FadeInBlock'

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
          <h3 className="no-bottom">Andrea Lilleeidet Røyland </h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom">Ingrid Andrea Legran</h3>
          <p className="no-top">Arbeids- og organisasjonspsykologi</p>
          <h3 className="no-bottom">Nana Aanderaa</h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom">Niklas Molnes Hole </h3>
          <p className="no-top">Informatikk</p>
          <h3 className="no-bottom">Paul-Alexandre Nordlund</h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom">Åsmund Heir</h3>
          <p className="no-top">Industriell økonomi og teknologiledelse</p>
        </Page>

        <Page color="white" page="tidslinje" ref={this.refPage}>
          <h2 className="no-bottom">Droner i behandling av</h2>
          <h1 className="no-top no-bottom">Opioidoverdoser</h1>
          <p>Pårørende oppdager en overdose</p>
          <FadeInBlock side="right" title="Symptomer">
            Opioidoverdoser kjennetegnes av nedsatt bevissthet og nedsatt
            respirasjon
          </FadeInBlock>
          <FadeInBlock side="left" title="En livstruende tilstand">
            Ved en overdose med opioider slutter pasienten å puste
          </FadeInBlock>
          <FadeInBlock side="right" title="263 overdosedødsfall i året">
            I Norge dør det i snitt 263 personer av overdoser hvert år
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-2" ref={this.refPage}>
          <h2 className="no-bottom">Pårørende ringer</h2>
          <h1 className="no-top no-bottom big">113</h1>
          <FadeInBlock side="left" title="Dronepilot">
            En dronepilot styrer dronen til rett sted
          </FadeInBlock>
          <FadeInBlock side="right" title="Responstid på to minutter" />
          <FadeInBlock side="left" title="Droneplassering">
            En drone per apotek er mer enn nok til å dekke hele Trondheim
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-3" ref={this.refPage}>
          <h1>Dronen ankommer ulykkesstedet</h1>
          <FadeInBlock
            side="left"
            title="Kommunikasjonsutstyr og videokamera"
          />
          <FadeInBlock side="right" title="Vurdering av pasientens tilstand" />
          <FadeInBlock
            side="left"
            title="Administrering av motgiften NACRAN©"
          />
          <FadeInBlock side="right" title="Effekt av motgift" />
        </Page>

        <Page color="white" page="tidslinje-4" ref={this.refPage}>
          <h1>Hva skjer videre med pasienten?</h1>
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
