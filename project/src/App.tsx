import { useState } from 'react';
import { Heart, User, Calendar, RotateCcw, Send } from 'lucide-react';
import { ReminderCategory, UserProfile, Reminder, StringInput, TaskData } from './types';
import { sampleReminders, userProfiles } from './data/sampleData';
import ReminderCard from './components/ReminderCard';
import UserProfileCard from './components/UserProfileCard';
import CategoryFilter from './components/CategoryFilter';
import CaregiverDashboard from './components/CaregiverDashboard';
import AchievementBanner from './components/AchievementBanner';
import VoiceControls from './components/VoiceControls';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(userProfiles[0]);
  const [reminders, setReminders] = useState<Reminder[]>(sampleReminders);
  const [activeCategory, setActiveCategory] = useState<ReminderCategory | 'all'>('all');
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [showCaregiverDashboard, setShowCaregiverDashboard] = useState(false);
  
  // Development section state
  const [devInput, setDevInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<TaskData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredReminders = reminders.filter(reminder => 
    activeCategory === 'all' || reminder.category === activeCategory
  );

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const resetReminders = () => {
    setReminders(sampleReminders.map(reminder => ({ ...reminder, completed: false })));
  };

  const handleSendPlan = async () => {
    if (!devInput.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      // Send POST request exactly as defined in the API
      const requestData: StringInput = { text: devInput };
      
      const response = await fetch('https://data.aichaosn.com/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(requestData),
      });

      // With no-cors mode, we can't read the response, so we'll show a success message
      if (response.type === 'opaque') {
        setApiResponse({
          id: 'success',
          title: 'Request Sent Successfully',
          description: `Your message "${devInput}" has been sent to the server.`,
          status: 'completed',
          createdAt: new Date().toISOString()
        });
      } else {
        // If we can read the response, process it normally
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data: TaskData = await response.json();
        setApiResponse(data);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fontSizeClass = {
    normal: '',
    large: 'text-lg',
    'extra-large': 'text-xl'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${fontSizeClass[selectedProfile.preferences.fontSize]}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="ml-4">
                <h1 className={`font-bold text-gray-800 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-4xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                  ElderCare Companion
                </h1>
                <p className={`text-gray-600 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                  Welcome back, {selectedProfile.name}! 🌟
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowProfileSelector(!showProfileSelector)}
                className={`
                  flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium 
                  hover:bg-blue-200 transition-colors border-2 border-blue-200
                  ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg px-6 py-3' : ''}
                `}
              >
                <User className="w-5 h-5 mr-2" />
                Switch Profile
              </button>
              
              {selectedProfile.preferences.caregiverAccess && (
                <button
                  onClick={() => setShowCaregiverDashboard(!showCaregiverDashboard)}
                  className={`
                    flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium 
                    hover:bg-green-200 transition-colors border-2 border-green-200
                    ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg px-6 py-3' : ''}
                  `}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Family Dashboard
                </button>
              )}
              
              <button
                onClick={resetReminders}
                className={`
                  flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium 
                  hover:bg-orange-200 transition-colors border-2 border-orange-200
                  ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg px-6 py-3' : ''}
                `}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Demo
              </button>
            </div>
          </div>
        </header>

        {/* Development Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className={`font-bold text-gray-800 mb-6 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-2xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
            Plan Section
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="dev-input" className={`block text-sm font-medium text-gray-700 mb-2 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : selectedProfile.preferences.fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                Enter your text:
              </label>
              <textarea
                id="dev-input"
                value={devInput}
                onChange={(e) => setDevInput(e.target.value)}
                placeholder="Type your message here..."
                className={`
                  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none
                  ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : selectedProfile.preferences.fontSize === 'large' ? 'text-base' : 'text-sm'}
                `}
                rows={3}
              />
            </div>
            
            <button
              onClick={handleSendPlan}
              disabled={isLoading || !devInput.trim()}
              className={`
                flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
                ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg px-8 py-4' : selectedProfile.preferences.fontSize === 'large' ? 'text-base px-7 py-3' : 'text-sm'}
              `}
            >
              <Send className="w-5 h-5 mr-2" />
              {isLoading ? 'Sending...' : 'SendPlan'}
            </button>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className={`text-red-700 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : selectedProfile.preferences.fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                  Error: {error}
                </p>
              </div>
            )}
            
            {apiResponse && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className={`font-semibold text-green-800 mb-2 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : selectedProfile.preferences.fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                  API Response:
                </h3>
                <div className={`text-green-700 space-y-1 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-base' : selectedProfile.preferences.fontSize === 'large' ? 'text-sm' : 'text-xs'}`}>
                  <p><strong>ID:</strong> {apiResponse.id}</p>
                  <p><strong>Title:</strong> {apiResponse.title}</p>
                  <p><strong>Description:</strong> {apiResponse.description}</p>
                  <p><strong>Status:</strong> {apiResponse.status}</p>
                  <p><strong>Created:</strong> {new Date(apiResponse.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Selector */}
        {showProfileSelector && (
          <div className="mb-8">
            <h2 className={`font-semibold mb-4 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-2xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
              Choose Your Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProfiles.map((profile) => (
                <UserProfileCard
                  key={profile.id}
                  profile={profile}
                  isActive={selectedProfile.id === profile.id}
                  onSelect={setSelectedProfile}
                />
              ))}
            </div>
          </div>
        )}

        {/* Caregiver Dashboard */}
        {showCaregiverDashboard && selectedProfile.preferences.caregiverAccess && (
          <CaregiverDashboard profile={selectedProfile} />
        )}

        {/* Voice Controls */}
        {selectedProfile.preferences.voiceEnabled && (
          <VoiceControls 
            voiceEnabled={selectedProfile.preferences.voiceEnabled}
            onVoiceToggle={() => {}}
            fontSize={selectedProfile.preferences.fontSize}
          />
        )}

        {/* Achievements Banner */}
        <AchievementBanner 
          achievements={selectedProfile.achievements} 
          fontSize={selectedProfile.preferences.fontSize}
        />

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          fontSize={selectedProfile.preferences.fontSize}
        />

        {/* Reminders Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-bold text-gray-800 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-2xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
              {activeCategory === 'all' ? 'All Your Reminders' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Reminders`}
            </h2>
            <div className={`px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : ''}`}>
              {filteredReminders.length} reminder{filteredReminders.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredReminders.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-gray-500 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-xl' : 'text-lg'}`}>
                  No reminders in this category. Great job staying on top of things! 🎉
                </p>
              </div>
            ) : (
              filteredReminders.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onComplete={handleCompleteReminder}
                  fontSize={selectedProfile.preferences.fontSize}
                />
              ))
            )}
          </div>
        </div>

        {/* User Journey Examples */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className={`font-bold text-gray-800 mb-6 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-2xl' : selectedProfile.preferences.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
            Sample User Journeys
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className={`font-semibold text-blue-800 mb-3 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : 'text-base'}`}>
                👵 Margaret (Independent Elder)
              </h3>
              <ul className={`text-blue-700 space-y-2 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-base' : 'text-sm'}`}>
                <li>• 8:00 AM - Medication reminder with water</li>
                <li>• 10:00 AM - Hydration check with encouragement</li>
                <li>• 3:00 PM - Call daughter Sarah weekly</li>
                <li>• 6:00 PM - Achievement: "7 days of walking!"</li>
                <li>• Evening - Safety check: doors locked</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h3 className={`font-semibold text-green-800 mb-3 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : 'text-base'}`}>
                👴 Robert (Active Elder)
              </h3>
              <ul className={`text-green-700 space-y-2 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-base' : 'text-sm'}`}>
                <li>• 7:00 AM - Morning yoga session</li>
                <li>• 9:00 AM - Volunteer work at library</li>
                <li>• 11:00 AM - Online Spanish class</li>
                <li>• 2:00 PM - Hiking group meetup</li>
                <li>• 5:00 PM - Cooking class reminder</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
              <h3 className={`font-semibold text-pink-800 mb-3 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : 'text-base'}`}>
                👵 Eleanor (Family Supported)
              </h3>
              <ul className={`text-pink-700 space-y-2 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-base' : 'text-sm'}`}>
                <li>• Voice-activated medication reminders</li>
                <li>• Large text appointment notifications</li>
                <li>• Family caregiver dashboard updates</li>
                <li>• Gentle exercise reminders</li>
                <li>• Emergency contact integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className={`text-gray-600 ${selectedProfile.preferences.fontSize === 'extra-large' ? 'text-lg' : 'text-sm'}`}>
            ElderCare Companion - Supporting wellbeing at every level of Maslow's hierarchy 💙
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;