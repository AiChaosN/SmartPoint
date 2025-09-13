import React from 'react';
import { Trophy, Star, Heart, Zap, Gift } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementBannerProps {
  achievements: Achievement[];
  fontSize: 'normal' | 'large' | 'extra-large';
}

const iconMap = {
  Trophy, Star, Heart, Zap, Gift
};

export default function AchievementBanner({ achievements, fontSize }: AchievementBannerProps) {
  if (achievements.length === 0) return null;

  const fontSizes = {
    normal: { title: 'text-lg', description: 'text-sm' },
    large: { title: 'text-xl', description: 'text-base' },
    'extra-large': { title: 'text-2xl', description: 'text-lg' }
  };

  const currentFontSize = fontSizes[fontSize];

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-yellow-100 rounded-full">
          <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <div className="ml-4">
          <h2 className={`font-bold text-yellow-800 ${currentFontSize.title}`}>
            🎉 Your Amazing Achievements!
          </h2>
          <p className={`text-yellow-700 ${currentFontSize.description}`}>
            You've earned {achievements.length} achievement{achievements.length !== 1 ? 's' : ''} this month
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Star;
          return (
            <div key={achievement.id} className="bg-white/60 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center mb-2">
                <IconComponent className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className={`font-semibold text-yellow-800 ${currentFontSize.description}`}>
                  {achievement.title}
                </h3>
              </div>
              <p className="text-yellow-700 text-sm mb-2">{achievement.description}</p>
              <p className="text-xs text-yellow-600">Earned: {achievement.dateEarned}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}