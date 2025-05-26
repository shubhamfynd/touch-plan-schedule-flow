import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { DailyCalendar } from '@/components/DailyCalendar';
import { BottomNavigation } from '@/components/BottomNavigation';
import { UserSelector } from '@/components/UserSelector';

const Index = () => {
  const [tab, setTab] = useState<'my' | 'team'>('my');
  const [selectedUser, setSelectedUser] = useState('current');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 px-4 py-4 pb-20">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'my' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
            onClick={() => { setTab('my'); setSelectedUser('current'); }}
          >
            My Schedule
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'team' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
            onClick={() => setTab('team')}
          >
            Team Schedule
          </button>
        </div>
        {tab === 'team' && (
          <div className="mb-4">
            <UserSelector selectedUser={selectedUser} onUserChange={setSelectedUser} hideCurrentOption placeholder="Select Member" />
          </div>
        )}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 my-4 shadow-sm">
          <div className="flex items-center mb-2">
            <span className="text-indigo-700 font-semibold mr-2">AI Insights</span>
            <span className="text-xs text-indigo-400 bg-indigo-100 rounded px-2 py-0.5 ml-2">Beta</span>
          </div>
          <div className="text-sm text-indigo-900">
            Here you'll see smart suggestions and highlights to help you prepare for your day. (e.g., "You have 2 back-to-back meetings this morning. Don't forget to bring your testing equipment for the 10:30 AM appointment.")
          </div>
        </div>
        <DailyCalendar selectedUser={selectedUser} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
