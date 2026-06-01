// const chatForm = document.getElementById('chat-form');
// const userInput = document.getElementById('user-input');
// const chatMessages = document.getElementById('chat-messages');

// // Function to add a message to the chat
// function addMessage(message, isUser = false) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
//     const messageContent = document.createElement('div');
//     messageContent.className = 'message-content';
//      messageContent.textContent = message;
//     // messageContent.innerHTML = message;

    
//     messageDiv.appendChild(messageContent);
//     chatMessages.appendChild(messageDiv);
    
//     // Scroll to the bottom
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// // Handle form submission
// chatForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const message = userInput.value.trim();
//     if (!message) return;
    
//     // Add user message to chat
//     addMessage(message, true);
    
//     // Clear input
//     userInput.value = '';
    
//     try {
//         // Send message to server
//         const response = await fetch('/gemini', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ prompt: message }),
//         });
        
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         const botResponse = await response.text();
        
//         // Add bot response to chat
//         addMessage(botResponse);
//     } catch (error) {
//         console.error('Error:', error);
//         addMessage('Sorry, I encountered an error. Please try again.', false);
//     }
// }); 

// public/client.js
// const chatForm = document.getElementById("chat-form");
// const userInput = document.getElementById("user-input");
// const chatMessages = document.getElementById("chat-messages");

// function addMessage(message, isUser = false) {
//   const messageDiv = document.createElement("div");
//   messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

//   const messageContent = document.createElement("div");
//   messageContent.className = "message-content";

//   if (isUser) {
//     messageContent.textContent = message;
//   } else {
//     messageContent.innerHTML = message;
//   }

//   messageDiv.appendChild(messageContent);
//   chatMessages.appendChild(messageDiv);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const message = userInput.value.trim();
//   if (!message) return;

//   addMessage(message, true);
//   userInput.value = "";

//   try {
//     const response = await fetch("/gemini", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt: message }),
//     });

//     const data = await response.json();
//     addMessage(data.message);
//   } catch (error) {
//     console.error("Error:", error);
//     addMessage("❌ Sorry, an error occurred while getting response.");
//   }
// });

//new
// const chatForm = document.getElementById('chat-form');
// const userInput = document.getElementById('user-input');
// const chatMessages = document.getElementById('chat-messages');

// function addMessage(message, isUser = false, isHTML = false) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
//     const messageContent = document.createElement('div');
//     messageContent.className = 'message-content';

//     if (isHTML) {
//         messageContent.innerHTML = message;  // Inject HTML response
//     } else {
//         messageContent.textContent = message;
//     }

//     messageDiv.appendChild(messageContent);
//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// chatForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const message = userInput.value.trim();
//     if (!message) return;

//     addMessage(message, true);
//     userInput.value = '';

//     try {
//         const response = await fetch('/gemini', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ prompt: message }),
//         });

//         const botResponse = await response.text();
//         addMessage(botResponse, false, true);
//     } catch (error) {
//         console.error('Error:', error);
//         addMessage('❌ Sorry, something went wrong!', false);
//     }
// });

// document.getElementById("sendBtn").addEventListener("click", async () => {
//     const userInput = document.getElementById("userInput").value.trim();
//     if (!userInput) return;

//     appendMessage("user", userInput);
//     document.getElementById("userInput").value = "";

//     try {
//         const response = await fetch("/gemini", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ prompt: userInput }),
//         });

//         const text = await response.text();
//         appendMessage("bot", formatResponse(text));
//     } catch (error) {
//         appendMessage("bot", "❌ Error fetching response.");
//     }
// });

// function appendMessage(sender, text) {
//     const chatBox = document.getElementById("chatBox");
//     const messageDiv = document.createElement("div");
//     messageDiv.className = sender === "user" ? "userMsg" : "botMsg";
//     messageDiv.innerHTML = text;
//     chatBox.appendChild(messageDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }

// function formatResponse(text) {
//     // Basic formatting: line breaks and bullets
//     let formatted = text
//         .replace(/•/g, "<li>")                             // Bullet points
//         .replace(/\n/g, "<br>")                             // Line breaks
//         .replace(/(?:<br>)+/g, "<br>")                      // Cleanup extra <br>
//         .replace(/(\*\*)(.*?)\1/g, "<b>$2</b>")             // Bold **text**
//         .replace(/(\*)(.*?)\1/g, "<i>$2</i>");              // Italic *text*

//     // Wrap list items with <ul> if there are any
//     if (formatted.includes("<li>")) {
//         formatted = formatted.replace(/(<li>.*?)(?=<br>|$)/g, "$1</li>");
//         formatted = "<ul>" + formatted + "</ul>";
//     }

//     return formatted;
// }



// document.getElementById("sendBtn").addEventListener("click", async () => {
//     const userInput = document.getElementById("userInput").value.trim();
//     if (!userInput) return;

//     appendMessage("user", userInput);
//     document.getElementById("userInput").value = "";

//     const loadingMsg = appendMessage("bot", "<i>HealthBot is typing...</i>", true);

//     try {
//         const response = await fetch("/gemini", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ prompt: userInput }),
//         });

//         const text = await response.text();
//         loadingMsg.remove(); // remove typing...
//         appendMessage("bot", formatResponse(text));
//     } catch (error) {
//         loadingMsg.remove();
//         appendMessage("bot", "❌ Error fetching response.");
//     }
// });

// function appendMessage(sender, text, isTemporary = false) {
//     const chatBox = document.getElementById("chatBox");
//     const messageDiv = document.createElement("div");
//     messageDiv.className = sender === "user" ? "userMsg" : "botMsg";
//     messageDiv.innerHTML = text;
//     chatBox.appendChild(messageDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
//     return messageDiv;
// }

// function formatResponse(text) {
//     // Convert markdown-style formatting to HTML
//     let formatted = text
//         .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")   // Bold
//         .replace(/\*(.*?)\*/g, "<em>$1</em>")               // Italic
//         .replace(/\n/g, "<br>")                             // Line breaks
//         .replace(/(?:<br>){2,}/g, "<br><br>");              // Remove extra breaks

//     // Handle bullet points: multiple <ul> if needed
//     formatted = formatted.replace(/(?:<br>)?• (.*?)(?=<br>|$)/g, "<li>$1</li>");

//     // Wrap each <li> group with <ul>
//     formatted = formatted.replace(/(<li>.*?<\/li>)+/gs, match => `<ul>${match}</ul>`);

//     return formatted;
// }



document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";

    const loadingMsg = appendMessage("bot", "<i>HealthBot is typing...</i>", true);

    try {
        const response = await fetch("/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userInput }),
        });

        const text = await response.text();
        loadingMsg.remove();

        const formattedText = formatResponse(text);
        appendMessage("bot", formattedText);

        // Speak the plain text version (without HTML tags)
        speakText(stripHTMLTags(text));

    } catch (error) {
        loadingMsg.remove();
        appendMessage("bot", "❌ Error fetching response.");
    }
});

function appendMessage(sender, text, isTemporary = false) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "userMsg" : "botMsg";
    messageDiv.innerHTML = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

function formatResponse(text) {
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")   // Bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>")               // Italic
        .replace(/\n/g, "<br>")                             // Line breaks
        .replace(/(?:<br>){2,}/g, "<br><br>");

    formatted = formatted.replace(/(?:<br>)?• (.*?)(?=<br>|$)/g, "<li>$1</li>");
    formatted = formatted.replace(/(<li>.*?<\/li>)+/gs, match => `<ul>${match}</ul>`);

    return formatted;
}

function stripHTMLTags(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}

function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    synth.cancel(); // Stop any existing speech
    synth.speak(utterance);
}

let currentUtterance = null;

function speakText(text, lang = 'en-IN') {
    window.speechSynthesis.cancel();  // Stop any ongoing speech

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = lang;

    window.speechSynthesis.speak(currentUtterance);
}


  