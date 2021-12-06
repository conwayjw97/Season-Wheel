import Canvas from './components/canvas/Canvas.js';
import Settings from "./components/settings/Settings.js";
import './App.css';

function App() {
  const height = window.innerHeight;

  return (
    <div style={{"height":height}} className="App">
      <Canvas/>
      <Settings/>
    </div>
  );
}

export default App;
