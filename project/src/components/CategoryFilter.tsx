import React from 'react';
import { Heart, Shield, Users, Trophy, Lightbulb, Filter } from 'lucide-react';
import { ReminderCategory } from '../types';

interface CategoryFilterProps {
  activeCategory: ReminderCategory | 'all';
  onCategoryChange: (category: ReminderCategory | 'all') => void;
  fontSize: 'normal' | 'large' | 'extra-large';
}

const categories = [
  { key: 'all' as const, label: 'All Reminders', icon: Filter, color: 'bg-gray-50 text-gray-700' },
  { key: 'physiological' as const, label: 'Health & Wellness', icon: Heart, color: 'bg-blue-50 text-blue-700' },
  { key: 'safety' as const, label: 'Safety & Care', icon: Shield, color: 'bg-green-50 text-green-700' },
  { key: 'love-belonging' as const, label: 'Family & Friends', icon: Users, color: 'bg-pink-50 text-pink-700' },
  { key: 'esteem' as const, label: 'Personal Growth', icon: Trophy, color: 'bg-purple-50 text-purple-700' },
  { key: 'self-actualization' as const, label: 'Learning & Creativity', icon: Lightbulb, color: 'bg-yellow-50 text-yellow-700' }
];

export default function CategoryFilter({ activeCategory, onCategoryChange, fontSize }: CategoryFilterProps) {
  const fontSizes = {
    normal: 'text-sm',
    large: 'text-base', 
    'extra-large': 'text-lg'
  };

  return (
    <div className="mb-8">
      <h3 className={`font-semibold mb-4 ${fontSize === 'extra-large' ? 'text-xl' : fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`
              flex items-center px-4 py-3 rounded-lg border-2 transition-all duration-200
              ${fontSizes[fontSize]} font-medium
              ${activeCategory === key 
                ? `${color} border-current shadow-md` 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm'
              }
            `}
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}