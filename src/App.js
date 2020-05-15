import React, { useRef, useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Shape, Path, Circle } from "react-konva";
import Grid from './components/Grid'
import './App.css';

function App() {

  const arc = useRef();
  const mypath = useRef();
  const circ = useRef();
  const myCirclesRefs = useRef([]);
  const mylayer = useRef();

  const [myCircles, setMyCircles] = useState([]);

  

  const myarc = <Path  ref={arc} x={0} y={0} stroke= 'red' scaleX={1} scaleY={1} data={"M 100 350 q 150 -300 300 0"} visible={true} />;

  //data for motion along path animation example
  var data = [{"x":34,"y":34},{"x":84,"y":64},{"x":141,"y":79},{"x":181.5,"y":78.5},{"x":218,"y":62},{"x":223,"y":40},{"x":240,"y":26},
  {"x":259.5,"y":25},{"x":271,"y":40},{"x":292.5,"y":53},{"x":311.25,"y":55.5},{"x":330.625,"y":46.75},{"x":332.3125,"y":30.375},
  {"x":349.15625,"y":10.1875},{"x":374.578125,"y":10.09375},{"x":392,"y":26},{"x":411,"y":36},{"x":444.5,"y":37},
  {"x":453.875,"y":27.25},{"x":463.25,"y":17.5},{"x":472.9375,"y":10.625},{"x":494.625,"y":15.75},{"x":530,"y":48},
  {"x":534,"y":88},{"x":540,"y":150},{"x":552,"y":198},{"x":544,"y":227},{"x":522,"y":256},{"x":504.5,"y":263},{"x":471,"y":262},
  {"x":448,"y":252},{"x":372,"y":214},{"x":290,"y":146},{"x":256,"y":100},{"x":198,"y":104},{"x":182,"y":140},{"x":204,"y":185},
  {"x":203,"y":201.5},{"x":190,"y":214},{"x":174.5,"y":218},{"x":155,"y":214},{"x":124,"y":222},{"x":113.5,"y":232.5},{"x":95,"y":227},
  {"x":75.5,"y":211.5},{"x":72,"y":188},{"x":58,"y":136}]
  
  //creating path data string
  var p = "M" + data[0].x + " " + data[0].y;
  for (var i = 1; i < data.length; i = i + 1){
    p = p + " L" + data[i].x + " " + data[i].y;
  }

  const movecirc = () => {
    // Animating a circle along a path
    var steps = 1000; // number of steps in animation
    var pathLen = mypath.current.getLength();
    var step = pathLen / steps;
    var pos =0, pt;

    var anim = new Konva.Animation(function(frame) {
        pos = pos + 1;
        pt = mypath.current.getPointAtLength(pos * step);
        /*this is as far as I have gotten, I can see that there is an array of references in the react-dev tools in the browser
        but when I try to access them, they are undefined*/
        console.log(myCirclesRefs)
        console.log(myCirclesRefs.current)
        myCirclesRefs.current[0].position({x: pt.x, y: pt.y});    
    }, mylayer.current.getLayer());

  anim.start();
  }

  useEffect(()=>{
    
    let arcFractions = 4
    myCirclesRefs.current = new Array(arcFractions + 1);
    let arclength = arc.current.getLength();
    let arcFractionSize = arclength/arcFractions;

    let arcpositions = [];
    for (let i = 0; i < arcFractions +1; i++) {
      let arcposition = arc.current.getPointAtLength(arcFractionSize*i)
      arcpositions.push(arcposition)
    }
    setMyCircles(arcpositions)
    console.log(myCirclesRefs)
    movecirc()
  },[])


  return (
    <div>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Grid />
      <Layer ref={mylayer}>
      <Path
        ref={mypath}
        x={0}
        y={0}
        stroke='red'
        scaleX={1}
        scaleY={1}
        data={p}
        visible={false}
      />

      <Circle
        ref={circ}
        x={34}
        y={34}
        width={20}
        height={20}
        fill="cyan"
        shadowBlur={5}
        draggable
        onClick={movecirc}
      />

      {myarc}
      
      {myCircles.map( (element, i) => <Circle ref = {el => myCirclesRefs.current[i] = el}
        x={element.x} y={element.y} width={20} height={20} fill="pink" shadowBlur={5}
        draggable></Circle> )}


      </Layer>
    </Stage>
    </div>
  );
}

export default App;