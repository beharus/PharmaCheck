import React, { useState } from 'react';
import './Demo.css';
import Header from '../../components/header/Header';
import ChatbotWidget from '../../components/chatbot/Chatbot';

const Demo = () => {
  const [projectStatus] = useState('MVP');

  return (
    <div className="demo-page">
      <Header />
      <ChatbotWidget />
      {/* Hero Section */}
      <section className="demo-hero-section">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="container">
          <div className="demo-hero-content">
            <span className="badge badge-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Live Demo
            </span>
            <h1 className="demo-hero-title">
              <span className="gradient-text">Experience Our Solution</span>
            </h1>
            <p className="demo-hero-description">
              Watch how our platform solves real problems and transforms the user experience
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="demo-video-section">
        <div className="container">
          <div className="video-card">
            <div className="video-header">
              <h2 className="section-title">Demo Video</h2>
              <span className="badge badge-accent">1-5 minutes</span>
            </div>
            <div className="video-wrapper">
              <div className="video-placeholder">
                <div className="video-icon-wrapper">
                  <div className="video-glow gradient-hero-bg"></div>
                  <svg className="video-icon" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className="video-text">Demo video will be displayed here</p>
                <a href="#" className="btn btn-hero">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Upload Demo Video
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="demo-description-section">
        <div className="container">
          <div className="description-grid">
            {/* What's Shown */}
            <div className="description-card">
              <div className="card-header-demo">
                <div className="card-icon-demo gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="card-title-demo">What's Demonstrated</h3>
              </div>
              <div className="card-content-demo">
                <ul className="demo-list">
                  <li>Core functionality and user interface walkthrough</li>
                  <li>Key features solving the identified problem</li>
                  <li>User journey from start to completion</li>
                  <li>Integration with AI-powered components</li>
                  <li>Real-time data processing and results</li>
                </ul>
              </div>
            </div>

            {/* Problem & Solution Connection */}
            <div className="description-card">
              <div className="card-header-demo">
                <div className="card-icon-demo gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="card-title-demo">Problem & Solution Link</h3>
              </div>
              <div className="card-content-demo">
                <p className="demo-text">
                  <strong>Problem Addressed:</strong> Users struggle with inefficient processes 
                  that waste time and resources.
                </p>
                <p className="demo-text">
                  <strong>Our Solution:</strong> The demo showcases how our platform automates 
                  complex tasks, reducing processing time by 80% and improving accuracy through 
                  AI-powered analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="demo-tech-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title centered">Technology Stack</h2>
            <p className="section-description">
              Built with modern technologies and AI solutions
            </p>
          </div>

          <div className="tech-stack-grid">
            <div className="tech-stack-card">
              <div className="tech-stack-header">
                <div className="tech-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>Frontend</h3>
              </div>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Tailwind CSS</span>
                <span className="tech-tag">Next.js</span>
              </div>
            </div>

            <div className="tech-stack-card">
              <div className="tech-stack-header">
                <div className="tech-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <h3>Backend</h3>
              </div>
              <div className="tech-tags">
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">Redis</span>
              </div>
            </div>

            <div className="tech-stack-card">
              <div className="tech-stack-header">
                <div className="tech-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3>AI Solutions</h3>
              </div>
              <div className="tech-tags">
                <span className="tech-tag">OpenAI GPT-4</span>
                <span className="tech-tag">Claude AI</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">LangChain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="demo-status-section">
        <div className="container">
          <div className="status-card">
            <div className="status-header">
              <h2 className="section-title">Project Status & Roadmap</h2>
              <span className={`status-badge status-${projectStatus.toLowerCase()}`}>
                {projectStatus}
              </span>
            </div>
            
            <div className="status-grid">
              <div className="status-item">
                <div className="status-icon completed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="status-content">
                  <h4>Completed</h4>
                  <ul className="status-list">
                    <li>Core feature development</li>
                    <li>AI model integration</li>
                    <li>User authentication system</li>
                    <li>Initial UI/UX design</li>
                  </ul>
                </div>
              </div>

              <div className="status-item">
                <div className="status-icon in-progress">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="status-content">
                  <h4>In Progress</h4>
                  <ul className="status-list">
                    <li>Advanced analytics dashboard</li>
                    <li>Real-time collaboration features</li>
                    <li>Mobile app development</li>
                    <li>Performance optimization</li>
                  </ul>
                </div>
              </div>

              <div className="status-item">
                <div className="status-icon upcoming">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="status-content">
                  <h4>Next Steps</h4>
                  <ul className="status-list">
                    <li>Beta testing with select users</li>
                    <li>Enterprise features rollout</li>
                    <li>API documentation completion</li>
                    <li>Marketing campaign launch</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Prototype */}
      <section className="demo-prototype-section">
        <div className="container">
          <div className="prototype-card">
            <div className="prototype-header">
              <div className="prototype-icon-wrapper">
                <div className="prototype-glow gradient-hero-bg"></div>
                <div className="prototype-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </div>
              </div>
              <div className="prototype-text">
                <h2 className="section-title">Try Live Prototype</h2>
                <p className="prototype-description">
                  Experience our working prototype firsthand. No registration required for testing.
                </p>
              </div>
            </div>

            <div className="prototype-info">
              <div className="info-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div className="info-content">
                  <h4>Test Credentials</h4>
                  <div className="credentials">
                    <div className="credential-item">
                      <span className="credential-label">Username:</span>
                      <code className="credential-value">demo@example.com</code>
                    </div>
                    <div className="credential-item">
                      <span className="credential-label">Password:</span>
                      <code className="credential-value">demo123456</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prototype-actions">
              <a href="#" className="btn btn-hero btn-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Launch Prototype
              </a>
              <a href="#" className="btn btn-outline btn-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;