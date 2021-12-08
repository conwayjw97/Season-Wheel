import Canvas from './components/canvas/Canvas.js';
import Settings from "./components/settings/Settings.js";
import './App.css';

function App() {
  const height = window.innerHeight;
  const date = new Date();

  const handleSave = () => {
    console.log("Saved!");
  }

  return (
    <div style={{"height":height}} className="App">
      <Canvas/>
      <Settings date={date} handleSave={handleSave}/>
    </div>
  );
}

export default App;
