import Canvas from './components/canvas/Canvas.js';
import DateInfo from "./components/date/DateInfo.js";
import './App.css';

function App() {
  const height = window.innerHeight;

  return (
    <div style={{"height":height}} className="App">
      <DateInfo/>
      <Canvas/>
    </div>
  );
}

export default App;
