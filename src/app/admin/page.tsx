'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LogOut, CheckCircle, XCircle, Clock, Calendar, MapPin, User, FileText } from 'lucide-react';
import { IBooking } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminPage() {
  const { data: bookings, error, mutate } = useSWR<IBooking[]>('/api/bookings', fetcher, { refreshInterval: 10000 });
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Logged out successfully');
        router.push('/login');
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (res.ok) {
        toast.success(`Booking ${status}`);
        mutate(); // refresh data
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (error) return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Failed to load bookings</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800 shadow-sm sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight text-white">
          Edu<span className="text-amber-500">Nav</span> 
          <span className="text-sm font-normal text-neutral-400 ml-2 border-l border-neutral-700 pl-2">Admin Dashboard</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Booking Requests</h2>
          <p className="text-sm text-neutral-400">Manage all classroom reservations across the campus.</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
            <div className="text-neutral-500 text-sm font-medium mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-white">{bookings?.length || 0}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1 h-full bg-amber-500" />
            <div className="text-neutral-500 text-sm font-medium mb-1">Pending</div>
            <div className="text-3xl font-bold text-amber-500">{bookings?.filter(b => b.status === 'pending').length || 0}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1 h-full bg-emerald-500" />
            <div className="text-neutral-500 text-sm font-medium mb-1">Approved</div>
            <div className="text-3xl font-bold text-emerald-500">{bookings?.filter(b => b.status === 'approved').length || 0}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1 h-full bg-rose-500" />
            <div className="text-neutral-500 text-sm font-medium mb-1">Rejected</div>
            <div className="text-3xl font-bold text-rose-500">{bookings?.filter(b => b.status === 'rejected').length || 0}</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
          {!bookings ? (
            <div className="p-8 text-center text-neutral-500">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">No bookings found.</div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {bookings.map((booking) => (
                <div key={booking._id?.toString()} className="p-5 hover:bg-neutral-800/50 transition-colors flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  
                  {/* Info Section */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Primary Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-neutral-800 text-white rounded-md text-sm font-semibold shadow-sm border border-neutral-700">
                          {booking.classroomName}
                        </span>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                          booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          booking.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        }`}>
                          {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                          {booking.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                          {booking.status === 'rejected' && <XCircle className="w-3 h-3" />}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 text-sm">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <User className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-300">{booking.teacherName}</span>
                          <span className="text-neutral-600">({booking.teacherEmail})</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Calendar className="w-4 h-4 text-neutral-500" />
                          <span>{new Date(booking.date).toLocaleDateString()} • {booking.startTime} to {booking.endTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Info */}
                    <div className="space-y-2 flex flex-col justify-center">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-neutral-500 text-xs mb-0.5">Purpose</div>
                          <div className="text-neutral-300 leading-relaxed">{booking.purpose}</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Actions Section */}
                  <div className="shrink-0 flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking._id!.toString(), 'approved')}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id!.toString(), 'rejected')}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-rose-500 border border-neutral-700 hover:border-rose-500/50 text-sm font-medium rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status !== 'pending' && (
                       <button
                       onClick={() => handleStatusUpdate(booking._id!.toString(), 'pending')}
                       className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700 text-sm font-medium rounded-lg transition-colors"
                     >
                       <Clock className="w-4 h-4" />
                       Set Pending
                     </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
