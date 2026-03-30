import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../../src/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>Содержимое карточки</Text>
      </Card>,
    );
    expect(getByText('Содержимое карточки')).toBeTruthy();
  });

  it('calls onPress when pressed (if provided)', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPressMock}>
        <Text>Нажми</Text>
      </Card>,
    );
    fireEvent.press(getByTestId('card'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders as non-pressable when onPress is not provided', () => {
    const { getByTestId } = render(
      <Card>
        <Text>Статичная карточка</Text>
      </Card>,
    );
    const card = getByTestId('card');
    expect(card).toBeTruthy();
  });
});
