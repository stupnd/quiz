import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const categories = [
        { id: "Linux", name: "Linux" },
        { id: "DevOps", name: "DevOps" },
        { id: "Networking", name: "Networking" },
        { id: "Programming", name: "Programming" },
        { id: "Cloud", name: "Cloud" },
    ];
    const [selectedCategory, setSelectedCategory] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_KEY = "jD5W1ftZMvznAl8On3rw75ayyLyPOOHwfnBvyuE3"; // Replace with your QuizAPI.io API key

    const fetchQuestions = async (category) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://quizapi.io/api/v1/questions`, {
                params: {
                    apiKey: API_KEY,
                    limit: 5,
                    category: category,
                },
            });
            setQuestions(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching questions", error);
            setLoading(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        fetchQuestions(category);
    };

    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowResult(true);
        }
    };

    if (loading) return <p style={styles.loadingText}>Loading questions...</p>;

    return (
        <div style={styles.appContainer}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.headerText}>Quiz Platform</h1>
            </div>

            <div style={styles.mainContent}>
                {!selectedCategory ? (
                    <div style={styles.card}>
                        <h1 style={styles.title}>Select a Quiz Category</h1>
                        <div style={styles.categoryButtons}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    style={styles.button}
                                    onClick={() => handleCategorySelect(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : showResult ? (
                    <div style={styles.card}>
                        <h1 style={styles.title}>Quiz Complete!</h1>
                        <p style={styles.text}>Your Score: {score}/{questions.length}</p>
                    </div>
                ) : (
                    questions.length > 0 && questions[currentQuestionIndex] ? (
                        <div style={styles.card}>
                            <h1 style={styles.title}>{questions[currentQuestionIndex].question}</h1>
                            <div style={styles.answerButtons}>
                                {Object.entries(questions[currentQuestionIndex].answers)
                                    .filter(([key, value]) => value)
                                    .map(([key, value]) => (
                                        <button
                                            key={key}
                                            style={styles.answerButton}
                                            onClick={() =>
                                                handleAnswerClick(
                                                    questions[currentQuestionIndex].correct_answers[`${key}_correct`] === "true"
                                                )
                                            }
                                        >
                                            {value}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <p style={styles.text}>Loading question...</p>
                    )
                )}
            </div>
        </div>
    );
}

const styles = {
    appContainer: {
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#f3f0ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#6c5ce7',
        width: '100%',
        padding: '15px',
        textAlign: 'center',
        color: '#fff',
        borderRadius: '10px',
    },
    headerText: {
        fontSize: '24px',
        margin: 0,
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '22px',
        color: '#2d3436',
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        color: '#636e72',
    },
    categoryButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    button: {
        backgroundColor: '#6c5ce7',
        color: '#ffffff',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#341f97',
    },
    answerButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    answerButton: {
        backgroundColor: '#00cec9',
        color: '#ffffff',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    answerButtonHover: {
        backgroundColor: '#00b894',
    },
    loadingText: {
        fontSize: '18px',
        color: '#636e72',
    },
};

export default App;
