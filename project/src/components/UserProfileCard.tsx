import React from 'react';
import { User, Heart, Zap, Users, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileCardProps {
  profile: UserProfile;
  isActive: boolean;
  onSelect: (profile: UserProfile) => void;
}

const profileIcons = {
  independent: Shield,
  'family-supported': Heart,
  'limited-mobility': Users,
  active: Zap
};

const profileDescriptions = {
  independent: 'Living independently with occasional family check-ins',
  'family-supported': 'Living with or near family with regular support',
  'limited-mobility': 'May need accessibility features and gentle reminders',
  active: 'Maintains an active lifestyle with hobbies and activities'
};

const profileColors = {
  independent: 'bg-blue-50 border-blue-200 text-blue-800',
  'family-supported': 'bg-pink-50 border-pink-200 text-pink-800',
  'limited-mobility': 'bg-green-50 border-green-200 text-green-800',
  active: 'bg-purple-50 border-purple-200 text-purple-800'
};

export default function UserProfileCard({ profile, isActive, onSelect }: UserProfileCardProps) {
  const IconComponent = profileIcons[profile.type];
  
  return (
    <div
      onClick={() => onSelect(profile)}
      className={`
        border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
        ${isActive 
          ? `${profileColors[profile.type]} border-current shadow-md` 
          : 'bg-white border-gray-200 hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${isActive ? 'bg-white/60' : 'bg-gray-50'}`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-sm opacity-75 capitalize font-medium">
            {profile.type.replace('-', ' ')} Elder
          </p>
        </div>
      </div>
      
      <p className="text-sm mb-4 leading-relaxed">
        {profileDescriptions[profile.type]}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <div className="flex items-center mb-1">
            <span className="font-medium">Achievements:</span>
            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
              {profile.achievements.length}
            </span>
          </div>
          <div className="flex items-center text-xs opacity-75">
            {profile.preferences.voiceEnabled && <span className="mr-2">🎤 Voice</span>}
            {profile.preferences.caregiverAccess && <span>👨‍👩‍👧‍👦 Family Access</span>}
          </div>
        </div>
        
        {isActive && (
          <div className="text-sm font-medium px-3 py-1 bg-white/60 rounded-full">
            Active
          </div>
        )}
      </div>
    </div>
  );
}