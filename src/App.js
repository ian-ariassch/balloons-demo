import "./App.css";
import BalloonCanvas from "./components/CanvasEditor.tsx";
import React, { useState } from "react";

function App() {
  const [balloons, setBalloons] = useState([
    { x: 50, y: 50, scale: 0.01, color: "red" },
  ]);

  const addBalloon = (color) => {
    console.log("Adding balloon with color:", color);
    const newBalloon = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.01,
      color: color ?? "blue", // Default color if none provided
    };
    setBalloons([...balloons, newBalloon]);
  };

  return (
    <div className="App">
      <BalloonCanvas balloons={balloons} addBalloon={addBalloon} />
    </div>
  );
}

export default App;
