import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

import SubmissionForm from "./apps/submission-form/SubmissionForm";
import JokesGenerator from "./apps/jokes-generator/JokesGenerator";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/apps/submission-form" element={<SubmissionForm />} />
            <Route path="/apps/jokes-generator" element={<JokesGenerator />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
