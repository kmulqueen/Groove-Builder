import React, { useState } from "react";
import stickings from "./stickings.json";
import grids from "./grid.json";

function App() {
  const [sticking, setSticking] = useState("");
  const [subdivision, setSubdivision] = useState("Eighth");
  const [grid, setGrid] = useState("");

  stickings.map(sticking => {
    const patternRegex = /(\w{4}) (\w{4}) (\|) (\w{4}) (\w{4})/;
    const patternMatch = sticking.pattern.match(patternRegex);
    const fullPattern = patternMatch[0];
    const measure1 = `${patternMatch[1]} ${patternMatch[2]}`;
    const measure2 = `${patternMatch[4]} ${patternMatch[5]}`;
    const beat1 = patternMatch[1];
    const beat2 = patternMatch[2];
    const beat3 = patternMatch[4];
    const beat4 = patternMatch[5];

    sticking.fullPattern = fullPattern;
    sticking.measure1 = measure1;
    sticking.measure2 = measure2;
    sticking.beat1 = beat1;
    sticking.beat2 = beat2;
    sticking.beat3 = beat3;
    sticking.beat4 = beat4;
  });

  const onStickingClick = () => {
    const randomSticking =
      stickings[Math.floor(Math.random() * stickings.length)];
    setSticking(randomSticking.fullPattern);
  };

  const onGridClick = () => {
    // Find grids with the same subdivision as the subdivision state
    const currentSubdivision = subdivision.toLowerCase();
    const match = grids.filter(grid => grid.subdivision === currentSubdivision);
    // Generate random grid from that subdivision
    const randomGrid =
      match[0].patterns[Math.floor(Math.random() * match[0].patterns.length)];
    // Set grid
    setGrid(randomGrid.count);
  };

  const handleSubdivisionChange = e => {
    setSubdivision(e.target.value);
  };

  return (
    <div className="App">
      <div className="sticking">
        <p>Sticking: {sticking}</p>
        <button onClick={onStickingClick}>Generate</button>
      </div>
      <div className="grid">
        <p>Grid: {grid}</p>
        <select
          name="Subdivision"
          id=""
          value={subdivision}
          onChange={handleSubdivisionChange}
        >
          <option value="Eighth">Eighth</option>
          <option value="Triplet">Triplet</option>
          <option value="Sixteenth">Sixteenth</option>
        </select>
        <button onClick={onGridClick}>Generate</button>
      </div>
      <div className="hi-hat">
        <p>Hi-Hat</p>
      </div>
      <div className="snare">
        <p>Snare</p>
      </div>
      <div className="bass">
        <p>Bass</p>
      </div>
    </div>
  );
}

export default App;
