import apiClient from './client';
import { Complex, ComplexDetail, Apartment, ApartmentFilter } from '../types';

export interface City {
  id: string;
  name: string;
}

export async function getCities(): Promise<City[]> {
  return apiClient.get('/cities');
}

export async function getComplexes(params?: {
  city?: string;
  status?: string;
}): Promise<Complex[]> {
  return apiClient.get('/complexes', { params });
}

export async function getComplexById(id: string): Promise<ComplexDetail> {
  return apiClient.get(`/complexes/${id}`);
}

export async function getComplexApartments(
  complexId: string,
  filters?: ApartmentFilter,
): Promise<Apartment[]> {
  return apiClient.get(`/complexes/${complexId}/apartments`, {
    params: filters,
  });
}
