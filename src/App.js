import Canvas from './components/canvas/Canvas.js';
import './App.css';

function App() {
  const height = window.innerHeight;

  return (
    <div style={{"height":height}} className="App">
      <Canvas/>
    </div>
  );
}

export default App;
