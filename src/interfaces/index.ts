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
