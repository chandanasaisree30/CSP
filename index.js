// import { GoogleGenAI } from "@google/genai";
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBJzeSO2s2XgSlB7EssNy73HF4gHKNiGWk" });

// app.post("/gemini", async (req, res) => {
//     const prompt = req.body.prompt;
//     const response = await main(prompt);
//     res.send(response);
// //     function formatResponse(text) {
// //     // Format bullets and paragraphs
// //     return text
// //         .split('\n')
// //         .filter(line => line.trim())
// //         .map(line => {
// //             if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
// //                 return `<li>${line.replace(/^[-•]\s*/, '')}</li>`;
// //             } else {
// //                 return `<p>${line}</p>`;
// //             }
// //         })
// //         .join('');
// // }

// app.post("/gemini", async (req, res) => {
//     const prompt = req.body.prompt;
//     const rawResponse = await main(prompt);
//     const formatted = formatResponse(rawResponse);
//     res.send({ message: `<ul>${formatted}</ul>` });
// });

// });

// async function main(prompt) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//     });
//     return response.text;
// }

// app.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });

// server.js
// import { GoogleGenAI } from "@google/genai";
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyBJzeSO2s2XgSlB7EssNy73HF4gHKNiGWk", // Your actual API key
// });

// async function main(prompt) {
//   const result = await ai.generateContent({
//     model: "gemini-1.5-flash",
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//   });

//   return result.response.text();
// }

// function formatResponse(text) {
//   const lines = text.split("\n").filter(line => line.trim() !== "");
//   let formatted = "";

//   for (let line of lines) {
//     if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
//       formatted += `<li>${line.replace(/^[-•]\s*/, "")}</li>`;
//     } else {
//       formatted += `<p>${line}</p>`;
//     }
//   }

//   // Wrap bullet points in <ul> if they exist
//   if (formatted.includes("<li>")) {
//     formatted = formatted.replace(/(<li>.*?<\/li>)/gs, "<ul>$1</ul>");
//   }

//   return formatted;
// }

// app.post("/gemini", async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
//     const rawText = await main(prompt);
//     const formattedText = formatResponse(rawText);
//     res.json({ message: formattedText });
//   } catch (error) {
//     console.error("Gemini Error:", error.message);
//     res.status(500).json({ message: "❌ Sorry, something went wrong!" });
//   }
// });

// app.listen(3000, () => {
//   console.log("✅ Server is running at http://localhost:3000");
// });

//new
// import { GoogleGenAI } from "@google/genai";
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBJzeSO2s2XgSlB7EssNy73HF4gHKNiGWk" });

// function formatResponse(text) {
//     const lines = text.split('\n');
//     let html = '';
//     let inList = false;

//     lines.forEach(line => {
//         line = line.trim();
//         if (line.startsWith('-') || line.startsWith('•')) {
//             if (!inList) {
//                 html += '<ul>';
//                 inList = true;
//             }
//             html += `<li>${line.replace(/^[-•]\s*/, '')}</li>`;
//         } else {
//             if (inList) {
//                 html += '</ul>';
//                 inList = false;
//             }
//             if (line !== '') html += `<p>${line}</p>`;
//         }
//     });

//     if (inList) html += '</ul>';

//     return html;
// }

// app.post("/gemini", async (req, res) => {
//     try {
//         const prompt = req.body.prompt;
//         const result = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: prompt,
//         });
//         const responseText = result.response.text();
//         const formatted = formatResponse(responseText);
//         res.send(formatted);
//     } catch (err) {
//         console.error("❌ Gemini API error:", err.message);
//         res.status(500).send("<p>❌ Sorry, something went wrong!</p>");
//     }
// });

// app.listen(3000, () => {
//     console.log("✅ Server is running on http://localhost:3000");
// });

import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ai = new GoogleGenAI({
    apiKey: "AIzaSyCft7Boh5aL-i1_xQuV1F4SRqrYzb2Oo0k" // replace with your actual key
});

app.post("/gemini", async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await main(prompt);
        res.send(response);
    } catch (err) {
        console.error("❌ Gemini API error:", err.message);
        res.status(500).send("❌ Sorry, something went wrong!");
    }
});

async function main(prompt) {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text =
            result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            return text;
        } else {
            console.error("⚠️ Unexpected response format:", JSON.stringify(result, null, 2));
            return "❌ Sorry, I couldn't understand the response from the AI.";
        }
    } catch (error) {
        console.error("❌ Gemini API error:", error.message);
        return "❌ Sorry, something went wrong!";
    }
}

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});
