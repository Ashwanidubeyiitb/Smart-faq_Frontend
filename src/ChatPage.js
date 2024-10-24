// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./ChatPage.css"; // Import the new CSS file
// import AskImage from "./ask.png"; // Import the image

// function ChatPage() {
//   const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isListening, setIsListening] = useState(false); // Track microphone state
//   const navigate = useNavigate();

//   const defaultQuestions = [
//     // "What is the process for admission into Saras AI Institute?",
//     // "What is the curriculum like at Saras AI Institute?",
//     // "Does Saras AI Institute offer scholarships?",
//     // "How is the program structured?",
//     // "Is Saras AI Institute accredited?",
//   ];

//   // Web Speech API for voice input
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = false;

//   const handleSendMessage = async () => {
//     if (query.trim() === "") return;

//     // Add the user message to the chat
//     const newMessages = [...messages, { sender: "user", text: query }];
//     setMessages(newMessages);

//     // Clear the input field
//     setQuery("");

//     try {
//       // Send the query to the backend API
//       // const response = await axios.post("http://127.0.0.1:8000/api/search", { query });
//       const response = await axios.post("http://127.0.0.1:8000/api/search/", { query });


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

//   return (
//     <div className="chat-interface">
//       {/* Professional Navbar */}
//       <div className="navbar">
//         <span>Saras AI Chat</span>
//         <button onClick={() => navigate("/")}>Exit Chat</button>
//       </div>

//       {/* Chat Body */}
//       <div className="chat-body">
//         {/* Ask Image */}
//         <img src={AskImage} alt="Ask Something" />

//         {messages.length === 0 ? (
//           <p></p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${msg.sender === "user" ? "user-message" : "system-message"}`}
//             >
//               {msg.text}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Default Questions */}
//       <div className="default-questions">
//         <h4>Or, try asking:</h4>
//         {defaultQuestions.map((question, index) => (
//           <button key={index} onClick={() => setQuery(question)}>
//             {question}
//           </button>
//         ))}
//       </div>

//       {/* Chat Footer */}
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask a question..."
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button onClick={handleSendMessage}>
//           <img src="https://img.icons8.com/ios-glyphs/30/ffffff/send.png" alt="Send" />
//         </button>

//         {/* Add mic-listening class if mic is active */}
//         <button className={isListening ? "mic-listening" : ""} onClick={handleMicClick}>
//           <img src="https://img.icons8.com/ios-glyphs/30/ffffff/microphone.png" alt="Mic" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;



import React, { useState, useEffect, useRef } from "react"; // Import useRef
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css"; // Import the new CSS file
import AskImage from "./ask.png"; // Import the image

function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false); // Track microphone state
  const chatEndRef = useRef(null); // Create a ref for scrolling
  const navigate = useNavigate();

  const defaultQuestions = [
        // "What is the process for admission into Saras AI Institute?",
        // "What is the curriculum like at Saras AI Institute?",
        // "Does Saras AI Institute offer scholarships?",
        // "How is the program structured?",
        // "Is Saras AI Institute accredited?",
      ];

  // Web Speech API for voice input
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;

  const handleSendMessage = async () => {
    if (query.trim() === "") return;

    // Add the user message to the chat
    const newMessages = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);

    // Clear the input field
    setQuery("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/search/", { query });
      // Add the API response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "system", text: response.data.answer || "No matching FAQ found." },
      ]);
    } catch (error) {
      // Handle any errors during the request
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "system", text: "An error occurred. Please try again." },
      ]);
    }
  };

  // Handle microphone input
  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const speechToText = event.results[event.resultIndex][0].transcript;
      setQuery(speechToText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Scroll to bottom when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-interface">
      <div className="navbar">
        <span>Saras AI Chat</span>
        <button onClick={() => navigate("/")}>Exit Chat</button>
      </div>

      <div className="chat-body">
        <img src={AskImage} alt="Ask Something" className="ask-image" />

        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "system-message"}`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={chatEndRef} /> {/* This is the scroll anchor */}
      </div>

      <div className="default-questions">
        {/* <h4>Or, try asking:</h4> */}
        {defaultQuestions.map((question, index) => (
          <button key={index} onClick={() => setQuery(question)}>
            {question}
          </button>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/send.png" alt="Send" />
        </button>
        <button className={isListening ? "mic-listening" : ""} onClick={handleMicClick}>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/microphone.png" alt="Mic" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
