import React, { Component } from 'react'
import './App.css'

import Demo from './Demo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDemo: true,
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Effektivisere Akutten med Droner</h1>
        <p>
          Dette er en alternativ presentasjonsform i EiT fra gruppe 5 i
          landsbyen for Fremtidens Smarte Sykehus.
        </p>

        <p>Nettsiden inneholder:</p>
        <ol>
          <li>
            <a href="#demo">Interaktiv demo av løsning</a>
          </li>
          <li>
            <a href="#description">
              Beskrivelse av problemet med effektivitet i akutt
            </a>
          </li>
          <li>
            <a href="#solution">Løsning med droner</a>
          </li>
        </ol>

        <h2 id="demo">Interaktiv demo av løsning</h2>
        <a id="play" href="#map">
          Start
        </a>
        {this.state.showDemo ? <Demo /> : null}

        <h2 id="description">
          Beskrivelse av problemet med effektivitet i akutt
        </h2>
        <p>
          <i>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
            Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum
            Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem
            ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem
            ipsum Lorem ipsum
          </i>
        </p>
        <p>
          <i>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
            Lorem ipsumLipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
          </i>
        </p>

        <h2 id="solution">Løsning med droner</h2>
        <p>
          <i>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
            Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum
            Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem
            ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem
            ipsum Lorem ipsum
          </i>
        </p>
        <p>
          <i>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
            Lorem ipsumLipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum
          </i>
        </p>
      </div>
    )
  }
}

export default App
