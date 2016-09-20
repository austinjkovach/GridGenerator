import React from 'react';

class dragIcon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg" version="1.1"
        width="100px" height="100px" fill="#fff">
        
        <rect width="55" height="15" transform="translate(20 55) rotate(-25)" />

      </svg>
    )
  }
}

export default dragIcon