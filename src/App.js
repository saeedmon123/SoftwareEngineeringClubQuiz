import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState({ message: '', type: '' });
  const [health, setHealth] = useState(3); // Starting with 3 health points
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds timer

  const questions = [
    {
      question: 'What is the name of our club?',
      answers: ['Software Engineering Club', 'Coding Wizards Club', 'Algorithm Alliance', 'Debuggers Union'],
      correctAnswer: 'Software Engineering Club',
    },
    {
      question: 'Which programming language is often used in web development?',
      answers: ['Python', 'JavaScript', 'C++', 'Swift'],
      correctAnswer: 'JavaScript',
    },
    {
      question: 'What does HTML stand for?',
      answers: ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Makeup Language'],
      correctAnswer: 'Hyper Text Markup Language',
    },
    {
      question: 'Which of these is a type of database?',
      answers: ['MySQL', 'Java', 'JSON', 'HTML'],
      correctAnswer: 'MySQL',
    },
    {
      question: 'What does CSS stand for?',
      answers: ['Cascading Style Sheets', 'Coded Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
      correctAnswer: 'Cascading Style Sheets',
    },
    {
      question: 'Which of these is a JavaScript framework?',
      answers: ['React', 'Django', 'Laravel', 'Spring'],
      correctAnswer: 'React',
    },
    {
      question: 'What is the purpose of a version control system?',
      answers: ['Track changes to code', 'Manage project timelines', 'Design user interfaces', 'Optimize database queries'],
      correctAnswer: 'Track changes to code',
    },
    {
      question: 'What does API stand for?',
      answers: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Integration', 'Advanced Process Integration'],
      correctAnswer: 'Application Programming Interface',
    },
    {
      question: 'Which language is known as the "mother of all languages"?',
      answers: ['C', 'Python', 'Java', 'Fortran'],
      correctAnswer: 'C',
    },
    {
      question: 'What is the main function of a database index?',
      answers: ['Speed up data retrieval', 'Store data backups', 'Encrypt data', 'Normalize data'],
      correctAnswer: 'Speed up data retrieval',
    },
  ];

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      setShowPopup({ message: 'Time is up!', type: 'error' });
      setShowResult(true);
    }

    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setShowPopup({ message: '🎉 Correct! Well done!', type: 'success' });
      // Show the correct message briefly, then move to the next question immediately
      setShowPopup({ message: '', type: '' });
      nextQuestion(); // Move immediately to the next question
    } else {
      setHealth(health - 1);
      setShowPopup({ message: '❌ Incorrect. Try again!', type: 'error' });
      
      if (health - 1 === 0) {
        // If no more hearts, move to the next question without awarding point
        setShowPopup({ message: '', type: '' });
        nextQuestion(); // Move immediately to the next question
      }
    }
  };

  const nextQuestion = () => {
    const nextQuestionIndex = currentQuestion + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
      setHealth(3); // Reset health
      setTimeLeft(20); // Reset timer
    } else {
      setShowResult(true); // Show result at the end of the quiz
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Software Engineering Club Quiz</h1>

        {showResult ? (
          <div className="result-section">
            <h2>Your Score: {score} / {questions.length}</h2>
            <p>Join our WhatsApp group: <a href="https://chat.whatsapp.com/DJe4vjY5GDe77EbkM1mFNW" target="_blank" rel="noopener noreferrer">Click Here</a></p>
          </div>
        ) : (
          <div className="quiz-section">
            <div className="timer">
              Time Left: {timeLeft} seconds
            </div>

            <div className="health-bar">
              Health: {'❤️'.repeat(health)}
            </div>

            <div className="question-section">
              <h3>{questions[currentQuestion].question}</h3>
            </div>

            <div className="answer-section">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)}>
                  {answer}
                </button>
              ))}
            </div>

            {showPopup.message && (
              <div className={`popup ${showPopup.type}`}>
                {showPopup.message}
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
