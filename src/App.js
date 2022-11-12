import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import WorkingPage from "./pages/WorkingPage";
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#282a36",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#4aee88",
                secondary: "#FFFAEE",
              },
            },
            error: {
              duration: 2500,
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<WorkingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
