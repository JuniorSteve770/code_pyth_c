import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

const questions = [
    { question: "Quelle option a un Delta proche de 1 ?", options: ["Call ITM", "Call OTM", "Put ATM", "Put OTM"], answer: "Call ITM", explanation: "Delta proche de 1 pour ITM" },
    { question: "Le Gamma est le plus élevé lorsque l’option est :", options: ["ITM", "ATM", "OTM", "Indépendant de la moneyness"], answer: "ATM", explanation: "Gamma max pour ATM" },
    { question: "Une option avec un Theta très négatif est :", options: ["Un Call ITM", "Un Put OTM", "Un Call ATM", "Une option qui expire dans 2 ans"], answer: "Un Call ATM", explanation: "Theta max pour ATM" },
    { question: "Si la volatilité implicite augmente, quelle option est la plus affectée ?", options: ["Call ITM", "Put ATM", "Call ATM", "Put ITM"], answer: "Call ATM", explanation: "Vega max pour ATM" },
    { question: "Une hausse des taux d’intérêt profite principalement :", options: ["Aux Calls ITM", "Aux Puts ITM", "Aux Calls ATM", "Aux Puts ATM"], answer: "Aux Calls ITM", explanation: "Rho positif pour Call" },
];

const Timer = ({ timeLeft }) => (
    <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
);

const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => (
    <div className="question-card">
        <h2>💡 {question}</h2>
        <Timer timeLeft={timeLeft} />
        <div className="options-container">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswerClick(option)}
                    className="option-button"
                >
                    {index + 1}. {option}
                </button>
            ))}
        </div>
    </div>
);

const Results = ({ score, total }) => (
    <div className="results">
        <h2>🎯 Score final : {score} / {total}</h2>
        {score > 3 ? (
            <p className="success">🚀 Excellent travail ! Vous maîtrisez bien les Grecs des options !</p>
        ) : (
            <p className="fail">📚 Révisez encore un peu pour bien comprendre les concepts !</p>
        )}
    </div>
);

const About = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [showResult, setShowResult] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    const handleAnswerClick = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
            setMessage("✅ Correct !");
        } else {
            setMessage(`❌ Incorrect ! La bonne réponse était : ${questions[currentQuestion].answer}\n ℹ️ Indice : ${questions[currentQuestion].explanation}`);
        }
        setTimeout(handleNextQuestion, 2000);
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(20);
            setMessage("");
        } else {
            setShowResult(true);
        }
    };

    return (
        <div className="qcm-container">
            {showResult ? (
                <Results score={score} total={questions.length} />
            ) : (
                <div>
                    <h1 className="title">💡 Bienvenue au QCM sur les Grecs des options !</h1>
                    <QuestionCard
                        question={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}
                        onAnswerClick={handleAnswerClick}
                        timeLeft={timeLeft}
                    />
                    {message && <p className="message">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default About;



