
import React from 'react';
import { format } from 'date-fns';
import { AppointmentBlock } from './AppointmentBlock';
import { getAppointmentsForUser } from '@/data/mockData';

interface DailyCalendarProps {
  selectedUser: string;
}

export const DailyCalendar: React.FC<DailyCalendarProps> = ({ selectedUser }) => {
  const today = new Date();
  const appointments = getAppointmentsForUser(selectedUser);
  
  // Generate time slots from 8 AM to 8 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 20) timeSlots.push(`${hour}:30`);
  }

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => {
      const [hours, minutes] = time.split(':').map(Number);
      const slotTime = hours * 60 + minutes;
      const [startHours, startMinutes] = apt.startTime.split(':').map(Number);
      const startTime = startHours * 60 + startMinutes;
      const [endHours, endMinutes] = apt.endTime.split(':').map(Number);
      const endTime = endHours * 60 + endMinutes;
      
      return slotTime >= startTime && slotTime < endTime;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(today, 'EEEE, MMM d, yyyy')}
        </h2>
        <p className="text-sm text-gray-500">Today's Schedule</p>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {timeSlots.map((time, index) => {
            const appointment = getAppointmentForTime(time);
            const isHalfHour = time.includes(':30');
            
            return (
              <div key={time} className="flex items-center">
                <div className="w-16 text-sm text-gray-500 font-medium">
                  {!isHalfHour ? time : ''}
                </div>
                <div className="flex-1 ml-4 h-8 relative">
                  {!isHalfHour && (
                    <div className="absolute inset-x-0 top-0 border-t border-gray-100"></div>
                  )}
                  {appointment && time === appointment.startTime && (
                    <AppointmentBlock appointment={appointment} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
