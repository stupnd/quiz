import React, { useState } from "react";
import axios from "axios";

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

    const API_KEY = "jD5W1ftZMvznAl8On3rw75ayyLyPOOHwfnBvyuE3";

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
            console.error("Error fetching questions:", error);
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

    const handleRedo = () => {
        setSelectedCategory("");
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
         
    };

    return (
        <div style={styles.appContainer}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Quiz App</h2>
                <ul style={styles.navLinks}>
                    <li style={styles.navLink}>Categories</li>
                    <li style={styles.navLink}>My Results</li>
                    <li style={styles.navLink}>Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                {loading ? (
                    <p style={styles.text}>Loading questions...</p>
                ) : !selectedCategory ? (
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
                        <button style={styles.redoButton} onClick={handleRedo}>
                            Redo Quiz
                        </button>
                    </div>
                ) : (
                    <div style={styles.card}>
                        <h1 style={styles.title}>
                            {questions[currentQuestionIndex]?.question || "Loading..."}
                        </h1>
                        <div style={styles.answerButtons}>
                            {Object.entries(questions[currentQuestionIndex].answers)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => (
                                    <button
                                        key={key}
                                        style={styles.button}
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
                )}
            </div>
        </div>
    );
}

const styles = {
    appContainer: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        fontFamily: "'Roboto', sans-serif",
    },
    sidebar: {
        width: "250px",
        backgroundColor: "#252a41",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
    },
    sidebarTitle: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    navLinks: {
        listStyle: "none",
        padding: 0,
        width: "100%",
    },
    navLink: {
        padding: "10px 20px",
        textAlign: "left",
        color: "#ffffff",
        cursor: "pointer",
        borderRadius: "8px",
        marginBottom: "10px",
        transition: "background-color 0.3s ease",
    },
    mainContent: {
        flex: 1,
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#2a2e47",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "500px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    text: {
        fontSize: "16px",
        marginBottom: "20px",
        color: "#d1d1e5",
    },
    categoryButtons: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    button: {
        backgroundColor: "#4f5da6",
        color: "#ffffff",
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    redoButton: {
        backgroundColor: "#e74c3c",
        color: "#ffffff",
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s ease",
    },
    answerButtons: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
};

export default App;
