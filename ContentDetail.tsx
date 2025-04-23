import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Video, PlayCircle, FileQuestion } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Article, Exercise, Quiz, Video as VideoType } from '../types';
import TextToSpeech from '../components/multisensory/TextToSpeech';
import SpeechToText from '../components/multisensory/SpeechToText';
import Button from '../components/ui/Button';

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getContentById, recordPerformance } = useContent();
  const navigate = useNavigate();
  const [content, setContent] = useState<Article | VideoType | Exercise | Quiz | null>(null);
  const [startTime] = useState<Date>(new Date());
  const [speechInput, setSpeechInput] = useState<string>('');
  
  useEffect(() => {
    if (id) {
      const foundContent = getContentById(id);
      if (foundContent) {
        setContent(foundContent as Article | VideoType | Exercise | Quiz);
      }
    }
    
    // Record completion time when unmounting
    return () => {
      if (content) {
        const endTime = new Date();
        const timeSpent = (endTime.getTime() - startTime.getTime()) / 1000; // in seconds
        
        recordPerformance({
          timestamp: new Date().toISOString(),
          activity: content.id,
          timeSpent,
          completionRate: 100,
          difficultyLevel: content.difficulty
        });
      }
    };
  }, [id, getContentById]);
  
  const handleSpeechToText = (transcript: string) => {
    setSpeechInput(transcript);
  };
  
  const renderContentByType = () => {
    if (!content) return null;
    
    switch (content.type) {
      case 'article':
        const article = content as Article;
        return (
          <div className="prose max-w-none">
            {article.ttsEnabled && <TextToSpeech text={article.text} />}
            <p className="mt-4 text-gray-800">{article.text}</p>
          </div>
        );
        
      case 'video':
        const video = content as VideoType;
        return (
          <div>
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Video would play here. Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</p>
              </div>
            </div>
            {video.ttsEnabled && (
              <div className="mt-4">
                <h3 className="font-medium text-lg mb-2">Video Transcript</h3>
                <TextToSpeech text="This is a sample transcript for the video about auditory processing disorders. In this video, we explain what auditory processing disorder is, its symptoms, and strategies to help manage it." />
              </div>
            )}
          </div>
        );
        
      case 'exercise':
      case 'game':
        const exercise = content as Exercise;
        return (
          <div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Instructions</h3>
              <p className="text-gray-800">{exercise.instructions}</p>
            </div>
            
            {exercise.sttEnabled && (
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-2">Your Response</h3>
                <SpeechToText onTranscript={handleSpeechToText} />
                
                {speechInput && (
                  <div className="mt-4 p-4 bg-white border border-green-200 rounded-lg">
                    <h4 className="font-medium mb-2">Your answer:</h4>
                    <p>{speechInput}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 'quiz':
        const quiz = content as Quiz;
        return (
          <div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Quiz Questions</h3>
              
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="mb-6 last:mb-0">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {index + 1}. {question.text}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="radio"
                          id={`question-${index}-option-${optionIndex}`}
                          name={`question-${index}`}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label
                          htmlFor={`question-${index}-option-${optionIndex}`}
                          className="ml-2 block text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-6 flex justify-end">
                <Button variant="primary">Submit Answers</Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <p>Content type not supported.</p>;
    }
  };
  
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading content...</p>
      </div>
    );
  }
  
  const getContentIcon = () => {
    switch (content.type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'exercise':
      case 'game':
        return <PlayCircle className="h-5 w-5 text-green-600" />;
      case 'quiz':
        return <FileQuestion className="h-5 w-5 text-orange-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-blue-600" />;
    }
  };
  
  const getDifficultyColor = () => {
    switch (content.difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {content.imageUrl && (
          <div className="w-full h-64 overflow-hidden">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <div className="flex space-x-2">
              <span className={`text-xs px-2.5 py-1 rounded-full ${getDifficultyColor()}`}>
                {content.difficulty}
              </span>
              <span className="flex items-center text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
                {getContentIcon()}
                <span className="ml-1 capitalize">{content.type}</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <Clock className="h-4 w-4 mr-1" />
            <span>Estimated time: {content.type === 'video' ? `${Math.floor((content as VideoType).duration / 60)} min` : '5-10 min'}</span>
          </div>
          
          <p className="text-gray-600 mb-6">{content.description}</p>
          
          <div className="border-t pt-6">
            {renderContentByType()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;