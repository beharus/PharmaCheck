import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/img.jpg';
import './Home.css';
import ChatbotWidget from '../../components/chatbot/Chatbot';
import Header from '../../components/header/Header';

export default function Home() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.card, .step-card, .team-card, .tech-card, .roadmap-card');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observerRef.current.observe(el);
    });

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroGradients = document.querySelectorAll('.hero-gradient-1, .hero-gradient-2');

      heroGradients.forEach((gradient, index) => {
        const speed = index === 0 ? 0.5 : 0.3;
        gradient.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <ChatbotWidget />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="badge badge-primary">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Pharmaceutical Security Solution</span>
              </div>

              <h1 className="hero-title">
                Stop Counterfeit
                <span className="gradient-text">Medications</span>
              </h1>

              <p className="hero-description">
                Verify authentic medicines instantly with our blockchain-powered QR verification system.
                One scan protects millions of patients from dangerous counterfeits.
              </p>

              <div className="button-group">
                <a href="#team" className="btn btn-hero">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  </svg>
                  Our team
                </a>
                <a href="#about" className="btn btn-outline">Learn More</a>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <svg className="icon icon-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>One-time QR codes</span>
                </div>
                <div className="feature-item">
                  <svg className="icon icon-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Blockchain secured</span>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-glow"></div>
              <img src={image} alt="PharmaCheck verification system" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="about" className="problem-solution-section">
        <div className="container">
          <div className="two-col-grid">
            {/* Problem */}
            <div className="col">
              <div className="badge badge-destructive">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>The Problem</span>
              </div>

              <h2 className="section-title">
                Counterfeit Medicines
                <span className="subtitle">Are Everywhere</span>
              </h2>

              <div className="card-stack">
                <div className="card card-destructive">
                  <div className="card-icon card-icon-destructive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">Fake Medications Flood the Market</h3>
                    <p className="card-text">
                      Millions of counterfeit medicines are sold daily, containing wrong ingredients or dangerous substances that harm patients.
                    </p>
                  </div>
                </div>

                <div className="card card-destructive">
                  <div className="card-icon card-icon-destructive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">No Way to Verify Authenticity</h3>
                    <p className="card-text">
                      Patients and pharmacies have no reliable method to confirm if medications are genuine before purchase.
                    </p>
                  </div>
                </div>

                <div className="card card-destructive">
                  <div className="card-icon card-icon-destructive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">Easy to Copy Traditional Labels</h3>
                    <p className="card-text">
                      Counterfeiters easily replicate standard packaging and labels, making fakes indistinguishable from originals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="col">
              <div className="badge badge-primary">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Our Solution</span>
              </div>

              <h2 className="section-title">
                Blockchain-Powered
                <span className="gradient-text">Verification System</span>
              </h2>

              <div className="card-stack">
                <div className="card card-primary">
                  <div className="card-icon card-icon-hero">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">Scratch-Off QR Codes</h3>
                    <p className="card-text">
                      Each medicine has a unique QR code with a scratch-off cover. Once removed, it can't be reapplied - preventing resale of fakes.
                    </p>
                  </div>
                </div>

                <div className="card card-primary">
                  <div className="card-icon card-icon-hero">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">Instant Mobile Verification</h3>
                    <p className="card-text">
                      Scan the QR code with our app to instantly verify authenticity, view medicine details, manufacturing date, and expiry information.
                    </p>
                  </div>
                </div>

                <div className="card card-primary">
                  <div className="card-icon card-icon-hero">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">One-Time Use Security</h3>
                    <p className="card-text">
                      Each QR code can only be scanned once. If scanned again, the system alerts that it's a potential counterfeit - stopping mass copying.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-primary">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              </svg>
              <span>How It Works</span>
            </div>

            <h2 className="section-title centered">
              Four Simple Steps to
              <span className="gradient-text">Verify Your Medicine</span>
            </h2>

            <p className="section-description">
              Our intuitive verification process takes seconds and provides complete confidence in your medication's authenticity.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <div className="step-glow gradient-hero-bg"></div>
                <div className="step-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21V7l-5-3H9L4 7v14" />
                    <path d="M4 7h16" />
                    <path d="M9 7v10" />
                    <path d="M15 7v10" />
                  </svg>
                </div>
                <div className="step-number">1</div>
              </div>
              <h3 className="step-title">Manufacturer Seals Medicine</h3>
              <p className="step-text">Each authentic medicine receives a unique QR code with a scratch-off cover during manufacturing.</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <div className="step-glow gradient-accent-bg"></div>
                <div className="step-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  </svg>
                </div>
                <div className="step-number">2</div>
              </div>
              <h3 className="step-title">Customer Scratches & Scans</h3>
              <p className="step-text">Using a coin, customer removes the cover and scans the QR code with our mobile app.</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <div className="step-glow gradient-hero-bg"></div>
                <div className="step-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="step-number">3</div>
              </div>
              <h3 className="step-title">System Verifies Authenticity</h3>
              <p className="step-text">Our blockchain system checks if the code is genuine and hasn't been scanned before.</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <div className="step-glow gradient-accent-bg"></div>
                <div className="step-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="step-number">4</div>
              </div>
              <h3 className="step-title">Instant Result Display</h3>
              <p className="step-text">App shows verification status, medicine details, ingredients, and expiry date instantly.</p>
            </div>
          </div>

          <div className="security-card">
            <div className="card-icon card-icon-hero">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 className="card-title">Security Guarantee</h3>
              <p className="card-text">
                If a QR code has been previously scanned, our system immediately alerts you that it may be a counterfeit.
                This prevents mass copying and ensures each medicine package can only be verified once, eliminating the risk of fake duplicates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-accent">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Our Team</span>
            </div>

            <h2 className="section-title centered">
              Meet the Experts Behind
              <span className="gradient-text">PharmaCheck</span>
            </h2>

            <p className="section-description">
              A passionate team of developers and innovators dedicated to eliminating counterfeit medicines through cutting-edge technology.
            </p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-glow"></div>
                <div className="team-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
              <h3 className="team-name">Sanatbek Bokijonov</h3>
              <div className="team-role">
                <span className="role-text">Project Manager</span>
                <span className="team-badge">Team Lead</span>
              </div>
              <div className="skills">
                <span className="skill">Product Strategy</span>
                <span className="skill">Team Leadership</span>
                <span className="skill">Agile Management</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-glow"></div>
                <div className="team-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
              </div>
              <h3 className="team-name">Muhammad Nur Suxbatullayev</h3>
              <div className="team-role">
                <span className="role-text">Backend Developer</span>
              </div>
              <div className="skills">
                <span className="skill">Node.js</span>
                <span className="skill">PostgreSQL</span>
                <span className="skill">API Design</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-glow"></div>
                <div className="team-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
              </div>
              <h3 className="team-name">Muhammadyor Musinov</h3>
              <div className="team-role">
                <span className="role-text">Backend Developer</span>
              </div>
              <div className="skills">
                <span className="skill">Django Python</span>
                <span className="skill">Cloud Infrastructure</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-glow"></div>
                <div className="team-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
              </div>
              <h3 className="team-name">Behruz Eshquvatov</h3>
              <div className="team-role">
                <span className="role-text">Front/Mobile Developer</span>
              </div>
              <div className="skills">
                <span className="skill">React</span>
                <span className="skill">React Native</span>
                <span className="skill">UI/UX</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-glow"></div>
                <div className="team-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
              </div>
              <h3 className="team-name">Shahzod Omonboyev</h3>
              <div className="team-role">
                <span className="role-text">Backend Developer</span>
              </div>
              <div className="skills">
                <span className="skill">Python</span>
                <span className="skill">AI Training</span>
                <span className="skill">ML Integration</span>
                <span className="skill">Data Processing</span>
              </div>
            </div>
          </div>

          <div className="why-us-card">
            <h3 className="why-us-title">Why Our Team Can Solve This</h3>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-number gradient-text">9+</div>
                <p className="stat-label">Months Combined Experience</p>
              </div>
              <div className="stat">
                <div className="stat-number gradient-text">100%</div>
                <p className="stat-label">Focused on Healthcare Security</p>
              </div>
              <div className="stat">
                <div className="stat-number gradient-text">24/7</div>
                <p className="stat-label">Dedicated Support</p>
              </div>
            </div>
            <p className="why-us-text">
              Our multidisciplinary team brings together expertise in blockchain security, mobile development,
              and pharmaceutical logistics. We've researched counterfeit medication patterns extensively and
              designed a solution that's both technically robust and user-friendly for patients and pharmacies alike.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="roadmap-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-primary">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              <span>Roadmap</span>
            </div>

            <h2 className="section-title centered">
              Our Journey from
              <span className="gradient-text">Idea to Impact</span>
            </h2>

            <p className="section-description">
              We're building PharmaCheck methodically, ensuring each phase delivers real value and learnings for the next.
            </p>
          </div>

          <div className="roadmap-timeline">
            <div className="roadmap-item">
              <div className="roadmap-card roadmap-completed">
                <div className="roadmap-header">
                  <div className="roadmap-icon gradient-hero-bg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </svg>
                  </div>
                  <div className="roadmap-info">
                    <span className="phase-badge phase-completed">IDEA</span>
                    <span className="timeline-text">Q4 2024</span>
                    <h3 className="roadmap-title">Concept & Research</h3>
                  </div>
                </div>
                <p className="roadmap-text">Market research, problem validation, and solution design. Identified the critical need for pharmaceutical verification.</p>
                <ul className="achievement-list">
                  <li>Interviewed 50+ pharmacies and patients</li>
                  <li>Analyzed counterfeit medication patterns</li>
                  <li>Designed unique QR security system</li>
                </ul>
              </div>
            </div>

            <div className="roadmap-item">
              <div className="roadmap-card roadmap-completed">
                <div className="roadmap-header">
                  <div className="roadmap-icon gradient-hero-bg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div className="roadmap-info">
                    <span className="phase-badge phase-completed">PROTOTYPE</span>
                    <span className="timeline-text">Q1 2025</span>
                    <h3 className="roadmap-title">Technical Prototype</h3>
                  </div>
                </div>
                <p className="roadmap-text">Built working prototype with core QR verification, mobile app, and blockchain integration proof-of-concept.</p>
                <ul className="achievement-list">
                  <li>Developed QR generation system</li>
                  <li>Created mobile app prototype</li>
                  <li>Tested blockchain verification</li>
                </ul>
              </div>
            </div>

            <div className="roadmap-item">
              <div className="roadmap-card roadmap-current">
                <div className="roadmap-header">
                  <div className="roadmap-icon gradient-accent-bg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </div>
                  <div className="roadmap-info">
                    <span className="phase-badge phase-current">MVP</span>
                    <span className="timeline-text">Q2 2026</span>
                    <h3 className="roadmap-title">Minimum Viable Product</h3>
                  </div>
                </div>
                <p className="roadmap-text">Launching MVP with 10 partner pharmacies for beta testing. Full mobile app and verification system operational.</p>
                <ul className="achievement-list">
                  <li>Partner with 10 pilot pharmacies</li>
                  <li>Deploy 1,000 QR-enabled medicines</li>
                  <li>Gather user feedback and iterate</li>
                </ul>
              </div>
            </div>

            <div className="roadmap-item">
              <div className="roadmap-card roadmap-upcoming">
                <div className="roadmap-header">
                  <div className="roadmap-icon roadmap-icon-upcoming">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <div className="roadmap-info">
                    <span className="phase-badge phase-upcoming">LAUNCHED</span>
                    <span className="timeline-text">Q3-Q4 2026</span>
                    <h3 className="roadmap-title">Full Launch & Scale</h3>
                  </div>
                </div>
                <p className="roadmap-text">Regional expansion, manufacturer partnerships, and scaling to 100+ pharmacies with automated QR printing integration.</p>
                <ul className="achievement-list upcoming-list">
                  <li>Partner with 3+ manufacturers</li>
                  <li>Expand to 100+ pharmacies</li>
                  <li>Process 100,000+ verifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-primary">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>Technology & Implementation</span>
            </div>

            <h2 className="section-title centered">
              Powered by
              <span className="gradient-text">Cutting-Edge Technology</span>
            </h2>

            <p className="section-description">
              Our tech stack combines blockchain security, AI intelligence, and mobile-first design to create an unbreakable verification system.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <h3 className="tech-title">Mobile App</h3>
              </div>
              <ul className="tech-list">
                <li>React Native</li>
                <li>TypeScript</li>
                <li>QR Code Scanner</li>
                <li>Biometric Auth</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <h3 className="tech-title">Backend</h3>
              </div>
              <ul className="tech-list">
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>Redis Cache</li>
                <li>RESTful APIs</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="tech-title">Blockchain</h3>
              </div>
              <ul className="tech-list">
                <li>Ethereum</li>
                <li>Smart Contracts</li>
                <li>IPFS Storage</li>
                <li>Web3.js</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h3 className="tech-title">AI & ML</h3>
              </div>
              <ul className="tech-list">
                <li>OpenAI GPT-4</li>
                <li>Image Recognition</li>
                <li>Fraud Detection</li>
                <li>Pattern Analysis</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                </div>
                <h3 className="tech-title">Infrastructure</h3>
              </div>
              <ul className="tech-list">
                <li>AWS Cloud</li>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>CI/CD Pipeline</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="tech-header">
                <div className="tech-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="tech-title">Security</h3>
              </div>
              <ul className="tech-list">
                <li>End-to-End Encryption</li>
                <li>OAuth 2.0</li>
                <li>SSL/TLS</li>
                <li>Penetration Testing</li>
              </ul>
            </div>
          </div>

          <div className="implementation-section">
            <h3 className="implementation-title">Implementation Roadmap</h3>

            <div className="implementation-grid">
              <div className="implementation-card">
                <h4 className="implementation-phase">
                  <span className="phase-number">1</span>
                  Phase 1: Foundation
                </h4>
                <ul className="implementation-list">
                  <li>Set up cloud infrastructure on AWS</li>
                  <li>Develop QR code generation system with UUID</li>
                  <li>Build PostgreSQL database for medicine records</li>
                  <li>Create basic mobile app with QR scanner</li>
                </ul>
              </div>

              <div className="implementation-card">
                <h4 className="implementation-phase">
                  <span className="phase-number">2</span>
                  Phase 2: Verification System
                </h4>
                <ul className="implementation-list">
                  <li>Implement blockchain smart contracts</li>
                  <li>Develop one-time scan verification logic</li>
                  <li>Build medicine information database</li>
                  <li>Create admin dashboard for manufacturers</li>
                </ul>
              </div>

              <div className="implementation-card">
                <h4 className="implementation-phase">
                  <span className="phase-number">3</span>
                  Phase 3: AI Integration
                </h4>
                <ul className="implementation-list">
                  <li>Integrate GPT-4 for natural language queries</li>
                  <li>Implement image recognition for tamper detection</li>
                  <li>Build fraud pattern detection system</li>
                  <li>Add predictive analytics for supply chain</li>
                </ul>
              </div>

              <div className="implementation-card">
                <h4 className="implementation-phase">
                  <span className="phase-number">4</span>
                  Phase 4: Scale & Launch
                </h4>
                <ul className="implementation-list">
                  <li>Optimize for 100,000+ daily scans</li>
                  <li>Deploy multi-region infrastructure</li>
                  <li>Implement real-time monitoring</li>
                  <li>Launch manufacturer onboarding program</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ai-card">
            <h3 className="ai-title">AI-Powered Intelligence</h3>
            <p className="ai-text">
              We leverage OpenAI's GPT-4 for natural language processing, enabling patients to ask questions about their medications in plain language.
              Our ML models detect counterfeit patterns and anomalies in real-time, while image recognition validates packaging authenticity.
              This AI integration makes verification not just secure, but intelligent and user-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">
                <svg className="footer-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="footer-brand-name">PharmaCheck</span>
              </div>
              <p className="footer-text">
                Protecting patients from counterfeit medications through blockchain-powered verification.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><Link to="/#about">Problem & Solution</Link></li>
                <li><Link to="/#how-it-works">How It Works</Link></li>
                <li><Link to="/#team">Our Team</Link></li>
                <li><Link to="/#roadmap">Roadmap</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Technology</h4>
              <ul className="footer-links">
                <li><Link to="/#tech">Tech Stack</Link></li>
                <li><Link to="/#security">Security</Link></li>
                <li><Link to="/#blockchain">Blockchain</Link></li>
                <li><Link to="/#ai">AI Integration</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 PharmaCheck. All rights reserved. Protecting patients worldwide.</p>
          </div>
        </div>
      </footer>
    </>
  );
}