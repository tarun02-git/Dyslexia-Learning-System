import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Lightbulb, BarChart, User, Book, Headphones } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                Personalized Learning for Dyslexic Readers
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-light">
                Unlock your learning potential with our adaptive platform designed specifically for individuals with dyslexia.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 shadow-md w-full sm:w-auto"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/4144297/pexels-photo-4144297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Student learning with technology"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features Designed for Your Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with research-backed methods to create a supportive learning environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-blue-100 p-3 inline-flex mb-4">
                <Headphones className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multimodal Learning</h3>
              <p className="text-gray-600">
                Access content through both visual and auditory channels with our text-to-speech and speech-to-text technologies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-purple-100 p-3 inline-flex mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Content</h3>
              <p className="text-gray-600">
                Receive content recommendations tailored to your preferences, learning pace, and difficulty level.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-green-100 p-3 inline-flex mb-4">
                <Lightbulb className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Exercises</h3>
              <p className="text-gray-600">
                Strengthen your skills with phonological awareness games, comprehension quizzes, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-orange-100 p-3 inline-flex mb-4">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and insights that highlight your strengths and areas for growth.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-red-100 p-3 inline-flex mb-4">
                <User className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Profile</h3>
              <p className="text-gray-600">
                Set your preferences for topics, difficulty levels, and learning strategies to optimize your experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-indigo-100 p-3 inline-flex mb-4">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Content Library</h3>
              <p className="text-gray-600">
                Access a diverse collection of articles, videos, quizzes, and exercises across various subjects and difficulty levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from users who have transformed their learning experience with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Student, 14</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The text-to-speech feature has been a game-changer for me. I can finally enjoy reading without struggling through every word."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">James T.</h4>
                  <p className="text-sm text-gray-500">Parent</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "My son's confidence has grown tremendously since using this platform. The personalized approach has made all the difference."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  L
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Lisa R.</h4>
                  <p className="text-sm text-gray-500">Teacher</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As an educator, I've seen remarkable progress in my students who use this platform. The analytics help me target specific areas for support."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who have discovered their learning potential with our specialized platform.
          </p>
          <Link to="/register">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;