import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import HomePage from "./HomePage";
import MovieDetailsDisplay from "./Movies/MovieDetailsDislay";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsDisplay />} />

          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
