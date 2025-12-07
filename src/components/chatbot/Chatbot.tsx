import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Bot, User } from "lucide-react";

const API_URL = "https://ai-chat-bot-oig5.onrender.com/api/chat/";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const animatedTexts = [
  "PharmaAI Assistant",
  "Chat with AI",
  "Ask Any Questions",
  "Medicine Expert",
  "24/7 Available",
];

const quickQuestions = [
  "How do I check if my pills are fake or real?",
  "What are the side effects of this medication?",
  "Can I take this medicine with food?",
  "What's the proper dosage for adults?",
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your PharmaCheck assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animated text rotation
  useEffect(() => {
    if (isOpen) return; // Don't animate when chat is open

    const textInterval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setShowText(true);
      }, 300);
    }, 3000);

    return () => clearInterval(textInterval);
  }, [isOpen]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Send message to API
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          result.response ||
          result.message ||
          "I apologize, I couldn't process that. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <Bot className="chatbot-avatar-icon" />
              </div>
              <div>
                <h3 className="chatbot-title">PharmaAI Assistant</h3>
                <p className="chatbot-status">
                  <span className="status-dot"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close-btn"
              aria-label="Close chat"
            >
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "message-user" : "message-bot"
                }`}
              >
                <div className="message-avatar">
                  {message.sender === "bot" ? (
                    <Bot className="avatar-icon" />
                  ) : (
                    <User className="avatar-icon" />
                  )}
                </div>
                <div className="message-content">
                  <p className="message-text">{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message message-bot">
                <div className="message-avatar">
                  <Bot className="avatar-icon" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Questions - Show only when it's the welcome message */}
            {messages.length === 1 && messages[0].id === "welcome" && !isLoading && (
              <div className="quick-questions">
                <p className="quick-questions-title">Quick Questions:</p>
                <div className="quick-questions-grid">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="quick-question-btn"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-form">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={!inputValue.trim() || isLoading}
              className="chatbot-send-btn"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="send-icon spinning" />
              ) : (
                <Send className="send-icon" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Animated Text Label */}
      {!isOpen && (
        <div className={`chatbot-label ${showText ? "show" : "hide"}`}>
          {animatedTexts[currentTextIndex]}
        </div>
      )}

      {/* Chat Button with Bot Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle-btn"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="toggle-icon" />
        ) : (
          <Bot className="chatbot-avatar-icon" />
        )}
        {!isOpen && <span className="notification-badge">AI</span>}
      </button>

      <style>{`
        /* Chatbot Widget Styles */
        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 400px;
          max-width: calc(100vw - 48px);
          height: 600px;
          max-height: calc(100vh - 150px);
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          animation: slideInUp 0.3s ease-out;
        }

        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
          color: white;
          border-radius: 1rem 1rem 0 0;
        }

        .chatbot-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chatbot-avatar {
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .chatbot-avatar-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .chatbot-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .chatbot-status {
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          opacity: 0.9;
          margin: 0;
        }

        .status-dot {
          width: 0.5rem;
          height: 0.5rem;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .chatbot-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }

        .chatbot-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--background);
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 3px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: var(--muted-foreground);
        }

        .message {
          display: flex;
          gap: 0.75rem;
          animation: fadeInUp 0.3s ease-out;
        }

        .message-user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-bot .message-avatar {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
          color: white;
        }

        .message-user .message-avatar {
          background: var(--secondary);
          color: var(--secondary-foreground);
        }

        .avatar-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .message-content {
          max-width: 75%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .message-text {
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        .message-bot .message-text {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem 1rem 1rem 0.25rem;
          color: var(--foreground);
        }

        .message-user .message-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
          color: white;
          border-radius: 1rem 1rem 0.25rem 1rem;
        }

        .message-time {
          font-size: 0.7rem;
          color: var(--muted-foreground);
          padding: 0 0.5rem;
        }

        .message-user .message-time {
          text-align: right;
        }

        .typing-indicator {
          display: flex;
          gap: 0.25rem;
          padding: 0.75rem 1rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem 1rem 1rem 0.25rem;
        }

        .typing-indicator span {
          width: 0.5rem;
          height: 0.5rem;
          background: var(--muted-foreground);
          border-radius: 50%;
          animation: typing 1.4s ease-in-out infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .chatbot-input-form {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border);
          background: var(--card);
          border-radius: 0 0 1rem 1rem;
        }

        .chatbot-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          background: var(--background);
          color: var(--foreground);
          outline: none;
          transition: all 0.2s;
        }

        .chatbot-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(24, 144, 139, 0.1);
        }

        .chatbot-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chatbot-send-btn {
          width: 2.75rem;
          height: 2.75rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
          border: none;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }

        .chatbot-send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 144, 139, 0.3);
        }

        .chatbot-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .send-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Quick Questions Styles */
        .quick-questions {
          margin-top: 1rem;
          animation: fadeInUp 0.5s ease-out;
        }

        .quick-questions-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--muted-foreground);
          margin: 0 0 0.75rem 0;
        }

        .quick-questions-grid {
          display: grid;
          gap: 0.5rem;
        }

        .quick-question-btn {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.875rem;
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
        }

        .quick-question-btn:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(24, 144, 139, 0.2);
        }

        .quick-question-btn:active {
          transform: translateX(2px);
        }

        /* Animated Text Label */
        .chatbot-label {
          position: fixed;
          bottom: 34px;
          right: 105px;
          background: white;
          color: var(--primary);
          padding: 0.75rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
          z-index: 999;
          border: 2px solid var(--primary);
          transition: all 0.3s ease;
        }

        .chatbot-label.show {
          animation: fadeSlideIn 0.5s ease-out;
          opacity: 1;
          transform: translateX(0);
        }

        .chatbot-label.hide {
          animation: fadeSlideOut 0.3s ease-out;
          opacity: 0;
          transform: translateX(10px);
        }

        .chatbot-label::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid var(--primary);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }

        /* Chat Button with Bot Head */
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(24, 144, 139, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          color: white;
        }

        .chatbot-toggle-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(24, 144, 139, 0.5);
        }

        .chatbot-toggle-btn:active {
          transform: scale(0.95);
        }

        .toggle-icon {
          width: 1.75rem;
          height: 1.75rem;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 1.75rem;
          height: 1.75rem;
          padding: 0 0.4rem;
          background: var(--accent);
          color: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeSlideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(10px);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .chatbot-window {
            bottom: 90px;
            right: 16px;
            width: calc(100vw - 32px);
            height: calc(100vh - 120px);
          }

          .chatbot-toggle-btn {
            bottom: 16px;
            right: 16px;
            width: 56px;
            height: 56px;
          }

          .chatbot-label {
            bottom: 28px;
            right: 80px;
            font-size: 0.8rem;
            padding: 0.6rem 1rem;
          }

          .message-content {
            max-width: 85%;
          }

          .quick-question-btn {
            font-size: 0.8rem;
            padding: 0.65rem 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;