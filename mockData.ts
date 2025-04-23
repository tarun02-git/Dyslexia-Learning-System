import { Article, Content, Exercise, Quiz, Video, Performance } from '../types';

// Mock content database
export const contents: (Article | Video | Exercise | Quiz)[] = [
  {
    id: 'article_1',
    title: 'Understanding Dyslexia',
    type: 'article',
    topic: 'learning_disabilities',
    difficulty: 'medium',
    description: 'An overview of dyslexia and its impact on learning.',
    text: 'Dyslexia is a learning disability that affects reading, writing, and spelling. It is characterized by difficulties with accurate word recognition, decoding, and spelling. People with dyslexia often have trouble reading quickly and may have challenges with reading comprehension, remembering what they\'ve read, and recognizing words they already know. Despite these challenges, individuals with dyslexia typically have normal intelligence and may excel in other areas such as creative thinking, problem-solving, and spatial reasoning.',
    ttsEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'article_2',
    title: 'Tips for Reading with Dyslexia',
    type: 'article',
    topic: 'reading_strategies',
    difficulty: 'easy',
    description: 'Practical strategies to improve reading with dyslexia.',
    text: 'Use visual aids and tools like colored overlays, which can help reduce visual stress. Break reading into smaller chunks and take regular breaks. Use a ruler or bookmark to keep your place while reading. Try audiobooks or text-to-speech tools. Practice with books that have larger fonts and more spacing. Join a reading group for accountability and support.',
    ttsEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'exercise_1',
    title: 'Phonological Awareness Game',
    type: 'exercise',
    topic: 'phonological_awareness',
    difficulty: 'easy',
    description: 'A fun game to develop phonological awareness skills.',
    instructions: 'Listen to the sounds and identify the correct word. Start by focusing on the beginning sounds of words, then move to ending sounds, and finally to middle sounds. This exercise helps build the foundation for reading and spelling.',
    sttEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'video_1',
    title: 'What is Auditory Processing Disorder?',
    type: 'video',
    topic: 'auditory_processing',
    difficulty: 'medium',
    description: 'An informative video explaining auditory processing disorder.',
    url: 'https://example.com/video1',
    duration: 420,
    ttsEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'quiz_1',
    title: 'Reading Comprehension Quiz',
    type: 'quiz',
    topic: 'reading_comprehension',
    difficulty: 'medium',
    description: 'Test your reading comprehension with this quiz.',
    questions: [
      {
        id: 'q1',
        text: 'What is the main feature of dyslexia?',
        options: [
          'Difficulty with math calculations',
          'Difficulty with reading and writing',
          'Difficulty with social interactions',
          'Difficulty with physical coordination'
        ],
        correctAnswer: 'Difficulty with reading and writing'
      },
      {
        id: 'q2',
        text: 'Which strategy can help with reading comprehension?',
        options: [
          'Reading as fast as possible',
          'Avoiding breaks while reading',
          'Visualizing what you read',
          'Using small fonts'
        ],
        correctAnswer: 'Visualizing what you read'
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'article_3',
    title: 'The Role of Technology in Dyslexia Support',
    type: 'article',
    topic: 'assistive_technology',
    difficulty: 'medium',
    description: 'How modern technology can help individuals with dyslexia.',
    text: 'Many technological tools can assist individuals with dyslexia. Text-to-speech software reads digital text aloud, allowing users to listen rather than read. Speech-to-text technology converts spoken words into written text, helping with writing tasks. Word prediction software suggests words as you type, reducing spelling difficulties. Digital highlighters help focus attention on specific text sections. E-readers with customizable fonts and spacing improve readability.',
    ttsEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'exercise_2',
    title: 'Rhyming Words Challenge',
    type: 'game',
    topic: 'phonological_awareness',
    difficulty: 'easy',
    description: 'Have fun identifying rhyming words.',
    instructions: 'Find words that rhyme with the given word. This exercise strengthens your ability to recognize similar sound patterns in different words, which is a crucial skill for reading and spelling.',
    sttEnabled: true,
    imageUrl: 'https://images.pexels.com/photos/5905502/pexels-photo-5905502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock performance data
export const mockPerformanceData: Performance[] = [
  {
    timestamp: '2025-01-10T12:30:00Z',
    activity: 'article_1',
    timeSpent: 180,
    completionRate: 100
  },
  {
    timestamp: '2025-01-12T14:15:00Z',
    activity: 'exercise_1',
    score: 85,
    timeSpent: 300,
    completionRate: 100,
    difficultyLevel: 'easy'
  },
  {
    timestamp: '2025-01-15T10:00:00Z',
    activity: 'quiz_1',
    score: 70,
    timeSpent: 450,
    completionRate: 100,
    difficultyLevel: 'medium'
  },
  {
    timestamp: '2025-01-18T16:20:00Z',
    activity: 'article_2',
    timeSpent: 150,
    completionRate: 100
  },
  {
    timestamp: '2025-01-20T11:45:00Z',
    activity: 'exercise_2',
    score: 90,
    timeSpent: 270,
    completionRate: 100,
    difficultyLevel: 'easy'
  },
  {
    timestamp: '2025-01-23T13:10:00Z',
    activity: 'article_3',
    timeSpent: 200,
    completionRate: 85
  },
  {
    timestamp: '2025-01-25T15:30:00Z',
    activity: 'video_1',
    timeSpent: 420,
    completionRate: 100
  },
  {
    timestamp: '2025-01-28T09:20:00Z',
    activity: 'quiz_1',
    score: 85,
    timeSpent: 400,
    completionRate: 100,
    difficultyLevel: 'medium'
  }
];

// Mock analytics report
export const mockAnalyticsReport = {
  scores: {
    mean: 82.5,
    min: 70,
    max: 90
  },
  timeSpent: {
    mean: 296.25,
    min: 150,
    max: 450
  },
  completionRate: {
    mean: 98.125,
    min: 85,
    max: 100
  },
  progressOverTime: [
    { date: '2025-01-12', score: 85 },
    { date: '2025-01-15', score: 70 },
    { date: '2025-01-20', score: 90 },
    { date: '2025-01-28', score: 85 }
  ]
};

// Function to get recommendations based on user preferences
export const getRecommendations = (preferredTopics: string[], difficultyLevel: string): Content[] => {
  let filteredContents = [...contents];
  
  // Filter by topics if provided
  if (preferredTopics && preferredTopics.length > 0) {
    filteredContents = filteredContents.filter(content => 
      preferredTopics.includes(content.topic)
    );
  }
  
  // Filter by difficulty level
  if (difficultyLevel) {
    filteredContents = filteredContents.filter(content => 
      content.difficulty === difficultyLevel
    );
  }
  
  // If nothing matches, return random recommendations
  if (filteredContents.length === 0) {
    return contents.slice(0, 3);
  }
  
  // Return up to 3 recommendations
  return filteredContents.slice(0, 3);
};