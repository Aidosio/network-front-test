import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Button from '../components/ui/Button';
import { H1, Body, BodySmall, Caption } from '../components/ui/Typography';
import { colors, spacing, borderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingSuccess'>;

export default function BookingSuccessScreen({ route, navigation }: Props) {
  const { applicationId } = route.params;

  const handleGoBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ComplexList' }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.checkCircle}>
            <Body color={colors.surface} style={styles.checkMark}>
              ✓
            </Body>
          </View>
        </View>

        <H1 style={styles.title}>Заявка отправлена!</H1>

        <View style={styles.idContainer}>
          <Caption>Номер заявки</Caption>
          <BodySmall style={styles.applicationId}>{applicationId}</BodySmall>
        </View>

        <Body style={styles.message}>
          Наш менеджер свяжется с вами в ближайшее время
        </Body>

        <Button
          title="Вернуться к списку ЖК"
          onPress={handleGoBack}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 36,
    fontWeight: '700',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  idContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    width: '100%',
  },
  applicationId: {
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});
