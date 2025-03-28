const express = require("express");
const cors = require("cors");
const axios = require("axios");
const stringSimilarity = require("string-similarity");
const dotenv = require("dotenv")

const app = express();
app.use(cors({
    origin: ['https://hotel-management-2-03dr.onrender.com', 'http://localhost:3000', 'https://hotel-management-sepia-eight.vercel.app', 'https://port-wlyd.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());
dotenv.config({path: "./config/config.env"});

// ⬇ Your structured personal questions
const personalQA = [
    {
        questions: [
            "Who is Ashwin Jaiswal?",
            "Tell me about Ashwin Jaiswal",
            "What do you know about Ashwin Jaiswal?",
            "Can you introduce Ashwin Jaiswal?"
        ],
        answer: "Ashwin Jaiswal is a Computer Science and Engineering student at IIT Bhilai (Batch 2022-2026) with experience in research, software development, and competitive programming."
    },
    {
        questions: [
            "Where does Ashwin Jaiswal study?",
            "Which college is Ashwin Jaiswal from?",
            "Which institute is Ashwin Jaiswal studying at?"
        ],
        answer: "Ashwin Jaiswal is pursuing B.Tech in Computer Science and Engineering from the Indian Institute of Technology (IIT) Bhilai."
    },
    {
        questions: [
            "What projects has Ashwin Jaiswal worked on?",
            "List Ashwin Jaiswal's projects",
            "What are some of Ashwin Jaiswal's notable projects?"
        ],
        answer: "Ashwin has worked on projects like an E-card Sharing Platform, Hotel Manager, Blockchain-based Crowdfunding Platform, and a Real-Time Chat Application."
    },
    {
        questions: [
            "Has Ashwin Jaiswal participated in any competitions?",
            "Tell me about Ashwin's competition experience",
            "What competitions has Ashwin Jaiswal been part of?"
        ],
        answer: "Yes, Ashwin participated in Inter IIT Tech Meet 2024, working on 3D package packing optimization using Gurobi, Simulated Annealing, and achieved 76% efficiency."
    },
    {
        questions: [
            "What internships has Ashwin Jaiswal done?",
            "Did Ashwin Jaiswal do any internships?",
            "Tell me about Ashwin's internships"
        ],
        answer: "Ashwin is currently a Research Intern at TiH, IIT Bombay, working on laser bending strategies integrated with IoT, cloud applications, and ML models."
    },
    {
        questions: [
            "What technologies does Ashwin Jaiswal know?",
            "What programming languages and frameworks does Ashwin Jaiswal use?",
            "What tech stack does Ashwin Jaiswal use?"
        ],
        answer: "Ashwin is proficient in C/C++, Java, Python, JavaScript, TypeScript, React, NextJS, NodeJS, ExpressJS, Solidity, MongoDB, and MySQL."
    },
    {
        questions: [
            "What is Ashwin Jaiswal's LinkedIn?",
            "Where can I find Ashwin's LinkedIn profile?",
            "Share Ashwin Jaiswal's LinkedIn"
        ],
        answer: "You can find Ashwin's LinkedIn at https://linkedin.com/in/ashwin-jaiswal-0b22262b8"
    },
    {
        questions: [
            "Is Ashwin Jaiswal involved in any clubs or societies?",
            "Has Ashwin taken up any roles of responsibility?",
            "What positions has Ashwin Jaiswal held?"
        ],
        answer: "Yes, Ashwin has served as IUGC Representative at IIT Bhilai's Student Senate, Social Executive at NSS, Media Team Member at EBSB, and a Volunteer for the Student Mentorship Programme."
    },
        {
            questions: [
                "What is Ashwin Jaiswal's email?",
                "How to contact Ashwin Jaiswal via email?",
                "Share Ashwin Jaiswal's email address"
            ],
            answer: "You can contact Ashwin at ashwin.aj4545@gmail.com."
        },
        {
            questions: [
                "What is Ashwin Jaiswal's phone number?",
                "How to call Ashwin Jaiswal?",
                "Share Ashwin Jaiswal's contact number"
            ],
            answer: "Ashwin Jaiswal's phone number is +91 9125981226."
        },
        {
            questions: [
                "What is Ashwin Jaiswal's GitHub profile?",
                "Where can I find Ashwin's GitHub account?",
                "Share Ashwin Jaiswal's GitHub"
            ],
            answer: "You can find Ashwin's GitHub at https://github.com/Ashwin454."
        },
        {
            questions: [
                "What is Ashwin Jaiswal's LeetCode profile?",
                "Where can I find Ashwin's LeetCode account?",
                "Share Ashwin Jaiswal's LeetCode"
            ],
            answer: "You can find Ashwin's LeetCode profile at https://leetcode.com/u/Ashwin454/."
        },
        {
            questions: [
                "What is the E-card Sharing Platform project by Ashwin Jaiswal?",
                "Tell me about Ashwin's E-card Sharing Platform",
                "Explain Ashwin Jaiswal's online card-sharing project"
            ],
            answer: "Ashwin developed an E-card Sharing Platform for visiting cards using QR codes, supporting up to 100,000 users with advanced contact management, search, sorting, and dual QR functionalities."
        },
        {
            questions: [
                "What is the Hotel Manager project by Ashwin Jaiswal?",
                "Explain the hotel management system built by Ashwin Jaiswal",
                "Tell me about Ashwin Jaiswal's Hotel Manager project"
            ],
            answer: "Ashwin built a fully web-based Hotel Manager system that handles bookings, customer management, room allocations, and expenses. It reduces manual hotel management efforts by 90% and is used by 7 hotels in Prayagraj."
        },
        {
            questions: [
                "What is the Blockchain Crowdfunding Platform developed by Ashwin Jaiswal?",
                "Explain Ashwin's blockchain project",
                "Tell me about Ashwin Jaiswal's crowdfunding project"
            ],
            answer: "Ashwin created a blockchain-based crowdfunding platform enabling transparent, real-time fundraising with wallet connection and live campaign tracking for over 10,000 users."
        },
        {
            questions: [
                "What is Ashwin Jaiswal's Real-Time Chat Application project?",
                "Explain the real-time chat application made by Ashwin",
                "Tell me about Ashwin's chat app"
            ],
            answer: "Ashwin developed a real-time chat application supporting one-on-one and group chats, real-time updates with Socket.IO, and search functionality by name, email, or phone."
        },
        {
            questions: [
                "What tools does Ashwin Jaiswal use?",
                "Which development tools is Ashwin Jaiswal familiar with?",
                "What tools are part of Ashwin's toolkit?"
            ],
            answer: "Ashwin is skilled with Git, Docker, and Thirdweb for development and deployment."
        },
        {
            questions: [
                "What courses has Ashwin Jaiswal studied?",
                "What technical subjects does Ashwin Jaiswal know?",
                "What coursework has Ashwin completed?"
            ],
            answer: "Ashwin has studied Data Structures and Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS), and Blockchain."
        },
        {
            questions: [
                "What are the features of the E-card Sharing Platform by Ashwin Jaiswal?",
                "Describe the functionalities of Ashwin's E-card Sharing Platform",
                "How does Ashwin Jaiswal's E-card Sharing Platform work?"
            ],
            answer: "The platform includes QR-based card sharing, dual QR functionalities for request and instant connection modes, user-friendly templates, and advanced contact management with sorting and searching capabilities for 100,000+ users."
        },
        {
            questions: [
                "What technologies were used in the E-card Sharing Platform?",
                "What stack did Ashwin Jaiswal use for the E-card Sharing Platform?",
                "Which frameworks and tools were used in Ashwin's E-card Sharing Platform?"
            ],
            answer: "Ashwin used ReactJS, NodeJS, ExpressJS, and MongoDB to develop the E-card Sharing Platform."
        },
    
        // Hotel Manager Project - More Detailed
        {
            questions: [
                "What problem does the Hotel Manager project solve?",
                "What is the purpose of Ashwin's Hotel Manager project?",
                "How does Ashwin's Hotel Manager project help hotel management?"
            ],
            answer: "The Hotel Manager project automates customer booking, room allocation, expense tracking, and staff management, reducing manual hotel management work by 90%."
        },
        {
            questions: [
                "Which hotels use Ashwin Jaiswal's Hotel Manager system?",
                "Is Ashwin's Hotel Manager used in real life?",
                "Has the Hotel Manager system been deployed?"
            ],
            answer: "Yes, the Hotel Manager system is actively used by 7+ hotels in Prayagraj for daily operations."
        },
    
        // Blockchain Crowdfunding Platform - More Detailed
        {
            questions: [
                "What problem does the Blockchain Crowdfunding Platform address?",
                "Why did Ashwin create a Blockchain-based Crowdfunding Platform?",
                "What issues does Ashwin's blockchain project solve?"
            ],
            answer: "Ashwin's blockchain project solves transparency and trust issues in fundraising by enabling live campaign tracking and wallet integration, supporting 10,000+ users."
        },
        {
            questions: [
                "What technologies were used in the Blockchain Crowdfunding Platform?",
                "Which stack did Ashwin use for the blockchain project?",
                "What tools were used for Ashwin's Crowdfunding Platform?"
            ],
            answer: "Ashwin built this project using NextJS, Solidity, and ThirdWeb, ensuring secure and transparent transactions on blockchain."
        },
    
        // Real-Time Chat Application - More Detailed
        {
            questions: [
                "What features does the Real-Time Chat Application have?",
                "Explain Ashwin Jaiswal's chat application features",
                "What functionalities are included in Ashwin's chat app?"
            ],
            answer: "The chat application supports real-time messaging using Socket.IO, one-on-one and group chats, and allows users to search chats by name, email, or phone."
        },
        {
            questions: [
                "What technologies were used in the Real-Time Chat Application?",
                "Which stack powers Ashwin's chat application?",
                "What tools were used for Ashwin's Real-Time Chat Application?"
            ],
            answer: "Ashwin used ReactJS, NodeJS, ExpressJS, MongoDB, and Socket.IO for building the Real-Time Chat Application."
        }
    
];

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.inputs;

    let finalResponse = null; // We will store the response here

    // Check personal Q&A
    let bestMatch = { rating: 0, answer: null };
    personalQA.forEach(item => {
        const match = stringSimilarity.findBestMatch(userMessage, item.questions);
        if (match.bestMatch.rating > bestMatch.rating) {
            bestMatch = { rating: match.bestMatch.rating, answer: item.answer };
        }
    });

    if (bestMatch.rating > 0.7) {
        // If matched with personal questions
        finalResponse = {
            data: [
                { generated_text: bestMatch.answer }
            ],
            source: "personalQA"
        };
    } else {
        // Otherwise get response from HuggingFace
        try {
            console.log(process.env.HF_TOKEN);
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
                { inputs: userMessage },
                { headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` } }
            );
            // console.log(response);
            finalResponse = {
                data: [
                    { generated_text: response.data[0].generated_text }
                ],
                source: "huggingface"
            };
        } catch (error) {
            // console.error("Hugging Face Error: ", error);
            return res.status(500).send("Something went wrong!");
        }
    }

    // Here you can store finalResponse somewhere if you want
    // For example: saveChatToDB(userMessage, finalResponse)

    return res.json(finalResponse);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
