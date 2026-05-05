'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Lock, X, User, Mail, Calendar, Clock, MessageSquare, Loader2 } from 'lucide-react';

interface BookingModalProps {
  room: { id: string; name: string; floor: number } | null;
  onClose: () => void;
  onSuccess: () => void;
}

const floorMap: Record<number, string> = {
  [-1]: 'Basement',
  [0]: 'Ground',
  [1]: 'First',
  [2]: 'Second',
  [3]: 'Third',
  [4]: 'Fourth',
};

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BookingModal({ room, onClose, onSuccess }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = useSWR('/api/auth/session', fetcher);
  const isAuthenticated = session?.authenticated;

  const [formData, setFormData] = useState({
    teacherName: '',
    teacherEmail: session?.user?.email || '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (room) {
      setIsVisible(true);
      // Reset form when opening for a new room
      setFormData({
        teacherName: '',
        teacherEmail: session?.user?.email || '',
        date: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        purpose: '',
      });
    } else {
      setIsVisible(false);
    }
  }, [room, session]);

  if (!room) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.teacherName.length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    if (!formData.teacherEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    if (formData.endTime <= formData.startTime) {
      toast.error('End time must be after start time');
      return;
    }
    if (formData.purpose.length < 5) {
      toast.error('Purpose must be at least 5 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroomName: room.id,
          floor: room.floor,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Room booked successfully! Awaiting approval.');
        onSuccess();
        handleClose();
      } else if (response.status === 409) {
        toast.error('This room is already booked for that time slot');
      } else {
        toast.error(data.error || 'Failed to book room');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div 
        className={`w-full max-w-lg overflow-hidden transition-all duration-300 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
        style={{ 
          background: 'rgba(15,23,42,0.97)', 
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.1)'
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-[#ffd700] flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-[#ffd700] to-[#b8860b] rounded-full inline-block" />
            Book Classroom
          </h2>
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/50 hover:text-[#ffd700] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Lock size={32} className="text-[#ffd700]/70" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
              <p className="text-white/60">You must be logged in with a valid @juitsolan.in email to book classrooms.</p>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] hover:from-[#ffd700] hover:to-[#b8860b] text-slate-900 font-bold py-3 px-6 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all inline-flex justify-center items-center gap-2"
            >
              <User size={18} />
              Login to Book
            </button>
          </div>
        ) : (

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Read-only info cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 relative">
              <label className="text-[10px] uppercase tracking-widest text-[#ffd700]/70 font-bold block mb-1">Classroom</label>
              <div className="text-white font-bold flex items-center justify-between">
                {room.name}
                <Lock size={12} className="text-white/30" />
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 relative">
              <label className="text-[10px] uppercase tracking-widest text-[#ffd700]/70 font-bold block mb-1">Floor</label>
              <div className="text-white font-bold flex items-center justify-between">
                {floorMap[room.floor] || room.floor}
                <Lock size={12} className="text-white/30" />
              </div>
            </div>
          </div>

          {/* Teacher Inputs */}
          <div className="space-y-4">
            <div className="relative group">
              <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">Your Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffd700]/50 group-focus-within:text-[#ffd700] transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  placeholder="e.g. Dr. Satish Kumar"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">Your Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffd700]/50 group-focus-within:text-[#ffd700] transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.teacherEmail}
                  onChange={(e) => setFormData({ ...formData, teacherEmail: e.target.value })}
                  placeholder="name@university.edu"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffd700]/50 group-focus-within:text-[#ffd700] transition-colors" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="group">
                  <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">Start</label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">End</label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-white/70 block mb-1.5 ml-1">Purpose of Booking</label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3 top-4 text-[#ffd700]/50 group-focus-within:text-[#ffd700] transition-colors" />
                <textarea
                  required
                  rows={3}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Briefly describe the reason for booking..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ffd700]/50 transition-all placeholder:text-white/20 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] hover:from-[#ffd700] hover:to-[#b8860b] text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
