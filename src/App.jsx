import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage"; // import the PostPage component
import ViewPage from "./components/ViewPage";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <div className="drawer h-screen bg-lm-blue font-outfit">
      <BrowserRouter>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          <div className="hero min-h-screen">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/view" element={<ViewPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
