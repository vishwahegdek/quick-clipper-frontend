import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <h3>How It Works</h3>
      <p>Our platform uses state-of-the-art AI to summarize YouTube and downloaded videos and provide accurate answers to your questions.</p>
      <div className="steps">
        <div className="step">
          <h4>Upload Video</h4>
          <p>Simply upload a video or paste a YouTube link.</p>
        </div>
        <div className="step">
          <h4>Get Summarized video</h4>
          <p>Get summarized video with key insights and highlights.</p>
        </div>
        <div className="step">
          <h4>Ask questions and Get Answers</h4>
          <p>Our AI is trained on a diverse set of videos and provides accurate answers with high confidence.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
