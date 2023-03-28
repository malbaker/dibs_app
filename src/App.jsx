import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage"; // import the PostPage component
import ViewPage from "./components/ViewPage";
import ContactPage from "./components/ContactPage";
import FAQ from "./components/FAQ";
import ReturnToTop from "./components/ReturnToTopButton";

function App() {
  return (
    <div className="drawer h-screen bg-lm-blue font-outfit">
      <BrowserRouter>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content" id="scrolledElement">
          <Navbar />
          <div className="hero min-h-screen" style={{ overflowX: "hidden" }}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/view" element={<ViewPage />} />

              <Route path="/contact" element={<ContactPage />} />

              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>
        </div>
        <Sidebar />
        {window.location.pathname === "/view" ? <ReturnToTop /> : null}
      </BrowserRouter>
    </div>
  );
}

export default App;
