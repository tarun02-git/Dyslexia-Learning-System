import React, { useState } from 'react';
import { User, Settings, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

const Profile: React.FC = () => {
  const { authState, updateUserPreferences } = useAuth();
  const { updateRecommendations } = useContent();
  
  const [preferences, setPreferences] = useState({
    preferredTopics: authState.user?.preferredTopics || [],
    difficultyLevel: authState.user?.difficultyLevel || 'medium',
  });
  
  const handleTopicToggle = (topic: string) => {
    const updatedTopics = [...preferences.preferredTopics];
    const topicIndex = updatedTopics.indexOf(topic);
    
    if (topicIndex === -1) {
      updatedTopics.push(topic);
    } else {
      updatedTopics.splice(topicIndex, 1);
    }
    
    setPreferences({
      ...preferences,
      preferredTopics: updatedTopics,
    });
  };
  
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences({
      ...preferences,
      difficultyLevel: e.target.value,
    });
  };
  
  const handleSavePreferences = () => {
    updateUserPreferences(preferences.preferredTopics, preferences.difficultyLevel);
    updateRecommendations(preferences.preferredTopics, preferences.difficultyLevel);
  };

  if (!authState.user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-gray-600">
          Manage your preferences and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {authState.user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{authState.user.username}</h2>
                  <p className="text-gray-500">Free Plan</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <nav className="space-y-1">
                <a
                  href="#profile"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Profile Information</span>
                </a>
                <a
                  href="#preferences"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Learning Preferences</span>
                </a>
                <a
                  href="#notifications"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Bell className="mr-3 h-5 w-5" />
                  <span>Notifications</span>
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold" id="profile">Profile Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={authState.user.username}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 cursor-not-allowed px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Add your email address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">Update Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold" id="preferences">Learning Preferences</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Topics
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-3">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('learning_disabilities')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('learning_disabilities')}
                      >
                        Learning Disabilities
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('reading_strategies')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('reading_strategies')}
                      >
                        Reading Strategies
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('phonological_awareness')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('phonological_awareness')}
                      >
                        Phonological Awareness
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('auditory_processing')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('auditory_processing')}
                      >
                        Auditory Processing
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('reading_comprehension')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('reading_comprehension')}
                      >
                        Reading Comprehension
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          preferences.preferredTopics.includes('assistive_technology')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTopicToggle('assistive_technology')}
                      >
                        Assistive Technology
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Difficulty Level
                  </label>
                  <select
                    id="difficulty"
                    value={preferences.difficultyLevel}
                    onChange={handleDifficultyChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="primary"
                    onClick={handleSavePreferences}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold" id="notifications">Notification Settings</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-gray-500">
                      Receive emails about new content, learning tips, and progress updates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="learning-reminders"
                      name="learning-reminders"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="learning-reminders" className="font-medium text-gray-700">
                      Learning Reminders
                    </label>
                    <p className="text-gray-500">
                      Receive reminders to continue your learning journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="achievement-alerts"
                      name="achievement-alerts"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="achievement-alerts" className="font-medium text-gray-700">
                      Achievement Alerts
                    </label>
                    <p className="text-gray-500">
                      Receive notifications about your achievements and milestones.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">Save Notification Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;