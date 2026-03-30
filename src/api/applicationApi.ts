import apiClient from './client';
import { Application, CreateApplicationDto } from '../types';

export async function createApplication(
  data: CreateApplicationDto,
): Promise<{ id: string; status: string; createdAt: string }> {
  return apiClient.post('/applications', data);
}

export async function getApplicationById(id: string): Promise<Application> {
  return apiClient.get(`/applications/${id}`);
}
