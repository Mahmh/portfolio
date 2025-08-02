import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@const";
import LandingPage from "./routes/LandingPage";
import Projects from "./routes/Projects";
import Certificates from "./routes/Certificates";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Blog from "./routes/Blog";
import BlogPost from "./routes/BlogPost";
import Layout from "./Layout";
import NotFound from "./routes/NotFound";

const App = () => {
  useEffect(() => {
    if (!UMAMI_WEBSITE_ID || !UMAMI_SCRIPT_URL) return;
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", UMAMI_WEBSITE_ID);
    script.setAttribute("src", UMAMI_SCRIPT_URL);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
