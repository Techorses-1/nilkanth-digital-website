import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/logo/white_logo.png"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "Categories", href: "/categories" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={`navbar-shell ${isMobileMenuOpen ? "menu-open" : ""}`}
      >
        <nav className="navbar">
          <div className="navbar-content">
            <motion.div
              className="navbar-logo"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/">
                <img src={logo} alt="Nilkanth Digital" className="navbar-logo-img" />
              </Link>
            </motion.div>

            <ul className="navbar-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Link
                      to={link.href}
                      className={isActive(link.href) ? "active" : ""}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.a
              href="#inquiry"
              className="navbar-inquiry-btn"
              whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Inquiry
            </motion.a>

            <label className="hamburger">
              <input
                type="checkbox"
                checked={isMobileMenuOpen}
                onChange={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="navbar-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <ul>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <Link
                      to={link.href}
                      className={isActive(link.href) ? "active" : ""}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                >
                  <a
                    href="#inquiry"
                    className="mobile-inquiry-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inquiry
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </header >
  );
};

export default Navbar;