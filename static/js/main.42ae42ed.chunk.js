(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,n){e.exports=n(368)},151:function(e,t,n){},161:function(e,t,n){},360:function(e,t,n){},362:function(e,t,n){},364:function(e,t,n){},366:function(e,t,n){},368:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(40),s=n.n(i),r=(n(151),n(12)),l=n(13),c=n(15),d=n(14),u=n(16),p=n(86),h=n.n(p),m=(n(161),n(20)),g=n(18),f=(n(360),Object(g.withScriptjs)(Object(g.withGoogleMap)(function(e){return o.a.createElement(g.GoogleMap,{options:{draggable:!1},onClick:e.onClick,defaultZoom:12,defaultCenter:{lat:63.4189785,lng:10.4026859}},e.paths,e.droneLines,e.markers,e.persons,e.ambulances,e.drones,o.a.createElement(g.Marker,{position:e.stations[0],defaultIcon:{url:"http://icons.iconarchive.com/icons/icons-land/gis-gps-map/256/Hospital-icon.png",anchor:{x:25,y:25},scaledSize:{width:50,height:50}}}))}))),v=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={selectedPoint:{lat:0,lng:0},situations:[],stations:[{drones:0,lat:63.420457,lng:10.3904378},{drones:0,lat:63.4173341,lng:10.3540778},{drones:0,lat:63.4179966,lng:10.3518891},{drones:0,lat:63.3982869,lng:10.3971434},{drones:0,lat:63.4031339,lng:10.427388},{drones:0,lat:63.3874465,lng:10.3301954},{drones:0,lat:63.4096514,lng:10.4184723},{drones:0,lat:63.3951255,lng:10.3692269},{drones:0,lat:63.3933766,lng:10.3718019},{drones:0,lat:63.4094977,lng:10.4439425},{drones:0,lat:63.3911854,lng:10.4300809},{drones:0,lat:63.4249907,lng:10.4420114},{drones:0,lat:63.4311337,lng:10.4508948},{drones:0,lat:63.4347805,lng:10.4143739},{drones:0,lat:63.4344063,lng:10.4130435},{drones:0,lat:63.4334658,lng:10.3962421},{drones:0,lat:63.4313689,lng:10.39783},{drones:0,lat:63.4302508,lng:10.3935385},{drones:0,lat:63.4306683,lng:10.39621}],type:"stroke"},n.timeInterval=100,n.maxAmbulances=10,n.maxDronesPerStation=3,n.speedup=10,n.ambulanceSpeed=200*n.speedup,n.droneSpeed=80*n.speedup,n.stationIcon={url:"https://cdn2.iconfinder.com/data/icons/large-home-icons/512/Drugstore_store_pharmacy_medicine_hospital.png",anchor:{x:15,y:25},scaledSize:{width:30,height:30}},n.droneIcon={url:"https://png.pngtree.com/svg/20161124/uav_110217.png",anchor:{x:15,y:15},scaledSize:{width:30,height:30}},n.ambulanceIcon={url:"http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42545-ambulance-icon.png",anchor:{x:15,y:15},scaledSize:{width:30,height:30}},n.typeIcons={heroin:{url:"https://static.thenounproject.com/png/641158-200.png",anchor:{x:15,y:15},scaledSize:{width:30,height:30}},stroke:{url:"https://static.thenounproject.com/png/893753-200.png",anchor:{x:15,y:15},scaledSize:{width:30,height:30}},strokeFixed:{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/2000px-Person_icon_BLACK-01.svg.png",anchor:{x:15,y:25},scaledSize:{width:30,height:30}}},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"onClick",value:function(e){var t=this,n=e.latLng.lat(),a=e.latLng.lng(),o={lat:n,lng:a};if(this.setState(Object(m.a)({},this.state,{selectedPoint:o})),"stroke"===this.state.type){(new window.google.maps.DirectionsService).route({origin:new window.google.maps.LatLng(63.420457,10.3904378),destination:new window.google.maps.LatLng(n,a),travelMode:window.google.maps.TravelMode.DRIVING},function(e,n){if(n===window.google.maps.DirectionsStatus.OK){var a=t.state.situations.slice(0),i=-1,s=t.nearestStation(o),r=s.index,l=s.dist;l/t.droneSpeed<e.routes[0].legs[0].distance.value/t.ambulanceSpeed&&(i=r);var c=t.state.stations.slice(0);~i&&c[i].drones++,a.push({path:e,position:o,time:0,done:!1,waitForAmbulance:t.state.situations.filter(function(e){return~e.totalDistance&&!e.waitForAmbulance}).length>=t.maxAmbulances,drone:{station:i,dist:l,progress:0,done:!1,time:0},totalDistance:e.routes[0].legs[0].distance.value,totalDuration:e.routes[0].legs[0].duration.value,pointsInPath:e.routes[0].overview_path.length,type:t.state.type}),t.setState(Object(m.a)({},t.state,{situations:a}))}})}else{var i=this.state.situations.slice(0),s=this.nearestStation(o),r=s.index,l=s.dist,c=this.state.stations.slice(0);~r&&c[r].drones++,i.push({path:null,position:o,time:0,done:!1,waitForAmbulance:!1,drone:{station:r,dist:l,progress:0,done:!1,time:0},totalDistance:-1,totalDuration:-1,pointsInPath:0,type:this.state.type}),this.setState(Object(m.a)({},this.state,{situations:i}))}}},{key:"nearestStation",value:function(e){var t=this,n=1/0,a=-1;return this.state.stations.forEach(function(o,i){var s=window.google.maps.geometry.spherical.computeDistanceBetween({lat:function(){return o.lat},lng:function(){return o.lng}},{lat:function(){return e.lat},lng:function(){return e.lng}});n>s&&o.drones<t.maxDronesPerStation&&(n=s,a=i)}),{index:a,dist:n}}},{key:"componentDidMount",value:function(){var e=this;setInterval(function(){var t=e.state.stations,n=e.maxAmbulances-e.state.situations.filter(function(e){return~e.totalDistance&&!e.waitForAmbulance}).length,a=e.state.situations.map(function(e){var t=e.waitForAmbulance&&n>0;return t&&n--,Object(m.a)({},e,{waitForAmbulance:e.waitForAmbulance&&!t})}).map(function(n){var a=n.done?-1:1,o=n.drone.done?-1:1,i=n.drone.done&&n.drone.time/1e3*e.droneSpeed/3.6/n.drone.dist<=0;return~n.drone.station&&i&&t[n.drone.station].drones--,Object(m.a)({},n,{time:n.time+e.timeInterval*a*(~n.totalDistance?1:0)*(n.waitForAmbulance?0:1),drone:Object(m.a)({},n.drone,{time:n.drone.time+e.timeInterval*o*(~n.drone.station?1:0),done:n.drone.done||(n.drone.time+e.timeInterval*o)/1e3*e.droneSpeed/3.6/n.drone.dist>=1,station:i?-1:n.drone.station}),done:n.done||(n.time+e.timeInterval*a)/1e3*e.ambulanceSpeed/3.6/n.totalDistance>=1})}).filter(function(t){return~t.totalDistance?!(t.done&&t.time/1e3*e.ambulanceSpeed/3.6/t.totalDistance<=0):~t.drone.station||t.waitForAmbulance});e.setState(Object(m.a)({},e.state,{situations:a,stations:t}))},this.timeInterval)}},{key:"handleRadioSelect",value:function(e){this.setState(Object(m.a)({},this.state,{type:e}))}},{key:"render",value:function(){var e=this,t=this.state.stations.map(function(t,n){return o.a.createElement(g.Marker,{position:t,key:n,defaultIcon:e.stationIcon})}),n=this.state.situations.filter(function(e){return!e.done&&null!==e.path}).map(function(e,t){return o.a.createElement(g.DirectionsRenderer,{directions:e.path,key:t,options:{preserveViewport:!0,suppressMarkers:!0}})}),a=this.state.situations.filter(function(e){return!e.drone.done&&~e.drone.station}).map(function(t,n){return o.a.createElement(g.Polyline,{path:[e.state.stations[t.drone.station],t.position],key:n})}),i=this.state.situations.filter(function(e){return"stroke"===e.type&&(e.waitForAmbulance||!e.done)||"heroin"===e.type&&!e.drone.done}).map(function(t,n){var a=t.type;return"stroke"===t.type&&t.drone.done&&(a="strokeFixed"),o.a.createElement(g.Marker,{key:n,position:t.position,icon:e.typeIcons[a]})}),s=this.state.situations.filter(function(e){return~e.totalDistance}).map(function(t,n){var a=t.time/1e3*e.ambulanceSpeed/3.6/t.totalDistance,i=Math.min(t.pointsInPath-2,parseInt(a*t.pointsInPath)),s=a*t.pointsInPath-i,r=t.path.routes[0].overview_path[i].lat(),l=t.path.routes[0].overview_path[i].lng(),c=t.path.routes[0].overview_path[i+1].lat(),d=t.path.routes[0].overview_path[i+1].lng();return o.a.createElement(g.Marker,{key:n,position:{lat:r+(c-r)*s,lng:l+(d-l)*s},defaultIcon:e.ambulanceIcon})}),r=this.state.situations.filter(function(e){return~e.drone.station}).map(function(t,n){var a=t.drone.time/1e3*e.droneSpeed/3.6/t.drone.dist,i=e.state.stations[t.drone.station].lat,s=e.state.stations[t.drone.station].lng,r=t.position.lat,l=t.position.lng;return o.a.createElement(g.Marker,{key:n,position:{lat:i+(r-i)*a,lng:s+(l-s)*a},defaultIcon:e.droneIcon})});return o.a.createElement("div",{className:"Demo"},o.a.createElement("div",null,o.a.createElement("span",null,"Ambulanser ledig:"," ",this.maxAmbulances-this.state.situations.filter(function(e){return~e.totalDistance&&!e.waitForAmbulance}).length," ","/ ",this.maxAmbulances),o.a.createElement("input",{type:"radio",name:"type",defaultChecked:!0,id:"stroke",onChange:function(){return e.handleRadioSelect("stroke")}}),o.a.createElement("label",{htmlFor:"stroke"},"Hjerteinfarkt"),o.a.createElement("input",{type:"radio",name:"type",id:"heroin",onChange:function(){return e.handleRadioSelect("heroin")}}),o.a.createElement("label",{htmlFor:"heroin"},"Heroinoverdose (Opioidoverdose)")),o.a.createElement(f,{markers:t,paths:n,persons:i,ambulances:s,drones:r,droneLines:a,stations:this.state.stations,selected:this.state.selectedPoint,onClick:this.onClick.bind(this),googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyD_QcAdoHfUZgyxnB66tYyRUm6yF759J_o&v=3.exp&libraries=geometry,drawing,places",loadingElement:o.a.createElement("div",{style:{height:"100%"}}),containerElement:o.a.createElement("div",{style:{flex:"1 0 420px",display:"flex",flexDirection:"column"}}),mapElement:o.a.createElement("div",{style:{height:"100%",flex:"1 0 420px"}})}))}}]),t}(a.Component),b=(n(362),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=Object.assign({},this.props.style,{color:this.props.color||"white"});return o.a.createElement("div",Object.assign({className:"Page",style:e},this.props),this.props.children)}}]),t}(a.Component)),w=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("a",Object.assign({},this.props,{className:"Jump",href:"#".concat(this.props.to),onClick:function(){return e.props.onClick(e.props.to)}}),this.props.content||this.props.children)}}]),t}(a.Component),y=(n(364),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",Object.assign({className:"Tabs"},this.props),this.props.children)}}]),t}(a.Component)),k=(n(366),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",Object.assign({className:"FadeInBlock"},this.props),o.a.createElement("h3",null,this.props.title),o.a.createElement("p",null,this.props.children))}}]),t}(a.Component)),E=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={showDemo:!0},n.pages={},n.refPage=function(e){n.pages[e.props.page]=e},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.location.hash&&setTimeout(function(){h()(e.pages[window.location.hash.slice(1)],{offset:0,align:"top",duration:0})},1e3)}},{key:"scroll",value:function(e){h()(this.pages[e],{offset:0,align:"top",duration:500,ease:"inOutSine"})}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(b,{color:"white",page:"tittel",ref:this.refPage},o.a.createElement("div",{className:"logo"},o.a.createElement("h1",{className:"name"},"eDrone"),o.a.createElement("img",{className:"image",alt:"eDrone logo",src:"logo.svg"})),o.a.createElement("h1",null,"Effektivisere Akutten med Droner"),o.a.createElement("p",null,"Dette er en alternativ presentasjonsform i EiT fra gruppe 5 i landsbyen for Fremtidens Smarte Sykehus.")),o.a.createElement(y,null,o.a.createElement(w,{to:"edrone",onClick:this.scroll.bind(this)},"Hva er eDrone?"),o.a.createElement(w,{to:"om",onClick:this.scroll.bind(this)},"Om oss"),o.a.createElement(w,{to:"tidslinje",onClick:this.scroll.bind(this)},"Hva kan eDrone gj\xf8re?"),o.a.createElement(w,{to:"demo",onClick:this.scroll.bind(this)},"Interaktiv demo")),o.a.createElement(b,{color:"white",page:"edrone",ref:this.refPage},o.a.createElement("h2",null,"Hva er eDrone?"),o.a.createElement("p",null,"asdasdasd")),o.a.createElement(b,{color:"white",page:"om",ref:this.refPage},o.a.createElement("h2",null,"Om oss"),o.a.createElement("p",null)),o.a.createElement(b,{color:"white",page:"tidslinje",ref:this.refPage},o.a.createElement("h2",{className:"no-bottom"},"Droner i behandling av"),o.a.createElement("h1",{className:"no-top no-bottom"},"Opioidoverdoser"),o.a.createElement("p",null,"P\xe5r\xf8rende oppdager en overdose"),o.a.createElement(k,{side:"right",title:"Symptomer"},"Opioidoverdoser kjennetegnes av nedsatt bevissthet og nedsatt respirasjon"),o.a.createElement(k,{side:"left",title:"En livstruende tilstand"},"Ved en overdose med opioider slutter pasienten \xe5 puste"),o.a.createElement(k,{side:"right",title:"263 overdosed\xf8dsfall i \xe5ret"},"I Norge d\xf8r det i snitt 263 personer av overdoser hvert \xe5r")),o.a.createElement(b,{color:"white",page:"demo",ref:this.refPage,style:{padding:"0"}},this.state.showDemo?o.a.createElement(v,null):null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[146,2,1]]]);
//# sourceMappingURL=main.42ae42ed.chunk.js.map