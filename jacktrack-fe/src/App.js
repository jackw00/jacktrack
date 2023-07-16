import './App.css';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Ex from "./components/Ex";
import ExList from "./components/ExList";
import AddEx from "./components/AddEx";

function App() {
  return (
    <div className="App bg-gray-100 text-center">      
      <nav class="bg-white border-gray-200 dark:bg-gray-700 font-mono">
        <div class="max-w-screen-xl flex flex-wrap items-centers justify-between p-4">
          <h1 className="text-white font-bold">JackTrack</h1>
          <Link to={"/exercises"} className="text-white" >Exercises</Link>
          <Link to={"/add"} className="text-white justify-end" >Add Exercise</Link>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<ExList/>} />
          <Route path="/exercises" element={<ExList/>} />
          <Route path="/add" element={<AddEx/>} />
          <Route path="/exercises/:id" element={<Ex/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
