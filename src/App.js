import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  let [color, setCount] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  })

  return (
    <div className="App">
      <button onClick={() => setCount(() => {
        color = 'red';
      })}>
        Click me
      </button>
    </div>
  );
}

export default App;
