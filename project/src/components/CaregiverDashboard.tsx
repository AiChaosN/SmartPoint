import React from 'react';
import { Users, MessageCircle, Heart, Activity, Phone, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface CaregiverDashboardProps {
  profile: UserProfile | null;
}

export default function CaregiverDashboard({ profile }: CaregiverDashboardProps) {
  if (!profile) return null;

  const caregiverMessages = [
    { id: '1', message: 'Margaret completed all her morning medications ✓', time: '8:15 AM', type: 'success' },
    { id: '2', message: 'Reminder: Doctor appointment tomorrow at 2 PM', time: '9:30 AM', type: 'reminder' },
    { id: '3', message: 'Great job on the daily walk! 7 days in a row 🎉', time: '10:45 AM', type: 'celebration' }
  ];

  const healthStats = [
    { label: 'Medication Compliance', value: '95%', trend: 'up', color: 'text-green-600' },
    { label: 'Social Activities', value: '3 this week', trend: 'stable', color: 'text-blue-600' },
    { label: 'Exercise Sessions', value: '5 completed', trend: 'up', color: 'text-purple-600' },
    { label: 'Doctor Visits', value: '1 upcoming', trend: 'neutral', color: 'text-orange-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-50 rounded-full">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-800">Caregiver Dashboard</h2>
          <p className="text-gray-600">Monitoring {profile.name}'s wellbeing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Health & Wellness Overview
          </h3>
          <div className="space-y-3">
            {healthStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
            Recent Updates
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {caregiverMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                <div className={`p-2 rounded-full ${
                  message.type === 'success' ? 'bg-green-100' : 
                  message.type === 'celebration' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {message.type === 'success' ? (
                    <Heart className="w-4 h-4 text-green-600" />
                  ) : message.type === 'celebration' ? (
                    <Activity className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{message.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Phone className="w-5 h-5 mr-2" />
          Quick Call
        </button>
        <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Send Message
        </button>
        <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Add Reminder
        </button>
      </div>
    </div>
  );
}