import { Component, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const SubmissionForm = lazy(() => import("./apps/submission-form/SubmissionForm"));
const ColorTool = lazy(() => import("./apps/color-tool/ColorTool"));

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "appHome" : "app"}>
      {!isHome && <Navbar />}
      <main className={isHome ? "" : "main-container"}>
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps/submission-form" element={<SubmissionForm />} />
            <Route path="/apps/color-tool" element={<ColorTool />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
