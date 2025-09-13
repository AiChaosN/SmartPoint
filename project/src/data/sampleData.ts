import { Reminder, UserProfile, Achievement } from '../types';

export const sampleReminders: Reminder[] = [
  // Physiological Needs
  {
    id: '1',
    title: 'Take Morning Medication',
    description: 'Take your blood pressure medication with a full glass of water',
    category: 'physiological',
    time: '08:00',
    frequency: 'daily',
    priority: 'high',
    icon: 'Pill',
    emotionalTone: 'gentle'
  },
  {
    id: '2',
    title: 'Hydration Check',
    description: 'Time for a refreshing glass of water! Stay healthy and hydrated.',
    category: 'physiological',
    time: '10:00',
    frequency: 'daily',
    priority: 'medium',
    icon: 'Droplets',
    emotionalTone: 'encouraging'
  },
  {
    id: '3',
    title: 'Nutritious Lunch',
    description: 'Enjoy a balanced meal with protein, vegetables, and grains',
    category: 'physiological',
    time: '12:30',
    frequency: 'daily',
    priority: 'medium',
    icon: 'UtensilsCrossed',
    emotionalTone: 'gentle'
  },
  
  // Safety Needs
  {
    id: '4',
    title: 'Doctor Appointment',
    description: 'Annual check-up with Dr. Johnson at City Medical Center',
    category: 'safety',
    time: '14:00',
    frequency: 'once',
    priority: 'high',
    icon: 'Stethoscope',
    emotionalTone: 'neutral'
  },
  {
    id: '5',
    title: 'Balance Exercise',
    description: 'Practice your tai chi moves to stay strong and prevent falls',
    category: 'safety',
    time: '16:00',
    frequency: 'daily',
    priority: 'medium',
    icon: 'Activity',
    emotionalTone: 'encouraging'
  },
  
  // Love & Belonging
  {
    id: '6',
    title: 'Call Sarah',
    description: 'Give your daughter Sarah a call to catch up on her week',
    category: 'love-belonging',
    time: '19:00',
    frequency: 'weekly',
    priority: 'medium',
    icon: 'Phone',
    emotionalTone: 'encouraging'
  },
  {
    id: '7',
    title: 'Community Center Visit',
    description: 'Join the weekly book club meeting - they\'re discussing mysteries this week!',
    category: 'love-belonging',
    time: '15:00',
    frequency: 'weekly',
    priority: 'low',
    icon: 'Users',
    emotionalTone: 'celebratory'
  },
  
  // Esteem
  {
    id: '8',
    title: 'Garden Achievement',
    description: 'You\'ve watered your plants for 7 days straight! Your garden looks beautiful.',
    category: 'esteem',
    time: '09:00',
    frequency: 'once',
    priority: 'low',
    icon: 'Award',
    emotionalTone: 'celebratory'
  },
  
  // Self-Actualization
  {
    id: '9',
    title: 'Art Class Online',
    description: 'Time for your watercolor painting lesson - express your creativity!',
    category: 'self-actualization',
    time: '11:00',
    frequency: 'weekly',
    priority: 'low',
    icon: 'Palette',
    emotionalTone: 'encouraging'
  }
];

export const userProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Margaret Thompson',
    type: 'independent',
    preferences: {
      fontSize: 'large',
      voiceEnabled: true,
      notifications: true,
      caregiverAccess: true
    },
    achievements: [
      {
        id: '1',
        title: 'Consistent Walker',
        description: 'Walked every day for a week',
        icon: 'Trophy',
        dateEarned: '2024-01-15'
      },
      {
        id: '2',
        title: 'Social Butterfly',
        description: 'Connected with 5 friends this month',
        icon: 'Heart',
        dateEarned: '2024-01-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Robert Chen',
    type: 'active',
    preferences: {
      fontSize: 'normal',
      voiceEnabled: false,
      notifications: true,
      caregiverAccess: false
    },
    achievements: [
      {
        id: '3',
        title: 'Fitness Champion',
        description: 'Completed 30 exercise sessions',
        icon: 'Zap',
        dateEarned: '2024-01-25'
      }
    ]
  },
  {
    id: '3',
    name: 'Eleanor Williams',
    type: 'family-supported',
    preferences: {
      fontSize: 'extra-large',
      voiceEnabled: true,
      notifications: true,
      caregiverAccess: true
    },
    achievements: [
      {
        id: '4',
        title: 'Creative Soul',
        description: 'Attended 10 art classes',
        icon: 'Star',
        dateEarned: '2024-01-18'
      }
    ]
  }
];