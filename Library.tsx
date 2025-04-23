import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { Content, ContentTopic, DifficultyLevel } from '../types';
import ContentCard from '../components/content/ContentCard';
import { BookOpen, Video, PlayCircle, FileQuestion, Filter, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const Library: React.FC = () => {
  const { allContent } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filteredContent, setFilteredContent] = useState<Content[]>(allContent);
  const [activeFilters, setActiveFilters] = useState<{
    topic: ContentTopic | '',
    type: string,
    difficulty: DifficultyLevel | '',
    search: string
  }>({
    topic: searchParams.get('topic') as ContentTopic || '',
    type: searchParams.get('type') || '',
    difficulty: searchParams.get('difficulty') as DifficultyLevel || '',
    search: searchParams.get('search') || ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Apply filters
    let result = [...allContent];
    
    if (activeFilters.topic) {
      result = result.filter(content => content.topic === activeFilters.topic);
    }
    
    if (activeFilters.type) {
      result = result.filter(content => content.type === activeFilters.type);
    }
    
    if (activeFilters.difficulty) {
      result = result.filter(content => content.difficulty === activeFilters.difficulty);
    }
    
    if (activeFilters.search) {
      const searchLower = activeFilters.search.toLowerCase();
      result = result.filter(
        content => content.title.toLowerCase().includes(searchLower) || 
                  content.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredContent(result);
    
    // Update URL params
    const params: Record<string, string> = {};
    if (activeFilters.topic) params.topic = activeFilters.topic;
    if (activeFilters.type) params.type = activeFilters.type;
    if (activeFilters.difficulty) params.difficulty = activeFilters.difficulty;
    if (activeFilters.search) params.search = activeFilters.search;
    
    setSearchParams(params);
  }, [activeFilters, allContent, setSearchParams]);

  const handleFilterChange = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      topic: '',
      type: '',
      difficulty: '',
      search: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="mt-1 text-gray-600">
            Explore our curated collection of resources for dyslexic learners.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search content..."
            value={activeFilters.search}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <h3 className="text-sm font-medium text-gray-700 w-full mb-2">Content Type:</h3>
              <Button
                variant={activeFilters.type === 'article' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('type', 'article')}
                className="flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Articles
              </Button>
              <Button
                variant={activeFilters.type === 'video' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('type', 'video')}
                className="flex items-center"
              >
                <Video className="h-4 w-4 mr-1" />
                Videos
              </Button>
              <Button
                variant={activeFilters.type === 'exercise' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('type', 'exercise')}
                className="flex items-center"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Exercises
              </Button>
              <Button
                variant={activeFilters.type === 'quiz' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('type', 'quiz')}
                className="flex items-center"
              >
                <FileQuestion className="h-4 w-4 mr-1" />
                Quizzes
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <h3 className="text-sm font-medium text-gray-700 w-full mb-2">Difficulty Level:</h3>
              <Button
                variant={activeFilters.difficulty === 'easy' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('difficulty', 'easy')}
              >
                Easy
              </Button>
              <Button
                variant={activeFilters.difficulty === 'medium' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('difficulty', 'medium')}
              >
                Medium
              </Button>
              <Button
                variant={activeFilters.difficulty === 'hard' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('difficulty', 'hard')}
              >
                Hard
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <h3 className="text-sm font-medium text-gray-700 w-full mb-2">Topics:</h3>
              <Button
                variant={activeFilters.topic === 'learning_disabilities' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'learning_disabilities')}
              >
                Learning Disabilities
              </Button>
              <Button
                variant={activeFilters.topic === 'reading_strategies' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'reading_strategies')}
              >
                Reading Strategies
              </Button>
              <Button
                variant={activeFilters.topic === 'phonological_awareness' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'phonological_awareness')}
              >
                Phonological Awareness
              </Button>
              <Button
                variant={activeFilters.topic === 'auditory_processing' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'auditory_processing')}
              >
                Auditory Processing
              </Button>
              <Button
                variant={activeFilters.topic === 'reading_comprehension' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'reading_comprehension')}
              >
                Reading Comprehension
              </Button>
              <Button
                variant={activeFilters.topic === 'assistive_technology' ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('topic', 'assistive_technology')}
              >
                Assistive Technology
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Active filters display */}
        {(activeFilters.topic || activeFilters.type || activeFilters.difficulty || activeFilters.search) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.topic && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Topic: {activeFilters.topic.replace('_', ' ')}
                <button 
                  onClick={() => handleFilterChange('topic', activeFilters.topic)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200"
                >
                  ×
                </button>
              </span>
            )}
            {activeFilters.type && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Type: {activeFilters.type}
                <button 
                  onClick={() => handleFilterChange('type', activeFilters.type)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200"
                >
                  ×
                </button>
              </span>
            )}
            {activeFilters.difficulty && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Difficulty: {activeFilters.difficulty}
                <button 
                  onClick={() => handleFilterChange('difficulty', activeFilters.difficulty)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200"
                >
                  ×
                </button>
              </span>
            )}
            {activeFilters.search && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Search: {activeFilters.search}
                <button 
                  onClick={() => setActiveFilters(prev => ({ ...prev, search: '' }))}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:bg-gray-200"
                >
                  ×
                </button>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria.
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Library;