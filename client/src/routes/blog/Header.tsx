import "@styles/routes/blog/Header.scss";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useEffect, useRef } from "react";
import { isBlogHost } from "@context";

const menuOpen = signal(false);
const isDesktop = signal(window.innerWidth > 968);
const closeMenu = () => (menuOpen.value = false);

export default function Header() {
  useSignals();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      isDesktop.value = window.innerWidth > 968;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const header = document.getElementById("header");
    if (header && backdropRef.current) {
      const height = header.offsetHeight;
      backdropRef.current.style.top = `${height}px`;
    }
  }, [menuOpen.value]);

  return (
    <>
      <header id="blog-header">
        <NavLink
          to={isBlogHost.value ? "/" : "/blog"}
          onClick={closeMenu}
          className="logo"
        >
          Maher Mahmoud
          <span> Blog</span>
        </NavLink>

        {!isDesktop.value && (
          <button
            className="menu-toggle"
            onClick={() => (menuOpen.value = !menuOpen.value)}
          >
            {menuOpen.value ? <HiX /> : <HiMenu />}
          </button>
        )}

        {isDesktop.value && (
          <div id="desktop-links">
            <Link
              to={isBlogHost.value ? "https://mahermah.com/" : "/"}
              className="main-website-button"
            >
              Main Website
            </Link>
            <Link to="/contact" className="header-cta-button desktop-cta">
              Book a Call
            </Link>
          </div>
        )}
      </header>

      {!isDesktop.value && (
        <>
          <div
            ref={backdropRef}
            className={`menu-backdrop ${menuOpen.value ? "visible" : ""}`}
            onClick={closeMenu}
          />
          <nav className={`blog-nav-links ${menuOpen.value ? "open" : ""}`}>
            <Link
              to={isBlogHost.value ? "https://mahermah.com/" : "/"}
              onClick={closeMenu}
              className="main-website-button mobile-cta"
            >
              Main Website
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="header-cta-button mobile-cta"
            >
              Book a Call
            </Link>
          </nav>
        </>
      )}
    </>
  );
}
