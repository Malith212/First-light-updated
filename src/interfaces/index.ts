export interface UserType {
  _id: string;
  name: string;
  email: string;
  clerkUserId: string;
  profilePic: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VillaType {
  _id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomType {
  _id: string;
  name: string;
  villa: VillaType;
  rentPerDay: number;
  type: string;
  roomNumber: number;
  beds: number;
  amenities: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingType {
  _id: string;
  user: UserType;
  room: RoomType;
  villa: VillaType;
  checkInDate: string;
  checkOutDate: string;
  totalDays: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  paymentId: string;
  bookingStatus: "Booked" | "Cancelled";
}
