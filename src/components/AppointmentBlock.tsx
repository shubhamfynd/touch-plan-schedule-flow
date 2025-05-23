
import React from 'react';
import { Calendar, Store } from 'lucide-react';

export interface Appointment {
  id: string;
  title: string;
  type: 'customer' | 'task';
  startTime: string;
  endTime: string;
  customer?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface AppointmentBlockProps {
  appointment: Appointment;
}

export const AppointmentBlock: React.FC<AppointmentBlockProps> = ({ appointment }) => {
  const getDuration = () => {
    const [startHours, startMinutes] = appointment.startTime.split(':').map(Number);
    const [endHours, endMinutes] = appointment.endTime.split(':').map(Number);
    const durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    return Math.max(durationMinutes / 30, 1); // Minimum 1 slot height
  };

  const getAppointmentStyles = () => {
    if (appointment.type === 'customer') {
      return {
        bg: 'bg-blue-100 border-blue-300',
        text: 'text-blue-900',
        icon: 'text-blue-600'
      };
    } else {
      return {
        bg: 'bg-purple-100 border-purple-300',
        text: 'text-purple-900',
        icon: 'text-purple-600'
      };
    }
  };

  const styles = getAppointmentStyles();
  const duration = getDuration();

  return (
    <div 
      className={`${styles.bg} border-l-4 rounded-r-lg p-3 ${styles.text} relative`}
      style={{ height: `${duration * 2}rem` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {appointment.type === 'customer' ? (
              <Store className={`w-4 h-4 ${styles.icon}`} />
            ) : (
              <Calendar className={`w-4 h-4 ${styles.icon}`} />
            )}
            <span className="font-medium text-sm">{appointment.title}</span>
          </div>
          
          <div className="text-xs opacity-75 mb-1">
            {appointment.startTime} - {appointment.endTime}
          </div>
          
          {appointment.customer && (
            <div className="text-xs opacity-75">
              Customer: {appointment.customer}
            </div>
          )}
          
          {appointment.description && (
            <div className="text-xs opacity-75 mt-1">
              {appointment.description}
            </div>
          )}
        </div>
        
        {appointment.priority && appointment.priority !== 'low' && (
          <div className={`w-2 h-2 rounded-full ${
            appointment.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
        )}
      </div>
    </div>
  );
};
