import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ComplexListScreen from '../../src/screens/ComplexListScreen';
import * as complexApi from '../../src/api/complexApi';
import { Complex } from '../../src/types';

// Mock the API
jest.mock('../../src/api/complexApi');
const mockedGetComplexes = complexApi.getComplexes as jest.MockedFunction<
  typeof complexApi.getComplexes
>;

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  getId: jest.fn(),
} as any;

const mockRoute = {
  key: 'ComplexList',
  name: 'ComplexList' as const,
  params: undefined,
};

const mockComplexes: Complex[] = [
  {
    id: '1',
    name: 'ЖК Алатау',
    description: 'Описание',
    address: 'ул. Абая 1',
    city: 'Алматы',
    imageUrl: null,
    developer: 'Застройщик А',
    completionDate: '2025-12-01',
    status: 'selling',
    minPrice: 15000000,
    maxPrice: 45000000,
    availableCount: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'ЖК Нурсат',
    description: null,
    address: 'пр. Назарбаева 50',
    city: 'Астана',
    imageUrl: null,
    developer: 'Застройщик Б',
    completionDate: null,
    status: 'under_construction',
    minPrice: 20000000,
    maxPrice: 60000000,
    availableCount: 30,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

describe('ComplexListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    mockedGetComplexes.mockReturnValue(new Promise(() => {})); // Never resolves
    const { getByTestId } = render(
      <ComplexListScreen navigation={mockNavigation} route={mockRoute} />,
    );
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders list of complexes after data loads', async () => {
    mockedGetComplexes.mockResolvedValue(mockComplexes);
    const { getByText } = render(
      <ComplexListScreen navigation={mockNavigation} route={mockRoute} />,
    );

    await waitFor(() => {
      expect(getByText('ЖК Алатау')).toBeTruthy();
      expect(getByText('ЖК Нурсат')).toBeTruthy();
    });
  });

  it('shows error state with retry button on API failure', async () => {
    mockedGetComplexes.mockRejectedValue(new Error('Ошибка сети'));
    const { getByText } = render(
      <ComplexListScreen navigation={mockNavigation} route={mockRoute} />,
    );

    await waitFor(() => {
      expect(getByText('Ошибка сети')).toBeTruthy();
      expect(getByText('Повторить')).toBeTruthy();
    });
  });
});
