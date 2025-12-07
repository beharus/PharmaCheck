import React, { useState, useRef } from 'react';
import './Demo.css';
import Header from '../../components/header/Header';
import ChatbotWidget from '../../components/chatbot/Chatbot';
import videoSource from '../../assets/video.mp4';

const Demo = () => {
  const [projectStatus] = useState('MVP');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [isApiCodeExpanded, setIsApiCodeExpanded] = useState(false);
  const [isResponseExpanded, setIsResponseExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
    const requestCode = `const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "message": "Loyihangiz AI'dan qanday foydalanadi?"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ai-chat-bot-oig5.onrender.com/api/chat/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`;

  const responseCode = `{
  "conversation_id": null,
  "response": "Hello! How can I assist you today?",
  "timestamp": "2025-12-07T12:03:41.460677Z"
}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

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
              See how our QR-based authentication system eliminates counterfeit pharmaceuticals and protects consumer safety
            </p>
          </div>
        </div>
      </section>

      {/* Main Demo Section - Video and Description */}
      <section className="demo-main-section">
        <div className="container">
          <div className="demo-main-grid">

            {/* Video Card - Left Side */}
            <div className="video-card-main">
              <div className="video-header-main">
                <h3 className="video-title-main">Watch Our Demo</h3>
                <span className="badge badge-accent">5 min</span>
              </div>
              <div className="custom-video-player">
                <iframe style={{height: '100%', width: '100%', aspectRatio: 9/16}} src="https://www.youtube.com/embed/SzYGkDQIuIQ" title="PharmaCheck - O&#39;zbekistondagi eng yaxshi sog&#39;ligni saqlash ilovasi." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>

            {/* Description Content - Right Side */}
            <div className="demo-description-content">
              <h2 className="description-title">
                Revolutionizing Pharmaceutical Authentication
              </h2>

              <div className="description-intro">
                <p>
                  In a world where counterfeit medications pose serious health risks, our innovative
                  QR-based verification system provides an unbreakable shield of protection for consumers
                  and pharmaceutical companies alike.
                </p>
              </div>

              <div className="feature-highlight">
                <div className="feature-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h3>Secure & Tamper-Proof</h3>
                  <p>
                    Each pharmaceutical product is equipped with a unique QR code sealed beneath a
                    scratch-off layer. This physical security measure ensures that once removed,
                    the product cannot be resealed or resold as original, creating an irreversible
                    authentication mark.
                  </p>
                </div>
              </div>

              <div className="feature-highlight">
                <div className="feature-icon gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3>One-Time Verification</h3>
                  <p>
                    Our system tracks every scan in real-time. When a consumer scans a QR code using
                    our mobile app, the UUID is verified against our secure database. If the code has
                    been scanned before, the system immediately flags it as potentially counterfeit,
                    preventing the spread of fake medications.
                  </p>
                </div>
              </div>

              <div className="feature-highlight">
                <div className="feature-icon gradient-hero-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div>
                  <h3>Complete Product Information</h3>
                  <p>
                    Upon successful verification, users gain instant access to comprehensive product
                    details including active ingredients, manufacturing date, expiration date, batch
                    numbers, and manufacturer information—all verified directly from the source.
                  </p>
                </div>
              </div>

              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-number gradient-text">100%</div>
                  <div className="stat-label">Counterfeit Detection</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number gradient-text">&lt;2s</div>
                  <div className="stat-label">Verification Time</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number gradient-text">24/7</div>
                  <div className="stat-label">System Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Cards Section - Bottom */}
      <section className="demo-cards-section">
        <div className="container">
          <div className="demo-cards-grid">

            {/* What's Demonstrated Card */}
            <div className="info-card">
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
                  <li>QR code scanning and verification process</li>
                  <li>Real-time authentication of pharmaceutical products</li>
                  <li>Scratch-off security layer demonstration</li>
                  <li>Product information display (ingredients, dates, manufacturer)</li>
                  <li>One-time use validation preventing counterfeits</li>
                  <li>Mobile app user interface and experience</li>
                </ul>
              </div>
            </div>

            {/* Problem & Solution Card */}
            <div className="info-card">
              <div className="card-header-demo">
                <div className="card-icon-demo gradient-accent-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="card-title-demo">Problem & Solution</h3>
              </div>
              <div className="card-content-demo">
                <div className="problem-solution-block">
                  <h4>The Problem</h4>
                  <p>
                    Counterfeit pharmaceuticals flood the market, putting lives at risk. Consumers
                    have no reliable way to verify authenticity at the point of purchase. Fake
                    medications can contain harmful substances or wrong dosages, leading to serious
                    health consequences.
                  </p>
                </div>
                <div className="problem-solution-block">
                  <h4>Our Solution</h4>
                  <p>
                    Each medication receives a unique QR code with a scratch-off security layer.
                    Users scan the code through our app to instantly verify authenticity. The
                    one-time-use system prevents counterfeiters from copying and reselling fake
                    products as originals, creating a secure ecosystem for pharmaceutical distribution.
                  </p>
                </div>
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
                    <li>QR code generation and encryption system</li>
                    <li>Scratch-off security layer integration</li>
                    <li>Mobile app scanner functionality</li>
                    <li>UUID-based verification database</li>
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
                    <li>Pharmacy partner onboarding platform</li>
                    <li>Manufacturer integration API</li>
                    <li>Real-time counterfeit detection alerts</li>
                    <li>Product information database expansion</li>
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
                    <li>Pilot program with major pharmacy chains</li>
                    <li>Regulatory compliance certification</li>
                    <li>Consumer awareness campaign launch</li>
                    <li>Scale to cover 10,000+ pharmacies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            <section className="api-integration-section">
        <div className="container">
          <div className="api-section-header">
            <h2 className="section-title">
              <span className="gradient-text">API Integration</span>
            </h2>
            <p className="section-subtitle">
              Easily integrate with our AI chatbot API for seamless communication
            </p>
          </div>

          <div className="api-demo-grid">
            {/* Request Block */}
            <div className="api-block">
              <div className="api-block-header">
                <div className="api-block-title">
                  <div className="api-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <h3>API Request</h3>
                </div>
                <div className="api-block-actions">
                  <button 
                    className="api-action-btn"
                    onClick={() => setIsApiCodeExpanded(!isApiCodeExpanded)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {isApiCodeExpanded ? 
                        <polyline points="18 15 12 9 6 15" /> :
                        <polyline points="6 9 12 15 18 9" />
                      }
                    </svg>
                  </button>
                  <button 
                    className="api-action-btn copy-btn"
                    onClick={() => copyToClipboard(requestCode, 'request')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {isCopied && <span className="copy-tooltip">Copied!</span>}
                  </button>
                </div>
              </div>
              
              <div className={`code-block ${isApiCodeExpanded ? 'expanded' : ''}`}>
                <pre>
                  <code className="language-javascript">
                    {requestCode}
                  </code>
                </pre>
              </div>

              <div className="api-block-description">
                <p>
                  <strong>Endpoint:</strong> <code className="inline-code">https://ai-chat-bot-oig5.onrender.com/api/chat/</code>
                </p>
                <p>
                  <strong>Method:</strong> <span className="method-tag method-post">POST</span>
                </p>
                <p>
                  <strong>Headers:</strong> <code className="inline-code">Content-Type: application/json</code>
                </p>
              </div>
            </div>

            {/* Response Block */}
            <div className="api-block">
              <div className="api-block-header">
                <div className="api-block-title">
                  <div className="api-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3>API Response</h3>
                </div>
                <div className="api-block-actions">
                  <button 
                    className="api-action-btn"
                    onClick={() => setIsResponseExpanded(!isResponseExpanded)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {isResponseExpanded ? 
                        <polyline points="18 15 12 9 6 15" /> :
                        <polyline points="6 9 12 15 18 9" />
                      }
                    </svg>
                  </button>
                  <button 
                    className="api-action-btn copy-btn"
                    onClick={() => copyToClipboard(responseCode, 'response')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className={`code-block ${isResponseExpanded ? 'expanded' : ''}`}>
                <pre>
                  <code className="language-json">
                    {responseCode}
                  </code>
                </pre>
              </div>

              <div className="api-block-description">
                <div className="response-fields">
                  <div className="field-row">
                    <span className="field-name">conversation_id</span>
                    <span className="field-type">string | null</span>
                    <span className="field-desc">Unique conversation identifier</span>
                  </div>
                  <div className="field-row">
                    <span className="field-name">response</span>
                    <span className="field-type">string</span>
                    <span className="field-desc">AI-generated response message</span>
                  </div>
                  <div className="field-row">
                    <span className="field-name">timestamp</span>
                    <span className="field-type">string (ISO 8601)</span>
                    <span className="field-desc">Response timestamp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="api-info-grid">
            <div className="api-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h4>Authentication</h4>
              <p>Currently no authentication required for demo. Production endpoints will use API keys.</p>
            </div>

            <div className="api-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h4>Rate Limits</h4>
              <p>100 requests per hour per IP address. Production plans offer higher limits.</p>
            </div>

            <div className="api-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h4>Real-time</h4>
              <p>Average response time under 2 seconds. WebSocket support available for real-time chat.</p>
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
                <h2 className="section-title">Try the Verification System</h2>
                <p className="prototype-description">
                  Experience our QR code verification system firsthand. Test the scanning and authentication process with sample codes.
                </p>
              </div>
            </div>

            <div className="prototype-actions">
              <a href="https://pharmachecklite.netlify.app" target='_blank' className="btn btn-hero btn-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Launch Prototype
              </a>
              <a href="https://github.com/beharus/pharmacheck-backend" target='_blank' className="btn btn-outline btn-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Github Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;