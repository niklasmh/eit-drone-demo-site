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
      selected: 'hjem',
    }
    this.pagePositions = {}
    this.pages = {}
    this.refPage = this.refPage.bind(this)
    this.hasMounted = false
  }

  refPage(page) {
    if (page !== null) {
      const { top } = page.getBoundingClientRect()
      const id = page.getAttribute('page')
      this.pagePositions[id] = top + document.documentElement.scrollTop
      this.pages[id] = page
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.hasMounted = true

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll() {
    const y = window.scrollY + 60
    let prevPage = this.state.selected
    let currentPage = this.state.selected
    for (const key in this.pagePositions) {
      if (this.pagePositions[key] > y) {
        break
      }
      currentPage = key
    }
    if (prevPage !== currentPage) {
      window.location.href = '#' + currentPage
      this.setState({ ...this.state, selected: currentPage })
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
        <Page color="white" page="hjem" refCallback={this.refPage}>
          <div className="logo">
            <h1 className="name">eDrone</h1>
            <img
              className="image"
              alt="eDrone logo"
              src={process.env.PUBLIC_URL + 'logo.svg'}
            />
          </div>
          <h1>Fremtidens akuttmottak</h1>
          <p>
            Dette er en alternativ presentasjonsform i EiT fra gruppe 5 i
            landsbyen for Fremtidens Smarte Sykehus.
          </p>
        </Page>

        <Tabs>
          <Jump
            to="edrone"
            selected={this.state.selected === 'edrone'}
            onClick={this.scroll.bind(this)}
          >
            Hva er eDrone?
          </Jump>
          <Jump
            to="om"
            selected={this.state.selected === 'om'}
            onClick={this.scroll.bind(this)}
          >
            Menneskene bak
          </Jump>
          <Jump
            to="tidslinje"
            selected={this.state.selected.slice(0, 9) === 'tidslinje'}
            onClick={this.scroll.bind(this)}
          >
            Hva kan eDrone gjøre?
          </Jump>
          <Jump
            to="demo"
            selected={this.state.selected === 'demo'}
            onClick={this.scroll.bind(this)}
          >
            Interaktiv demo
          </Jump>
        </Tabs>

        <Page color="white" page="edrone" refCallback={this.refPage}>
          <h2>Hva er eDrone?</h2>
          <p>asdasdasd</p>
        </Page>

        <Page color="white" page="om" refCallback={this.refPage}>
          <h2>Menneskene bak</h2>
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

        <Page color="white" page="tidslinje" refCallback={this.refPage}>
          <h2 className="no-bottom">eDrone i behandling av</h2>
          <h1 className="no-top no-bottom">Opioidoverdoser</h1>
          <p>Pårørende oppdager en overdose</p>
          <FadeInBlock side="right" title="Symptomer">
            Opioidoverdoser kjennetegnes av nedsatt bevissthet og nedsatt.
            respirasjon
          </FadeInBlock>
          <FadeInBlock side="left" title="En livstruende tilstand">
            Ved en overdose med opioider slutter pasienten å puste.
          </FadeInBlock>
          <FadeInBlock side="right" title="263 overdosedødsfall i året">
            I Norge dør det i snitt 263 personer av overdoser hvert år.
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-2" refCallback={this.refPage}>
          <h2 className="no-bottom">Pårørende ringer</h2>
          <h1 className="no-top no-bottom big">113</h1>
          <FadeInBlock side="left" title="Dronepilot">
            En dronepilot styrer eDrone etter instruks fra AMK og flyr dronen
            til rett sted.
          </FadeInBlock>
          <FadeInBlock side="right" title="Responstid på to minutter">
            eDrone kan fly med en maks hastighet på 160 km/t og nå ulykkesstedet
            på rundt to minutter. Vanlig responstid med ambulanser ved overdoser
            er under åtte minutter i storbyene.
          </FadeInBlock>
          <FadeInBlock side="left" title="Droneplassering">
            En eDrone per apotek er mer enn nok til å dekke hele Trondheim.
            Ambulansen drifter og apoteket kan fylle på med nødvendig utstyr og
            medikamenter.
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-3" refCallback={this.refPage}>
          <h1>eDrone ankommer ulykkesstedet</h1>
          <FadeInBlock side="left" title="Kommunikasjonsutstyr og videokamera">
            Dronen er utstyrt med videokamera og kommunikasjonsutstyr som kan
            overvåke pasienten og veilede de som meldte inn overdosen.
          </FadeInBlock>
          <FadeInBlock side="right" title="Vurdering av pasientens tilstand">
            Dronen har med medisinsk utstyr som EKG- måler og pulsokismeter som
            gir viktig info om pasientens tilstand til ambulansen.
          </FadeInBlock>
          <FadeInBlock side="left" title="Administrering av motgiften NACRAN©">
            Etter at en overdose har blitt konstatert, får pårørende tilgang til
            NARCAN © fra dronen. NARCAN © er en nesespray som inneholder en
            motgift som reverserer effekten av opioider. Nesesprayen er enkel i
            bruk og kan gis av personer som ikke er helsepersonell.
          </FadeInBlock>
          <FadeInBlock side="right" title="Effekt av motgift">
            Nesesprayen virker raskt og flesteparten vil få tilbake respirasjon
            etter noen minutter. Hvis ikke kan dronen instruere pårørende til å
            starte hjerte-lunge redning i påvente av ambulanse evt. gi ny dose
            NARCAN©.
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-4" refCallback={this.refPage}>
          <h1>Hva skjer videre med pasienten?</h1>
          <FadeInBlock side="left">
            Hva som skjer etter behandling med nesespray avhenger av pasientens
            tilstand etter endt behandling. Hvis pasienten ikke viser tegn til
            bedring, sendes en ambulanse til stedet.
          </FadeInBlock>
          <FadeInBlock side="right">
            Pasienter som ikke får tilfredsstillende bedring etter endt
            behandling blir vurdert av ambulansepersonell og evt. Sendt videre
            til sykehus for videre behandling.
          </FadeInBlock>
          <FadeInBlock side="left">
            Friske pasienter blir overvåket av dronen i to timer. Alle får
            tilbud om oppfølging av spesialisthelsetjeneste i etterkant av en
            overdose.
          </FadeInBlock>
        </Page>

        <Page
          color="white"
          page="demo"
          refCallback={this.refPage}
          style={{ padding: '0' }}
        >
          {this.state.showDemo ? <Demo /> : null}
        </Page>
      </div>
    )
  }
}

export default App
