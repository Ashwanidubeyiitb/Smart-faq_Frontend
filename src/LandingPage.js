import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate("/chat");
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1><span className="orange-text">SARAS</span></h1>
        <p className="bold-text">
          AI Education Reimagined:<br />
          Shape your future with <span className="orange-text">SARAS</span><br />
          World’s first AI-only, US-based, 100% online higher education institute
        </p>
      </div>
      {/* Ask a Question Bar */}
      <div className="ask-bar" onClick={handleOpenChat}>
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/chat.png" alt="Ask Icon" />
        <span>Ask a Question</span>
      </div>
    </div>
  );
}

export default LandingPage;
