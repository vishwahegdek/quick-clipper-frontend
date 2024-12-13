// import React from 'react';
// import './MainContent.css';

// const MainContent = () => {
//   return (
//     <main className="main-content">
//       <div className="hero">
//         <h2>Summarize YouTube videos instantly.</h2>
//         <p>“Watch less, learn more”. Upload a YouTube link or a downloaded video file. Ask questions about the video and get answers from the AI.</p>
//         <div className="action-buttons">
//           <button className="choose-file">Choose File</button>
//           <button className="upload">Upload</button>
//         </div>
//         <div className="input-section">
//           <input type="text" placeholder="Paste your YouTube link" />
//           <button className="summarize">Summarize</button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default MainContent;
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainContent.css';

const MainContent = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState('');


  const handleSummarizeClick = () => {
    if (link.trim() === '') {
      alert('Please enter a valid YouTube link');
      return;
    }
    console.log(link)
    localStorage.setItem('youtubeLink', link); // Save the link in localStorage
    navigate('/chatbot'); // Navigate to the Chatbot page
  };

  return (
    <main className="main-content">
      <div className="hero">
        <h2>Summarize YouTube videos instantly.</h2>
        <p>
          “Watch less, learn more”. Upload a YouTube link or a downloaded video file. Ask
          questions about the video and get answers from the AI.
        </p>
        <div className="action-buttons">
          <button className="choose-file">Choose File</button>
          <button className="upload">Upload</button>
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Paste your YouTube link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button className="summarize" onClick={handleSummarizeClick}>
            Summarize
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;