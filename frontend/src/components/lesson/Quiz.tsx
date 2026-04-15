import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  content: string; // JSON string representing the quiz
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ content, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  let quizData: QuizQuestion;
  try {
    quizData = JSON.parse(content);
  } catch (err) {
    return <div>Error: Invalid quiz content</div>;
  }

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setShowFeedback(true);
  };

  const isCorrect = selectedOption === quizData.correctAnswer;

  return (
    <div className="quiz-container">
      <h3>{quizData.question}</h3>
      <div className="options">
        {quizData.options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedOption === index ? 'selected' : ''} ${showFeedback && index === quizData.correctAnswer ? 'correct' : ''} ${showFeedback && selectedOption === index && !isCorrect ? 'incorrect' : ''}`}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>

      {!showFeedback ? (
        <button 
          className="check-btn" 
          onClick={handleCheck} 
          disabled={selectedOption === null}
        >
          Check Answer
        </button>
      ) : (
        <div className="feedback">
          <p className={isCorrect ? 'correct-text' : 'incorrect-text'}>
            {isCorrect ? 'Correct!' : 'Incorrect.'}
          </p>
          {quizData.explanation && <p className="explanation">{quizData.explanation}</p>}
          {isCorrect && <button onClick={onComplete}>Continue to Next Lesson</button>}
          {!isCorrect && <button onClick={() => setShowFeedback(false)}>Try Again</button>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
