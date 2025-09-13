import React from 'react';
import { 
  Pill, 
  Droplets, 
  UtensilsCrossed, 
  Stethoscope, 
  Activity, 
  Phone, 
  Users, 
  Award, 
  Palette,
  Clock,
  Heart,
  Shield,
  Trophy,
  Lightbulb,
  Star,
  Zap
} from 'lucide-react';
import { Reminder } from '../types';

interface ReminderCardProps {
  reminder: Reminder;
  onComplete: (id: string) => void;
  fontSize: 'normal' | 'large' | 'extra-large';
}

const iconMap = {
  Pill, Droplets, UtensilsCrossed, Stethoscope, Activity, 
  Phone, Users, Award, Palette, Clock, Heart, Shield, 
  Trophy, Lightbulb, Star, Zap
};

const categoryColors = {
  physiological: 'bg-blue-50 border-blue-200 text-blue-800',
  safety: 'bg-green-50 border-green-200 text-green-800',
  'love-belonging': 'bg-pink-50 border-pink-200 text-pink-800',
  esteem: 'bg-purple-50 border-purple-200 text-purple-800',
  'self-actualization': 'bg-yellow-50 border-yellow-200 text-yellow-800'
};

const categoryLabels = {
  physiological: 'Health & Wellness',
  safety: 'Safety & Care',
  'love-belonging': 'Family & Friends',
  esteem: 'Personal Growth',
  'self-actualization': 'Learning & Creativity'
};

const priorityColors = {
  high: 'border-l-red-400 bg-red-50',
  medium: 'border-l-orange-400 bg-orange-50',
  low: 'border-l-blue-400 bg-blue-50'
};

export default function ReminderCard({ reminder, onComplete, fontSize }: ReminderCardProps) {
  const IconComponent = iconMap[reminder.icon as keyof typeof iconMap] || Clock;
  
  const fontSizes = {
    normal: { title: 'text-lg', description: 'text-sm', time: 'text-sm' },
    large: { title: 'text-xl', description: 'text-base', time: 'text-base' },
    'extra-large': { title: 'text-2xl', description: 'text-lg', time: 'text-lg' }
  };

  const currentFontSize = fontSizes[fontSize];

  return (
    <div 
      className={`
        ${categoryColors[reminder.category]} 
        ${priorityColors[reminder.priority]}
        border-2 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200
        border-l-4
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h3 className={`font-semibold ${currentFontSize.title} mb-1`}>
              {reminder.title}
            </h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/60`}>
              {categoryLabels[reminder.category]}
            </span>
          </div>
        </div>
        <div className={`text-right ${currentFontSize.time} font-medium`}>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {reminder.time}
          </div>
          <div className="text-xs text-gray-500 mt-1 capitalize">
            {reminder.frequency}
          </div>
        </div>
      </div>
      
      <p className={`${currentFontSize.description} text-gray-700 mb-4 leading-relaxed`}>
        {reminder.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {reminder.priority === 'high' && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
              Important
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize
            ${reminder.emotionalTone === 'encouraging' ? 'bg-green-100 text-green-700' : 
              reminder.emotionalTone === 'celebratory' ? 'bg-yellow-100 text-yellow-700' : 
              'bg-gray-100 text-gray-700'}`}
          >
            {reminder.emotionalTone}
          </span>
        </div>
        
        <button
          onClick={() => onComplete(reminder.id)}
          className={`
            px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium
            hover:border-green-400 hover:bg-green-50 hover:text-green-700
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300
            ${currentFontSize.description}
          `}
        >
          {reminder.completed ? 'Completed ✓' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}