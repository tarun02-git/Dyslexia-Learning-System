import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content, Performance } from '../types';
import { content as contentApi, analytics as analyticsApi } from '../api/client';

interface ContentContextType {
  allContent: Content[];
  recommendedContent: Content[];
  userPerformance: Performance[];
  getContentById: (id: string) => Content | undefined;
  recordPerformance: (performance: Performance) => Promise<void>;
  updateRecommendations: (preferredTopics: string[], difficultyLevel: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [recommendedContent, setRecommendedContent] = useState<Content[]>([]);
  const [userPerformance, setUserPerformance] = useState<Performance[]>([]);

  // Load initial content and performance data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [content, recommendations, analytics] = await Promise.all([
          contentApi.getAllContent(),
          contentApi.getRecommendations(),
          analyticsApi.getPersonalizedReport(),
        ]);

        setAllContent(content);
        setRecommendedContent(recommendations);
        setUserPerformance(analytics.performance || []);
      } catch (error) {
        console.error('Error loading content data:', error);
      }
    };

    loadData();
  }, []);

  const getContentById = (id: string) => {
    return allContent.find(content => content.id === id);
  };

  const recordPerformance = async (performance: Performance) => {
    try {
      await analyticsApi.recordPerformance(performance.activity, {
        score: performance.score,
        time_spent: performance.timeSpent,
        completion_rate: performance.completionRate,
        difficulty_level: performance.difficultyLevel,
      });
      
      setUserPerformance(prev => [...prev, performance]);
    } catch (error) {
      console.error('Error recording performance:', error);
      throw error;
    }
  };

  const updateRecommendations = async (preferredTopics: string[], difficultyLevel: string) => {
    try {
      const newRecommendations = await contentApi.getRecommendations();
      setRecommendedContent(newRecommendations);
    } catch (error) {
      console.error('Error updating recommendations:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        allContent,
        recommendedContent,
        userPerformance,
        getContentById,
        recordPerformance,
        updateRecommendations,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};