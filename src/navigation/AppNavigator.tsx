import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, typography } from '../theme';

import ComplexListScreen from '../screens/ComplexListScreen';
import ComplexDetailScreen from '../screens/ComplexDetailScreen';
import ApartmentDetailScreen from '../screens/ApartmentDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          ...typography.h3,
          color: colors.text,
        },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="ComplexList"
        component={ComplexListScreen}
        options={{ title: 'Жилые комплексы' }}
      />
      <Stack.Screen
        name="ComplexDetail"
        component={ComplexDetailScreen}
        options={({ route }) => ({ title: route.params.complexName })}
      />
      <Stack.Screen
        name="ApartmentDetail"
        component={ApartmentDetailScreen}
        options={{ title: 'Квартира' }}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: 'Оформление заявки' }}
      />
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
