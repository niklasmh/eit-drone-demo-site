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
    this.tabs = {}
    this.refPage = this.refPage.bind(this)
    this.refTab = this.refTab.bind(this)
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

  refTab(tab) {
    if (tab !== null) {
      const id = tab.getAttribute('href').slice(1)
      this.tabs[id] = tab
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

  nextPage(steps) {
    const pages = Object.keys(this.pages)
    const currentIndex = pages.indexOf(this.state.selected)
    const nextIndex = Math.max(0, Math.min(pages.length, currentIndex + steps))
    this.scroll(pages[nextIndex])
  }

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      case 39: // Right
        this.nextPage(1)
        break
      case 37: // Left
        this.nextPage(-1)
        break
      default:
        break
    }
  }

  render() {
    return (
      <div
        className="App"
        tabIndex="-1"
        onKeyDown={this.handleKeyDown.bind(this)}
      >
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
            <br />
            <br />
            Artikkel:{' '}
            <a
              target="_blank"
              href="Artikkel - Bruk av droner for å forhindre dødsfall og skader av overdose.pdf"
            >
              Bruk av droner for å forhindre dødsfall og skader av overdose
            </a>
          </p>
        </Page>

        <Tabs scroll={this.tabs[this.state.selected.split('-')[0]]}>
          <Jump
            to="edrone"
            refCallback={this.refTab}
            selected={this.state.selected.slice(0, 6) === 'edrone'}
            onClick={this.scroll.bind(this)}
          >
            Hva er eDrone?
          </Jump>
          <Jump
            to="om"
            refCallback={this.refTab}
            selected={this.state.selected === 'om'}
            onClick={this.scroll.bind(this)}
          >
            Menneskene bak
          </Jump>
          <Jump
            to="tidslinje"
            refCallback={this.refTab}
            selected={this.state.selected.slice(0, 9) === 'tidslinje'}
            onClick={this.scroll.bind(this)}
          >
            Hva kan eDrone gjøre?
          </Jump>
          <Jump
            to="demo"
            refCallback={this.refTab}
            selected={this.state.selected === 'demo'}
            onClick={this.scroll.bind(this)}
          >
            Interaktiv demo
          </Jump>
        </Tabs>

        <Page color="white" page="edrone" refCallback={this.refPage}>
          <FadeInBlock side="left" mode="fill">
            <h1>Møt eDrone</h1>
            <h3>- fremtidens akuttmottak</h3>
            <p>
              Akuttmottak verden over sliter med manglende kapasitet til å
              håndtere økt etterspørsel etter helsehjelp. Edrone flytter
              akuttmottaket ut av sykehuset til deg raskt, effektivt og trygt.
            </p>
          </FadeInBlock>
          <FadeInBlock side="left" mode="fill">
            <h2>Allsidig</h2>
            <p>
              Edrone er konstruert for å kunne behandle en rekke sykdommer og
              tilstander. Edrone er utstyrt med viktig medisinsk utstyr som gir
              helsepersonell viktig informasjon om pasientens helsetilstand.
              Edrone kan brukes til diagnotiskk og behandling av blant annet
              hjertestans og overdoser.
            </p>
          </FadeInBlock>
          <FadeInBlock side="left" mode="fill">
            <h2>Rask, effektiv og trygg</h2>
            <p>
              Edrone kan oppnå hastigheter opp mot 160 km/t. Det betyr at dronen
              kan nå deg innen minutter etter du ringt 113.
            </p>
          </FadeInBlock>
        </Page>

        <Page color="white" page="om" refCallback={this.refPage}>
          <h1>Menneskene bak</h1>
          <h2 style={{ textAlign: 'center' }}>
            Dette er menneskene som har vært med på å utvikle dette konseptet.
          </h2>
          <h3 className="no-bottom" title="Betty Jenny">
            Andrea Lilleeidet Røyland
          </h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom" title="Joyce Hjørdis">
            Ingrid Andrea Legran
          </h3>
          <p className="no-top">Arbeids- og organisasjonspsykologi</p>
          <h3 className="no-bottom" title="Kitt Jenny">
            Nana Aanderaa
          </h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom" title="Glenn Terry">
            Niklas Molnes Hole{' '}
          </h3>
          <p className="no-top">Informatikk</p>
          <h3 className="no-bottom" title="Sean Thore">
            Paul-Alexandre Nordlund
          </h3>
          <p className="no-top">Medisin</p>
          <h3 className="no-bottom" title="Cliff Asle">
            Åsmund Heir
          </h3>
          <p className="no-top">Industriell økonomi og teknologiledelse</p>
        </Page>

        <Page color="white" page="tidslinje" refCallback={this.refPage}>
          <h1 className="no-bottom">eDrone i behandling av</h1>
          <h1 className="no-top no-bottom big">Opioidoverdoser</h1>
          <p style={{ textAlign: 'justify', fontWeight: '100' }}>
            Opioider er en gruppe sentralstimulerende stoffer som brukes som
            smertelindring for en rekke tilstander. Opioider har den
            bivirkningen at de også gir en følelse av eufori og velvære, og blir
            over hele verden misbrukt som et rusmiddel. Overdoser er dermed et
            utbredt problem. En overdose kjennetegnes av nedsatt bevissthet og
            at pasienten slutter å puste. Dette er en potensielt livstruende
            tilstand. I USA har det i mange tiår pågått en opioidepedemi og det
            er i dag større sannsynlighet for å dø av en overdose enn i
            trafikken. Overdoser behandles i dag med motgiften nalaxon, som
            enten kan gis som en injeksjon eller som nesespray. Utforsk
            tidslinjen for å se hvordan eDrone kan brukes i behandlingen av
            overdoser.
          </p>
        </Page>

        <Page color="white" page="tidslinje-1" refCallback={this.refPage}>
          <h2>Pårørende oppdager en overdose</h2>
          <FadeInBlock side="right" title="Symptomer">
            <p>
              Opioidoverdoser kjennetegnes av nedsatt bevissthet og nedsatt.
              respirasjon
            </p>
          </FadeInBlock>
          <FadeInBlock side="left" title="En livstruende tilstand">
            <p>Ved en overdose med opioider slutter pasienten å puste.</p>
          </FadeInBlock>
          <FadeInBlock side="right" title="263 overdosedødsfall i året">
            <p>I Norge dør det i snitt 263 personer av overdoser hvert år.</p>
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-2" refCallback={this.refPage}>
          <h2 className="no-bottom">Pårørende ringer</h2>
          <h1 className="no-top no-bottom big">113</h1>
          <FadeInBlock side="left" title="Dronepilot">
            <p>
              En dronepilot styrer eDrone etter instruks fra AMK og flyr dronen
              til rett sted.
            </p>
          </FadeInBlock>
          <FadeInBlock side="right" title="Responstid på to minutter">
            <p>
              eDrone kan fly med en maks hastighet på 160 km/t og nå
              ulykkesstedet på rundt to minutter. Vanlig responstid med
              ambulanser ved overdoser er under åtte minutter i storbyene.
            </p>
          </FadeInBlock>
          <FadeInBlock side="left" title="Droneplassering">
            <p>
              En eDrone per apotek er mer enn nok til å dekke hele Trondheim.
              Ambulansen drifter og apoteket kan fylle på med nødvendig utstyr
              og medikamenter.
            </p>
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-3" refCallback={this.refPage}>
          <h2>eDrone ankommer ulykkesstedet</h2>
          <FadeInBlock side="left" title="Kommunikasjonsutstyr og videokamera">
            <p>
              Dronen er utstyrt med videokamera og kommunikasjonsutstyr som kan
              overvåke pasienten og veilede de som meldte inn overdosen.
            </p>
          </FadeInBlock>
          <FadeInBlock side="right" title="Vurdering av pasientens tilstand">
            <p>
              Dronen har med medisinsk utstyr som EKG- måler og pulsokismeter
              som gir viktig info om pasientens tilstand til ambulansen.
            </p>
          </FadeInBlock>
          <FadeInBlock side="left" title="Administrering av motgiften NACRAN©">
            <p>
              Etter at en overdose har blitt konstatert, får pårørende tilgang
              til NARCAN © fra dronen. NARCAN © er en nesespray som inneholder
              en motgift som reverserer effekten av opioider. Nesesprayen er
              enkel i bruk og kan gis av personer som ikke er helsepersonell.
            </p>
          </FadeInBlock>
          <FadeInBlock side="right" title="Effekt av motgift">
            <p>
              Nesesprayen virker raskt og flesteparten vil få tilbake
              respirasjon etter noen minutter. Hvis ikke kan dronen instruere
              pårørende til å starte hjerte-lunge redning i påvente av ambulanse
              eventuelt gi ny dose NARCAN©.
            </p>
          </FadeInBlock>
        </Page>

        <Page color="white" page="tidslinje-4" refCallback={this.refPage}>
          <h2>Hva skjer videre med pasienten?</h2>
          <FadeInBlock side="left">
            <p>
              Hva som skjer etter behandling med nesespray avhenger av
              pasientens tilstand etter endt behandling. Hvis pasienten ikke
              viser tegn til bedring, sendes en ambulanse til stedet.
            </p>
          </FadeInBlock>
          <FadeInBlock side="right">
            <p>
              Pasienter som ikke får tilfredsstillende bedring etter endt
              behandling blir vurdert av ambulansepersonell og eventuelt sendt
              videre til sykehus for videre behandling.
            </p>
          </FadeInBlock>
          <FadeInBlock side="left">
            <p>
              Friske pasienter blir overvåket av dronen i to timer. Alle får
              tilbud om oppfølging av spesialisthelsetjeneste i etterkant av en
              overdose.
            </p>
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
