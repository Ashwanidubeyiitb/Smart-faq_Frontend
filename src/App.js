// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import "./App.css";

// function App() {
//   const [chatOpen, setChatOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isListening, setIsListening] = useState(false);

//   const defaultQuestions = [
//     "What is the process for admission into Saras AI Institute?",
//     "What is the curriculum like at Saras AI Institute?",
//     "Does Saras AI Institute offer scholarships?",
//     "How is the program structured?",
//     "Is Saras AI Institute accredited?",
//   ];

//   // Web Speech API for voice input
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = false;

//   const handleOpenChat = () => {
//     setChatOpen(true);
//   };

//   const handleCloseChat = () => {
//     setChatOpen(false);
//   };

//   const handleSendMessage = async () => {
//     if (query.trim() === "") return;

//     // Add the user message to the chat
//     const newMessages = [...messages, { sender: "user", text: query }];
//     setMessages(newMessages);

//     // Clear the input field
//     setQuery("");

//     try {
//       // Send the query to the backend API
//       const response = await axios.post("<YOUR_NGROK_URL>/search", { query });

//       // Add the API response to the chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "system", text: response.data.answer || "No matching FAQ found." },
//       ]);
//     } catch (error) {
//       // Handle any errors during the request
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "system", text: "An error occurred. Please try again." },
//       ]);
//     }
//   };

//   // Handle microphone input
//   const handleMicClick = () => {
//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   useEffect(() => {
//     recognition.onresult = (event) => {
//       const speechToText = event.results[event.resultIndex][0].transcript;
//       setQuery(speechToText);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   }, []);

//   // Particles setup
//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const particlesOptions = {
//     background: {
//       color: {
//         value: "#000000", // Dark background for particles
//       },
//     },
//     fpsLimit: 60,
//     particles: {
//       color: {
//         value: "#ffffff",
//       },
//       links: {
//         color: "#ffffff",
//         distance: 150,
//         enable: true,
//         opacity: 0.5,
//         width: 1,
//       },
//       collisions: {
//         enable: true,
//       },
//       move: {
//         direction: "none",
//         enable: true,
//         outMode: "bounce",
//         speed: 2,
//       },
//       number: {
//         value: 50,
//       },
//       opacity: {
//         value: 0.5,
//       },
//       shape: {
//         type: "circle",
//       },
//       size: {
//         random: true,
//         value: 3,
//       },
//     },
//     detectRetina: true,
//   };

//   return (
//     <div className="App">
//       {!chatOpen && (
//         <div className="landing-page">
//           {/* Add particle effect */}
//           <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
//           <div className="content">
//             <h1><span className="orange-text">SARAS</span></h1>
//             <p className="bold-text">
//               AI Education Reimagined:<br />
//               Shape your future with <span className="orange-text">SARAS</span><br />
//               World’s first AI-only, US-based, 100% online higher education institute
//             </p>
//           </div>
//           {/* Ask a Question Bar */}
//           <div className="ask-bar" onClick={handleOpenChat}>
//             <img src="https://img.icons8.com/ios-glyphs/30/ffffff/chat.png" alt="Ask Icon" />
//             <span>Ask a Question</span>
//           </div>
//         </div>
//       )}

//       {/* Chat Interface */}
//       {chatOpen && (
//         <div className="chat-interface">
//           <div className="chat-header">
//             <h2>Ask Saras AI</h2>
//             <button onClick={handleCloseChat}>X</button>
//           </div>
//           <div className="chat-body">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${msg.sender === "user" ? "user-message" : "system-message"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="default-questions">
//             <h4>Or, try asking:</h4>
//             {defaultQuestions.map((question, index) => (
//               <button key={index} onClick={() => setQuery(question)}>
//                 {question}
//               </button>
//             ))}
//           </div>

//           <div className="chat-footer">
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Ask a question..."
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button onClick={handleSendMessage}>
//               <img src="https://img.icons8.com/ios-glyphs/30/ffffff/send.png" alt="Send" />
//             </button>
//             <button onClick={handleMicClick}>
//               <img src="https://img.icons8.com/ios-glyphs/30/ffffff/microphone.png" alt="Mic" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import ChatPage from "./ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
