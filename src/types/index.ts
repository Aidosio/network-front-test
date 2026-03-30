export type ComplexStatus = 'under_construction' | 'completed' | 'selling';
export type ApartmentStatus = 'available' | 'reserved' | 'sold';
export type BuildingStatus = 'under_construction' | 'completed';
export type ApplicationType = 'inquiry' | 'booking' | 'purchase';
export type ApplicationStatus = 'new' | 'in_progress' | 'approved' | 'rejected' | 'cancelled';

export interface Complex {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  imageUrl: string | null;
  developer: string;
  completionDate: string | null;
  status: ComplexStatus;
  minPrice: number | null;
  maxPrice: number | null;
  availableCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ComplexDetail extends Complex {
  buildings: Building[];
}

export interface Building {
  id: string;
  name: string;
  floors: number;
  status: BuildingStatus;
}

export interface Apartment {
  id: string;
  buildingId: string;
  buildingName: string;
  number: string;
  floor: number;
  rooms: number;
  area: number;
  price: number;
  status: ApartmentStatus;
  layout: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface BuildingDetail extends Building {
  complex?: { id: string; name: string; address: string; developer: string };
}

export interface ApartmentDetail extends Apartment {
  building: BuildingDetail;
}

export interface Application {
  id: string;
  apartmentId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: ApplicationType;
  status: ApplicationStatus;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationDto {
  apartmentId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: ApplicationType;
  comment?: string;
}

export interface ApartmentFilter {
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  floor?: number;
  status?: ApartmentStatus;
  buildingId?: string;
}

// Navigation types
export type RootStackParamList = {
  ComplexList: undefined;
  ComplexDetail: { complexId: string; complexName: string };
  ApartmentDetail: { apartmentId: string };
  Booking: { apartmentId: string; apartmentNumber: string; price: number };
  BookingSuccess: { applicationId: string };
};
