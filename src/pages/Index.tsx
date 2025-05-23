import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { DailyCalendar } from '@/components/DailyCalendar';
import { QuickActions } from '@/components/QuickActions';
import { BottomNavigation } from '@/components/BottomNavigation';
import { UserSelector } from '@/components/UserSelector';

const Index = () => {
  const [selectedUser, setSelectedUser] = useState('current');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 px-4 py-4 pb-20">
        <UserSelector selectedUser={selectedUser} onUserChange={setSelectedUser} />
        <DailyCalendar selectedUser={selectedUser} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
