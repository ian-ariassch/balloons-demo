import React, { useEffect } from "react";
import { Path, Transformer, Group } from "react-konva";

const balloonPathData = `M4430 12789 c-921 -59 -1769 -370 -2480 -908 -1067 -807 -1758 -2084
-1914 -3536 -69 -641 -34 -1378 100 -2105 192 -1039 624 -2084 1222 -2955 536
-781 1225 -1439 1919 -1834 140 -79 424 -214 558 -264 215 -80 439 -136 648
-162 60 -7 111 -16 115 -19 8 -9 -15 -237 -34 -326 -35 -167 -134 -411 -198
-487 -33 -40 -33 -73 2 -105 59 -57 173 -82 372 -83 213 0 331 25 393 83 36
34 34 62 -7 116 -114 150 -225 522 -226 758 0 54 -15 47 150 68 889 116 1919
814 2751 1865 480 607 892 1332 1182 2085 466 1210 624 2521 441 3659 -214
1337 -881 2491 -1874 3242 -876 663 -1971 982 -3120 908z`;

export default function Balloon({
  color = "red",
  scale = 0.05,
  x = 50,
  y = 50,
}) {
  const groupRef = React.useRef<any>(null);
  const trRef = React.useRef<any>(null);
  const [isSelected, setIsSelected] = React.useState(false);

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale({ x: scale, y: scale });
    }
  }, [scale]);

  const handleClick = (e) => {
    e.cancelBubble = true;
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const stage = groupRef.current?.getStage();
    if (!stage) return;

    const handleStageClick = (e) => {
      if (e.target === stage) {
        setIsSelected(false);
      }
    };

    stage.on("click", handleStageClick);
    return () => {
      stage.off("click", handleStageClick);
    };
  }, []);

  console.log("Balloon rendered with color:", color, "at position:", x, y);
  return (
    <>
      <Group
        x={x}
        y={y}
        draggable
        ref={groupRef}
        onClick={handleClick}
        onTap={handleClick}
      >
        <Path
          data={balloonPathData}
          fill={color}
          stroke="black"
          strokeWidth={2}
          rotation={180}
        />
      </Group>
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
}
