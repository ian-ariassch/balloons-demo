// src/components/BalloonCanvas.jsx
import { Stage, Layer } from "react-konva";

import React, { useState } from "react";
import Balloon from "./Balloon.tsx";

export default function BalloonCanvas({ balloons, addBalloon }) {
  const [pickedColor, setPickedColor] = useState("#ff0000");

  return (
    <>
      <button onClick={() => addBalloon(pickedColor)}>Add Balloon</button>
      <input
        type="color"
        value={pickedColor}
        onChange={(e) => setPickedColor(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <Stage width={800} height={600}>
        <Layer>
          {balloons.map((b, i) => (
            <Balloon key={i} x={b.x} y={b.y} color={b.color} scale={b.scale} />
          ))}
        </Layer>
      </Stage>
    </>
  );
}
