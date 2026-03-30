import apiClient from './client';
import { ApartmentDetail } from '../types';

export async function getApartmentById(id: string): Promise<ApartmentDetail> {
  return apiClient.get(`/apartments/${id}`);
}
