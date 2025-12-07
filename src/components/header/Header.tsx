import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Main", path: "/" },
    { name: "Demo", path: "/demo" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <div className="logo-wrapper">
              <div className="logo-glow" />
              <div className="logo-icon">
                <Shield />
              </div>
            </div>
            <span className="logo-text">
              <span className="logo-part1">Pharma</span>
              <span className="logo-part2">Check</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="desktop-cta">
             <a href="https://pharmachecklite.netlify.app" target='_blank'
              className="cta-button"
            >
              <span>Try Prototype</span>
              <svg
                className="cta-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="close-icon" />
            ) : (
              <Menu className="menu-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : "closed"}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link ${
                  isActive(link.path) ? "active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mobile-menu-divider" />
            <a href="https://pharmachecklite.netlify.app" target='_blank'
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-cta-button"
            >
              Try Prototype
              <svg
                className="mobile-cta-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
