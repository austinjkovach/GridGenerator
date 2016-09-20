import React from 'react';
// require('./Tuplet.scss');

class Tuplet extends React.Component {
  render() {

    var drags = this.props.grid.map(function(x, i) {
      if(x.drag) {
        return (<rect key={i} width="55" height="15" transform={"translate(" + ((i * 100) + 27) + " 105) rotate(-25)"} />)
      }
      else {
        return null;
      }
    })

    var flams = this.props.grid.map(function(x, i) {
      if(x.flam) {
        return (
          <g key={i} transform={"scale(1.5) translate(" + ((i * 68.5) -55) + " 50)"}>
            <path d="M53.5 25 Q 54 40 65 40" stroke="#000" fill="transparent" strokeWidth="5"></path>
            <rect x="51.5" y="25" width="4" height="35" />
            <ellipse transform="translate(46 60) rotate(-25)" rx="10" ry="8"/>
          </g>
        )
      }
      else {
        return null;
      }
    })



    this.props.accentIndex;
    var accent = function(i) {
      if(i === null) {
        return null
      }
      return(
        <polyline strokeLinejoin="bevel" stroke="#000" strokeWidth="7" fill="none"
          points={"" + ((i*100)+30) + ",4 " + ((i*100)+70) + ",20 " + ((i*100)+30) + ",36"}
        />
      )

    }
    // <ellipse transform="translate(96 168) rotate(-25)" rx="10" ry="8"></ellipse>
    return (
        <svg width={75} height={75} viewBox={"0 0 400 200"}>
          <g transform="translate(50 0)">

            {accent(this.props.accentIndex)}
            <g transform="translate(0 15)">

              <rect x="55" y="35" width="200" height="20" />
              {drags}
              {flams}
              <rect x="55" y="35" width="5" height="125"/>
              <ellipse transform="translate(36 160) rotate(-25)" rx="25" ry="20" fill="#000"/>

              <rect x="155" y="35" width="5" height="125"/>
              <ellipse transform="translate(136 160) rotate(-25)" rx="25" ry="20" fill="#000"/>

              <rect x="255" y="35" width="5" height="125"/>
              <ellipse transform="translate(236 160) rotate(-25)" rx="25" ry="20" fill="#000"/>
            </g>
          </g>
        </svg>
    )
  }
}

class Drag extends React.Component {
  render() {
    return (
      <svg width={500} height={250} viewBox={"0 0 1000 1000"}>
        <rect width="55" height="15" transform=" translate(27 105) rotate(-25)" />
      </svg>
    )
  }
}

export default Tuplet;



