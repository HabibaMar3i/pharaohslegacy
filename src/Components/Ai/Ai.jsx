import './Ai.css';
import React, { useState } from 'react';
import axios from 'axios';
import AiLogo from '../../Assets/11zon_cropped.png';
import UserLogo from "../../Assets/2268603.png";

function Ai() {
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendToChatGPT = () => {
        let userMessage = { role: "user", content: inputValue };
        setChatHistory([...chatHistory, userMessage]);

        let body = {
            "model": "gpt-3.5-turbo-16k",
            "messages": [
                { 
                    "role": "system", 
                    "content": "Respond only to questions related to the history of Egypt or basic information about Egypt. If a question is not related to these topics, kindly respond with, \"I'm sorry, I can only answer questions related to the history of Egypt or basic information about Egypt.\""
                },
                { "role": "user", "content": inputValue }
            ],
            "temperature": 0.7,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        };
        let headers = {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        };
        axios
            .post("https://api.openai.com/v1/chat/completions", body, { headers: headers })
            .then((response) => {
                let aiReply = response.data.choices[0].message.content;
                let chatEntry = { user: inputValue, ai: aiReply };
                setChatHistory([...chatHistory, chatEntry]);
                setInputValue('');
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    };

    return (
        <section className="ai-section">
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="card ai-card">
                            <div className="card-header ai-card-header">
                                <h5>AI Assistant</h5>
                            </div>
                            <div className="card-body ai-card-body">
                                {chatHistory.map((entry, index) => (
                                    <div key={index}>
                                        <div className={`ai-message ai-message-user`}>
                                            <p className="ai-message-content ai-message-content-user">{entry.user}</p>
                                            <img src={UserLogo} alt="User avatar" className="ai-avatar" />
                                        </div>
                                        <div className={`ai-message ai-message-ai`}>
                                            <img src={AiLogo} alt="AI avatar" className="ai-avatar" />
                                            <p className="ai-message-content ai-message-content-ai">{entry.ai}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer ai-card-footer">
                                <div className="input-group ai-input-group">
                                    <input type="text" className="form-control" placeholder="Type message" aria-label="Recipient's username" aria-describedby="button-addon2" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                    <button className="btn" type="button" id="button-addon2" onClick={sendToChatGPT}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Ai;
