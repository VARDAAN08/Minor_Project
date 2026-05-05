import { ObjectId } from 'mongodb';

export interface IRoom {
  _id?: ObjectId;
  roomName: string;
  floor: number;
  occupied: boolean;
  capacity?: number | null;
}

export interface IBooking {
  _id?: ObjectId;
  classroomName: string;
  floor: number;
  teacherName: string;
  teacherEmail: string;
  date: Date;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
