import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSignals } from "@preact/signals-react/runtime";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@const";
import { isBlogHost } from "@context";
import LandingPage from "./routes/LandingPage";
import Projects from "./routes/Projects";
import Certificates from "./routes/Certificates";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Layout from "./Layout";
import NotFound from "./routes/NotFound";
import BlogLayout from "./routes/blog/Layout";
import Blog from "./routes/blog/Blog";
import BlogPost from "./routes/blog/BlogPost";

const App = () => {
  useSignals();

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
      {isBlogHost.value ? (
        <Routes>
          <Route path="/" element={<BlogLayout />}>
            <Route index element={<Blog />} />
            <Route path=":slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<Blog />} />
            <Route path=":slug" element={<BlogPost />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
