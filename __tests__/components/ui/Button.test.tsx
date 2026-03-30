import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../src/components/ui/Button';

describe('Button', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <Button title="Нажми меня" onPress={() => {}} />,
    );
    expect(getByText('Нажми меня')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Нажми" onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows ActivityIndicator when loading', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Нажми" onPress={() => {}} loading />,
    );
    expect(getByTestId('button-loading')).toBeTruthy();
    expect(queryByText('Нажми')).toBeNull();
  });

  it('disabled state prevents press', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Нажми" onPress={onPressMock} disabled />,
    );
    fireEvent.press(getByTestId('button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
