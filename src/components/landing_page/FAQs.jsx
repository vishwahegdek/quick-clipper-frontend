import React from 'react';
import './FAQs.css';

const FAQs = () => {
  return (
    <section className="faqs" id="faqs">
      <h3>FAQs</h3>
      <p>Got questions? We've got answers.</p>
      <div className="faq-items">
        <div className="faq">
          <h4>What types of videos can I summarize?</h4>
          <p>Our platform supports all types of YouTube videos, including lectures, interviews, and more.</p>
        </div>
        <div className="faq">
          <h4>How accurate are the AI-generated answers?</h4>
          <p>Our AI is trained on a diverse set of videos and provides accurate answers with high confidence.</p>
        </div>
        <div className="faq">
          <h4>Can I ask questions about any part of the video?</h4>
          <p>Yes, you can ask questions about any part of the video and our AI will provide the relevant information.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
