import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Video, PlayCircle, FileQuestion, Gamepad2 } from 'lucide-react';
import { Content } from '../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/content/${content.id}`);
  };
  
  const getIcon = () => {
    switch (content.type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'exercise':
        return <PlayCircle className="h-5 w-5 text-green-600" />;
      case 'quiz':
        return <FileQuestion className="h-5 w-5 text-orange-600" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5 text-indigo-600" />;
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
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      {content.imageUrl && (
        <CardImage src={content.imageUrl} alt={content.title} />
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{content.title}</CardTitle>
          <div className="flex space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>
              {content.difficulty}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{content.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <span className="text-sm capitalize">{content.type}</span>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleClick}
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;