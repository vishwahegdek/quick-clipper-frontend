
import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import axios from 'axios';
import logo from '../../assets/new-logo.svg'

let url = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_API_URL); // Logs the API URL

function Header() {
    return (
        <header className="chatbot-header">
            <div className="chatbot-logo-container">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="chatbot-logo"
                />
                <h1 className="chatbot-title">Quick Clipper</h1>
            </div>
        </header>
    );
}

// Video Section with YouTube-like Format
const VideoSection = () => {
  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    aspectRatio: '16/9',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Watch the Talk</h2>
      <div style={videoContainerStyle}>
        <video
          controls
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        >
          {/* Replace this with the dynamic URL provided by your backend */}
          <source src={url + "media/cropped.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const SummarySection = ({ summary, setSummary }) => {
  const [youtubeLink, setYouTubeLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("media/videos/video.mp4");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeSummary, setTimeSummary] = useState("");

  useEffect(() => {
    const storedLink = localStorage.getItem("youtubeLink");
    console.log(storedLink);
    if (storedLink) {
      setYouTubeLink(storedLink);
      callApi(storedLink); // Call the API with the link
    }
  }, []);

  const callApi = async (link) => {
    setLoading(true); // Show loading spinner or message
    setError(""); // Clear previous errors

    try {
      console.log(url + "api/submit-link");
      const response = await axios.post(url + "api/submit-link", {
        video_link: link, // Payload for the API
      });

      // Extract data from response
      setSummary(response.data.summary);
      setTimeSummary(response.data["time-summary"]);

      console.log(
        "**************************************************************************************************",
        response.data["time-summary"]
      );
      // Make another API call using time-summary
      const videoResponse = await axios.post(url + "api/generate_video", {
        "time-summary": response.data["time-summary"], // Pass the time-summary
      });
      // Extract video URL
      setVideoUrl(videoResponse.data["video-url"]);
    } catch (err) {
      console.error("API call failed:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="summary-section">
      <h1 className="summary-title">Summary</h1>
      {summary ? (
        <p className="summary-text">{summary}</p>
      ) : (
        <p className="summary-loading">Loading summary...</p>
      )}
    </div>
  );
};

const ChatBotSection = ({ summary }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      user: "You",
      message: "What are the key points of the talk?",
      senderImg: "https://dashboard.codeparrot.ai/api/assets/Z0liNINVQVcR8-QK",
    },
    {
      user: "Core-Clip Query",
      message:
        "Dr. Marie Curie emphasizes the importance of proactive policies to mitigate job displacement and create new avenues for meaningful work. She underscores the role of reskilling programs, the potential for AI to enhance human creativity and problem-solving, and the ethical implications of automation. Dr. Curie also highlights the need for collaboration among government, industry, and civil society to shape a future where AI serves the common good.",
      senderImg: "https://dashboard.codeparrot.ai/api/assets/Z0liNINVQVcR8-QL",
    },
    {
      user: "You",
      message: "What are the implications of AI on the labor market?",
      senderImg: "https://dashboard.codeparrot.ai/api/assets/Z0liNYNVQVcR8-QM",
    },
    {
      user: "Core-Clip Query",
      message:
        "AI presents both challenges and opportunities for the labor market. Automation may lead to job displacement, particularly for routine tasks that can be easily performed by AI systems. However, AI can also create new job categories and enhance human productivity in complex problem-solving and creative tasks. The implications of AI on the labor market depend on various factors such as the pace of technological advancement, workforce reskilling efforts, and ethical considerations around AI deployment.",
      senderImg: "https://dashboard.codeparrot.ai/api/assets/Z0liNYNVQVcR8-QN",
    },
  ]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendClick = async () => {
    if (userInput.trim() === "") return;

    const newMessage = {
      user: "You",
      message: userInput,
      senderImg: "https://dashboard.codeparrot.ai/api/assets/Z0liNINVQVcR8-QK",
    };

    setMessages([...messages, newMessage]);
    setUserInput("");

    try {
      console.log("This is summary", summary);
      const response = await axios.post(url + "api/chatbot/", {
        summary: summary,
        context: messages.map((msg) => `User: ${msg.message}\n`).join(""),
        question: userInput,
      });

      const botMessage = {
        user: "Core-Clip Query",
        message: response.data.response,
        senderImg:
          "https://dashboard.codeparrot.ai/api/assets/Z0liNINVQVcR8-QL",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Error communicating with chatbot API:", err);
      const errorMessage = {
        user: "Core-Clip Query",
        message: "An error occurred. Please try again later.",
        senderImg:
          "https://dashboard.codeparrot.ai/api/assets/Z0liNINVQVcR8-QL",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chatbot-chatbot-section">
      <h2>Chat Bot</h2>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chatbot-message">
            <img src={msg.senderImg} alt={msg.user} width="40" height="40" />
            <div className="chatbot-message-content">
              <strong>{msg.user}</strong>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chatbot-chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};


function Chatbot() {
  const [summary, setSummary] = useState("");

  return (
    <div className="chatbot">
      <Header />
      <div className="chatbot-main-content">
        <div className="chatbot-left-section">
          <VideoSection />
          <SummarySection summary={summary} setSummary={setSummary} />
        </div>
        <div className="chatbot-right-section">
          <ChatBotSection summary={summary} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
