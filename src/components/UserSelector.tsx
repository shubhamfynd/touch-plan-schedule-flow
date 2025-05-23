
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const users = [
  { id: 'current', name: 'My Schedule', role: 'Store Associate' },
  { id: 'sarah', name: 'Sarah Johnson', role: 'Store Manager' },
  { id: 'mike', name: 'Mike Chen', role: 'Sales Associate' },
  { id: 'emma', name: 'Emma Davis', role: 'Inventory Specialist' },
];

interface UserSelectorProps {
  selectedUser: string;
  onUserChange: (userId: string) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({ selectedUser, onUserChange }) => {
  const currentUser = users.find(user => user.id === selectedUser);

  return (
    <div className="mb-6">
      <Select value={selectedUser} onValueChange={onUserChange}>
        <SelectTrigger className="w-full bg-white border-gray-200">
          <SelectValue>
            <div className="flex flex-col items-start">
              <span className="font-medium">{currentUser?.name}</span>
              <span className="text-sm text-gray-500">{currentUser?.role}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-500">{user.role}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
