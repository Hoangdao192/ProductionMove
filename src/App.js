import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DarshboardProvider } from "./context";
import { DarshBoard } from "./Darshboard";

function App() {
  return (
    <div className="App">
      <DarshboardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DarshBoard />}></Route>
          </Routes>
        </BrowserRouter>
      </DarshboardProvider>
    </div>
  );
}

export default App;
