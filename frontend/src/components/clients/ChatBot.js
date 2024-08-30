// pages/index.js
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

export const FAQChatbot = ({ setOpen }) => {
  const [messages, setMessages] = useState([{ text: 'Hi, how may I help you?', isUser: false }]);
  const [userInput, setUserInput] = useState('');
  console.log(messages)

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      const newMessage = { text: userInput, isUser: true };
      console.log('executed', userInput);
      await setMessages([...messages, newMessage]);
      console.log('after execution', messages);

      processUserQuery(userInput);
      setUserInput('');
    }
  };

  const processUserQuery = async (query) => {
    // Implement logic to match user query to relevant FAQ response
    const response = await getFAQResponse(query);
    const newMessage = { text: response, isUser: false };
    setMessages((messages) => [...messages, newMessage]);
  };

  const getFAQResponse = async (query) => {
    const lowercaseQuery = query.toLowerCase();

    switch (true) {
      case lowercaseQuery.includes('return policy?'):
        return 'Our return policy is 30 days from the date of purchase. You can return any unused items for a full refund.';
      case lowercaseQuery.includes('where is your office?') || lowercaseQuery.includes('location'):
        return 'from austin station to zubin\'s family centre';
      case lowercaseQuery.includes('where is zubin foundation\'s office'):
        return 'from kwai fong mtr to the zubin foundation office (high fashion centre)';
      case lowercaseQuery.includes('email'):
        return 'info@zubinfoundation.org';
      case lowercaseQuery.includes('how are you funded?'):
        return 'initially the zubin foundation was funded entirely by the founders. now we are largely funded on a project basis by foundations and individual donors. we are also delighted that many children and their parents are choosing to donate to the zubin foundation on their birthday and on other special occasions through www.twopresents.com';
      case lowercaseQuery.includes('contact info') || lowercaseQuery.includes('phone'):
        return '+852 2540 9588 or email us on info@zubinfoundation.org';
      case lowercaseQuery.includes('forced marriage'):
        return 'If you are in need of help in forced marriage cases please contact us.\n\nEmail: info@zubinfoundation.org\n\nGeneral line: +852 2540-9588\n\nCall Mira (Helpline): +852 9682-3100';
      case lowercaseQuery.includes('crisis'):
        return 'Call Mira: Helpline for Women and Girls in Crisis\n\nStarted in May-June 2018, Call Mira is a first-of-its-kind helpline providing support to ethnic minority women and girls in Hong Kong in English, Urdu, and Hindi. More importantly, all information shared with Call Mira is kept in confidence.\n\nThe helpline operates Monday to Friday from 10:00 a.m. to 6:00 p.m. and on Saturday from 9:00 a.m. to 1:00 p.m.\n\n+852 2540-9588';
      case lowercaseQuery.includes('scholarship'):
        return 'To view more about our scholarship program, please visit our website at https://www.zubinfoundation.org/our-work/scholarships/';
      case lowercaseQuery.includes('capacity building'):
        return 'Our Online Training Academy is a platform providing free training for ethnic minority youth. The modules help hone specific work-related skills for those in university or in the early stages of building their career.\n\nTo join the Online Training Academy to receive free training, WhatsApp +852-9133-4700 or email oppbank@zubinfoundation.org';
      case lowercaseQuery.includes('volunteer opportunities'):
        return 'We welcome volunteers to help with various projects and events. Please visit our website or contact us at volunteer@zubinfoundation.org for more information.';
      case lowercaseQuery.includes('donation'):
        return 'You can make a donation to support our work through our website at https://www.zubinfoundation.org/donate/. Thank you for your generosity!';
      case lowercaseQuery.includes('events'):
        return 'For information about our upcoming events, please visit our events page at https://www.zubinfoundation.org/events/.';
      case lowercaseQuery.includes('partnerships'):
        return 'We are always looking to partner with like-minded organizations. Please contact us at partnerships@zubinfoundation.org to discuss potential collaborations.';
      case lowercaseQuery.includes('annual report'):
        return 'Our annual reports are available on our website at https://www.zubinfoundation.org/annual-reports/.';
      case lowercaseQuery.includes('media inquiries'):
        return 'For media inquiries, please contact our communications team at media@zubinfoundation.org.';
      default:
        // return 'I\'m sorry, I don\'t have an answer for that question. Please try rephrasing your question or check our FAQ page.';
        const backendResponse = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "query": query })
        });

        if (backendResponse.ok) {
          const data = await backendResponse.json(); // Parse the response to JSON
          return data.response;
        } else {
          return 'I\'m sorry, I don\'t have an answer for that question. Please try rephrasing your question or check our FAQ page.';
        }

    }
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>FAQ Chatbot</h1>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 1,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon color='primary' />
        </IconButton>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button type="submit">Send</button>
      </form>
      <style jsx>{`
        .chat-container {
          max-width: 350px;
          position: fixed;
          bottom: 10px;
          right: 10px;
          background-color: white;
          z-index: 1;
          box-shadow: 0px 0px 10px gray;
        }
        .chat-header {
          background-color:#4287f5 ;
          color: white;
          padding: 10px;
          text-align: center;
          margin-bottom: 10px;
        }
        .chat-messages {
          height: 300px;
          overflow-y: scroll;
          padding: 10px;
          font-size: 14px;
          
        }
        .user-message, .bot-message {
          margin-bottom: 17px;
          padding: 5px;
          border-radius: 10px;
        }
        .user-message {
          text-align: right;
        }
        .bot-message {
          text-align: left;
        }
        .chat-input {
          display: flex;
        }
        .chat-input input {
          flex-grow: 1;
          padding: 5px 10px;
          font-size: 16px;
          border-top: 1px solid black;
        }
        .chat-input button {
          background-color: #4287f5;
          color: white;
          border: none;
          padding: 5px 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};