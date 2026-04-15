import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Quiz from './Quiz';

export enum LessonType {
  MARKDOWN = 'markdown',
  QUIZ = 'quiz',
}

export interface Lesson {
  id: number;
  module_id: number;
  title: str;
  content: str;
  type: LessonType;
  order: number;
}

interface LessonViewerProps {
  moduleId: number;
  onClose: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ moduleId, onClose }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/modules/${moduleId}/lessons/`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch lessons:', err);
        setLoading(false);
      });
  }, [moduleId]);

  if (loading) return <div className="lesson-viewer">Loading lessons...</div>;
  if (lessons.length === 0) return <div className="lesson-viewer">No lessons found for this module. <button onClick={onClose}>Close</button></div>;

  const currentLesson = lessons[currentLessonIndex];

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="lesson-viewer">
      <div className="lesson-header">
        <button className="close-btn" onClick={onClose}>Close Lesson</button>
        <h2>{currentLesson.title}</h2>
        <div className="progress">
          Lesson {currentLessonIndex + 1} of {lessons.length}
        </div>
      </div>

      <div className="lesson-content">
        {currentLesson.type === LessonType.MARKDOWN ? (
          <div className="markdown-content">
            <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
          </div>
        ) : (
          <Quiz content={currentLesson.content} onComplete={handleNext} />
        )}
      </div>

      <div className="lesson-footer">
        <button 
          onClick={handlePrevious} 
          disabled={currentLessonIndex === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentLessonIndex === lessons.length - 1}
        >
          {currentLessonIndex === lessons.length - 1 ? 'Finish Module' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default LessonViewer;
