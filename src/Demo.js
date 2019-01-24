import React, { Component } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
} from 'react-google-maps'
import './Demo.css'

/**
 * TODO:
 *
 * - [x] Telle ned droner som er ferdig
 * - [x] Logo
 * - [x] Støtte 2 typer;
 *    - [x] heroin: bare drone,
 *    - [x] infarkt: ambulanse og drone (om kjappest)
 * - [x] Gjøre at ambulanse kjøres for å ta resten av de som venter
 */

const DemoMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      options={{ draggable: false }}
      onClick={props.onClick}
      defaultZoom={12}
      defaultCenter={{ lat: 63.4189785, lng: 10.4026859 }}
    >
      {props.paths}
      {props.droneLines}
      {props.markers}
      {props.persons}
      {props.ambulances}
      {props.drones}
      <Marker
        position={props.stations[0]}
        defaultIcon={{
          url:
            'http://icons.iconarchive.com/icons/icons-land/gis-gps-map/256/Hospital-icon.png',
          anchor: { x: 25, y: 25 },
          scaledSize: { width: 50, height: 50 },
        }}
      />
    </GoogleMap>
  )),
)

export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPoint: { lat: 0, lng: 0 },
      situations: [],
      stations: [
        { drones: 0, lat: 63.420457, lng: 10.3904378 },
        { drones: 0, lat: 63.4173341, lng: 10.3540778 },
        { drones: 0, lat: 63.4179966, lng: 10.3518891 },
        { drones: 0, lat: 63.3982869, lng: 10.3971434 },
        { drones: 0, lat: 63.4031339, lng: 10.427388 },
        { drones: 0, lat: 63.3874465, lng: 10.3301954 },
        { drones: 0, lat: 63.4096514, lng: 10.4184723 },
        { drones: 0, lat: 63.3951255, lng: 10.3692269 },
        { drones: 0, lat: 63.3933766, lng: 10.3718019 },
        { drones: 0, lat: 63.4094977, lng: 10.4439425 },
        { drones: 0, lat: 63.3911854, lng: 10.4300809 },
        { drones: 0, lat: 63.4249907, lng: 10.4420114 },
        { drones: 0, lat: 63.4311337, lng: 10.4508948 },
        { drones: 0, lat: 63.4347805, lng: 10.4143739 },
        { drones: 0, lat: 63.4344063, lng: 10.4130435 },
        { drones: 0, lat: 63.4334658, lng: 10.3962421 },
        { drones: 0, lat: 63.4313689, lng: 10.39783 },
        { drones: 0, lat: 63.4302508, lng: 10.3935385 },
        { drones: 0, lat: 63.4306683, lng: 10.39621 },
      ],
      type: 'stroke',
    }
    this.bounds = {
      lat1: this.state.stations[0].lat,
      lng1: this.state.stations[0].lng,
      lat2: this.state.stations[0].lat,
      lng2: this.state.stations[0].lng,
    }
    for (const { lat, lng } of this.state.stations) {
      this.bounds.lat1 = Math.min(this.bounds.lat1, lat)
      this.bounds.lng1 = Math.min(this.bounds.lng1, lng)
      this.bounds.lat2 = Math.max(this.bounds.lat2, lat)
      this.bounds.lng2 = Math.max(this.bounds.lng2, lng)
    }
    this.timeInterval = 100
    this.maxAmbulances = 10
    this.maxDronesPerStation = 3
    this.speedup = 10
    this.ambulanceSpeed = 200 * this.speedup
    this.droneSpeed = 80 * this.speedup
    this.stationIcon = {
      url:
        'https://cdn2.iconfinder.com/data/icons/large-home-icons/512/Drugstore_store_pharmacy_medicine_hospital.png',
      anchor: { x: 15, y: 25 },
      scaledSize: { width: 30, height: 30 },
    }
    this.droneIcon = {
      url: 'https://png.pngtree.com/svg/20161124/uav_110217.png',
      anchor: { x: 15, y: 15 },
      scaledSize: { width: 30, height: 30 },
    }
    this.ambulanceIcon = {
      url:
        'http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42545-ambulance-icon.png',
      anchor: { x: 15, y: 15 },
      scaledSize: { width: 30, height: 30 },
    }
    this.typeIcons = {
      heroin: {
        url: 'https://static.thenounproject.com/png/641158-200.png',
        anchor: { x: 15, y: 15 },
        scaledSize: { width: 30, height: 30 },
      },
      stroke: {
        url: 'https://static.thenounproject.com/png/893753-200.png',
        anchor: { x: 15, y: 15 },
        scaledSize: { width: 30, height: 30 },
      },
      strokeFixed: {
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/2000px-Person_icon_BLACK-01.svg.png',
        anchor: { x: 15, y: 25 },
        scaledSize: { width: 30, height: 30 },
      },
    }
  }

  onClick(evt) {
    const lat = evt.latLng.lat()
    const lng = evt.latLng.lng()
    this.placeSituation(lat, lng, this.state.type)
  }

  placeSituation(lat, lng, type) {
    const position = { lat, lng }

    if (type === 'stroke') {
      this.setState({ ...this.state, selectedPoint: position, type })
      const DirectionsService = new window.google.maps.DirectionsService()
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(63.420457, 10.3904378),
          destination: new window.google.maps.LatLng(lat, lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (path, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const situations = this.state.situations.slice(0)
            let stationIndex = -1
            const { index, dist: stationDist } = this.nearestStation(position)
            if (
              stationDist / this.droneSpeed <
              path.routes[0].legs[0].distance.value / this.ambulanceSpeed
            ) {
              stationIndex = index
            }
            const stations = this.state.stations.slice(0)
            if (~stationIndex) stations[stationIndex].drones++
            situations.push({
              path,
              position,
              time: 0,
              done: false,
              waitForAmbulance:
                this.state.situations.filter(
                  s => ~s.totalDistance && !s.waitForAmbulance,
                ).length >= this.maxAmbulances,
              drone: {
                station: stationIndex,
                dist: stationDist,
                progress: 0,
                done: false,
                time: 0,
              },
              totalDistance: path.routes[0].legs[0].distance.value,
              totalDuration: path.routes[0].legs[0].duration.value,
              pointsInPath: path.routes[0].overview_path.length,
              type,
            })
            this.setState({ ...this.state, situations })
          }
        },
      )
    } else {
      const situations = this.state.situations.slice(0)
      const { index: stationIndex, dist: stationDist } = this.nearestStation(
        position,
      )
      const stations = this.state.stations.slice(0)
      if (~stationIndex) stations[stationIndex].drones++
      situations.push({
        path: null,
        position,
        time: 0,
        done: false,
        waitForAmbulance: false,
        drone: {
          station: stationIndex,
          dist: stationDist,
          progress: 0,
          done: false,
          time: 0,
        },
        totalDistance: -1,
        totalDuration: -1,
        pointsInPath: 0,
        type,
      })
      this.setState({
        ...this.state,
        situations,
        selectedPoint: position,
        type,
      })
    }
  }

  nearestStation(position) {
    let minDist = Infinity
    let minIndex = -1
    this.state.stations.forEach((station, i) => {
      const dist = window.google.maps.geometry.spherical.computeDistanceBetween(
        { lat: () => station.lat, lng: () => station.lng },
        { lat: () => position.lat, lng: () => position.lng },
      )
      if (minDist > dist && station.drones < this.maxDronesPerStation) {
        minDist = dist
        minIndex = i
      }
    })

    return { index: minIndex, dist: minDist }
  }

  componentDidMount() {
    setInterval(() => {
      const stations = this.state.stations
      let ambulancesNotUsed =
        this.maxAmbulances -
        this.state.situations.filter(
          s => ~s.totalDistance && !s.waitForAmbulance,
        ).length
      const situations = this.state.situations
        .map(e => {
          const doneWaiting = e.waitForAmbulance && ambulancesNotUsed > 0
          if (doneWaiting) ambulancesNotUsed--
          return {
            ...e,
            waitForAmbulance: e.waitForAmbulance && !doneWaiting,
          }
        })
        .map(e => {
          const direction = e.done ? -1 : 1
          const droneDirection = e.drone.done ? -1 : 1
          const droneOnStart =
            e.drone.done &&
            ((e.drone.time / 1000) * this.droneSpeed) / 3.6 / e.drone.dist <= 0
          if (~e.drone.station && droneOnStart) {
            stations[e.drone.station].drones--
          }
          return {
            ...e,
            time:
              e.time +
              this.timeInterval *
                direction *
                (~e.totalDistance ? 1 : 0) *
                (e.waitForAmbulance ? 0 : 1),
            drone: {
              ...e.drone,
              time:
                e.drone.time +
                this.timeInterval * droneDirection * (~e.drone.station ? 1 : 0),
              done:
                e.drone.done ||
                (((e.drone.time + this.timeInterval * droneDirection) / 1000) *
                  this.droneSpeed) /
                  3.6 /
                  e.drone.dist >=
                  1,
              station: droneOnStart ? -1 : e.drone.station,
            },
            done:
              e.done ||
              (((e.time + this.timeInterval * direction) / 1000) *
                this.ambulanceSpeed) /
                3.6 /
                e.totalDistance >=
                1,
          }
        })
        .filter(e =>
          ~e.totalDistance
            ? !(
                e.done &&
                ((e.time / 1000) * this.ambulanceSpeed) /
                  3.6 /
                  e.totalDistance <=
                  0
              )
            : ~e.drone.station || e.waitForAmbulance,
        )
      this.setState({ ...this.state, situations, stations })
    }, this.timeInterval)
  }

  handleRadioSelect(type) {
    this.setState({ ...this.state, type })
  }

  getRandomPosition() {
    return {
      lat:
        this.bounds.lat1 +
        Math.random() * (this.bounds.lat2 - this.bounds.lat1),
      lng:
        this.bounds.lng1 +
        Math.random() * (this.bounds.lng2 - this.bounds.lng1),
    }
  }

  placeStroke() {
    const { lat, lng } = this.getRandomPosition()
    this.placeSituation(lat, lng, 'stroke')
  }

  placeHeroin() {
    const { lat, lng } = this.getRandomPosition()
    this.placeSituation(lat, lng, 'heroin')
  }

  render() {
    const markers = this.state.stations.map((e, i) => {
      return <Marker position={e} key={i} defaultIcon={this.stationIcon} />
    })

    const paths = this.state.situations
      .filter(e => !e.done && e.path !== null)
      .map((e, i) => (
        <DirectionsRenderer
          directions={e.path}
          key={i}
          options={{ preserveViewport: true, suppressMarkers: true }}
        />
      ))

    const droneLines = this.state.situations
      .filter(e => !e.drone.done && ~e.drone.station)
      .map((e, i) => (
        <Polyline
          path={[this.state.stations[e.drone.station], e.position]}
          key={i}
        />
      ))

    const persons = this.state.situations
      .filter(
        e =>
          (e.type === 'stroke' && (e.waitForAmbulance || !e.done)) ||
          (e.type === 'heroin' && !e.drone.done),
      )
      .map((e, i) => {
        let icon = e.type
        if (e.type === 'stroke' && e.drone.done) {
          icon = 'strokeFixed'
        }
        return (
          <Marker key={i} position={e.position} icon={this.typeIcons[icon]} />
        )
      })

    const ambulances = this.state.situations
      .filter(e => ~e.totalDistance)
      .map((e, i) => {
        const progress =
          ((e.time / 1000) * this.ambulanceSpeed) / 3.6 / e.totalDistance
        const index = Math.min(
          e.pointsInPath - 2,
          parseInt(progress * e.pointsInPath),
        )
        const offset = progress * e.pointsInPath - index
        const lat = e.path.routes[0].overview_path[index].lat()
        const lng = e.path.routes[0].overview_path[index].lng()
        const lat2 = e.path.routes[0].overview_path[index + 1].lat()
        const lng2 = e.path.routes[0].overview_path[index + 1].lng()
        return (
          <Marker
            key={i}
            position={{
              lat: lat + (lat2 - lat) * offset,
              lng: lng + (lng2 - lng) * offset,
            }}
            defaultIcon={this.ambulanceIcon}
          />
        )
      })

    const drones = this.state.situations
      .filter(e => ~e.drone.station)
      .map((e, i) => {
        const progress =
          ((e.drone.time / 1000) * this.droneSpeed) / 3.6 / e.drone.dist
        const lat = this.state.stations[e.drone.station].lat
        const lng = this.state.stations[e.drone.station].lng
        const lat2 = e.position.lat
        const lng2 = e.position.lng
        return (
          <Marker
            key={i}
            position={{
              lat: lat + (lat2 - lat) * progress,
              lng: lng + (lng2 - lng) * progress,
            }}
            defaultIcon={this.droneIcon}
          />
        )
      })

    return (
      <div className="Demo">
        <div>
          <div className="demo-stats">
            <b>Ambulanser ledig: </b>
            {this.maxAmbulances -
              this.state.situations.filter(
                s => ~s.totalDistance && !s.waitForAmbulance,
              ).length}{' '}
            / {this.maxAmbulances}
          </div>
          <div className="demo-stats">
            <b>Droner ledig: </b>
            {this.maxDronesPerStation * this.state.stations.length -
              this.state.situations.filter(
                s => ~s.drone.station && !s.waitForAmbulance,
              ).length}{' '}
            / {this.maxDronesPerStation * this.state.stations.length}
          </div>
          <div className="demo-add">
            <h3>Legg til situasjoner:</h3>
            <button onClick={this.placeStroke.bind(this)}>
              + Hjerteinfarkt
            </button>
            <button onClick={this.placeHeroin.bind(this)}>
              + Heroinoverdose
            </button>
          </div>
          {/*
          <input
            type="radio"
            name="type"
            defaultChecked={true}
            id="stroke"
            onChange={() => this.handleRadioSelect('stroke')}
          />
          <label htmlFor="stroke">Hjerteinfarkt</label>
          <input
            type="radio"
            name="type"
            id="heroin"
            onChange={() => this.handleRadioSelect('heroin')}
          />
          <label htmlFor="heroin">Heroinoverdose (Opioidoverdose)</label>
          */}
        </div>
        <DemoMap
          markers={markers}
          paths={paths}
          persons={persons}
          ambulances={ambulances}
          drones={drones}
          droneLines={droneLines}
          stations={this.state.stations}
          selected={this.state.selectedPoint}
          onClick={this.onClick.bind(this)}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_QcAdoHfUZgyxnB66tYyRUm6yF759J_o&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                flex: '1 0 240px',
                display: 'flex',
                flexDirection: 'column',
              }}
            />
          }
          mapElement={<div style={{ height: `100%`, flex: '1 0 240px' }} />}
        />
      </div>
    )
  }
}
