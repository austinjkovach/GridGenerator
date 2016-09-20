import React from 'react';
import Tuplet from './Tuplet';

require("./Canvas.scss");

class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {grid} = this.props

    var generateTuplets = function(blocks) {

      var blockArray = [];
      for(var i=0;i<blocks;i++){
        blockArray.push(i);
      }

      var tuplets = grid.map(function(tValue, tupletIndex) {

        return (
          <div className="block-container" key={tupletIndex}>
            {
              blockArray.map(function(blockIndex){
                return  (
                  <Tuplet grid={grid} key={blockIndex + (tupletIndex*blocks)} accentIndex={tupletIndex} />
                )
              })
            }
          </div>
        )

      });

      return (
        <div className="tuplets-container">
          {tuplets}
        </div>
      )
    }

    return (
      <div className="canvas">
        {generateTuplets(4)}
        {generateTuplets(2)}
        {generateTuplets(1)}
      </div>
    )
  }
}

export default Canvas





