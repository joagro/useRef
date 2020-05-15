import React from 'react';
import { Layer, Line } from "react-konva";

export default function Grid() {

  var longitudes = []
  var latitudes = []

  for(let i =0; i < 41; i++){
    let latitude = <Line x={i*10} y={0} points={[i*10, 0, i*10, 800]} stroke="black" />
    longitudes.push(latitude)

    let longitude = <Line x={0} y={i*10} points={[800, i*10, 0, i*10]} stroke="black" />
    latitudes.push(longitude)
  }
  /*
  for(let i =0; i < 41; i++){
    let longitude = <Line x={0} y={i*10} points={[800, i*10, 0, i*10]} stroke="black" />
    latitudes.push(longitude)
  }
  */
  return (
      <Layer>
      {longitudes}
      {latitudes}
      </Layer>
  );
}
