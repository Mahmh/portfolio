import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSignals } from "@preact/signals-react/runtime";
import { Umami } from "@const";
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

const PortfolioPage = () => {
  useEffect(() => {
    if (!Umami.PORTFOLIO_WEBSITE_ID || !Umami.SCRIPT_URL) return;
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", Umami.PORTFOLIO_WEBSITE_ID);
    script.setAttribute("src", Umami.SCRIPT_URL);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
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
  );
};

const BlogPage = () => {
  useEffect(() => {
    if (!Umami.BLOG_WEBSITE_ID || !Umami.SCRIPT_URL) return;
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", Umami.BLOG_WEBSITE_ID);
    script.setAttribute("src", Umami.SCRIPT_URL);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BlogLayout />}>
        <Route index element={<Blog />} />
        <Route path=":slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  useSignals();

  return (
    <BrowserRouter>
      {isBlogHost.value ? <BlogPage /> : <PortfolioPage />}
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
