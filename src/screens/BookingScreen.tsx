import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ApplicationType, CreateApplicationDto } from '../types';
import { createApplication } from '../api/applicationApi';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import { H3, Body, BodySmall, Caption } from '../components/ui/Typography';
import { colors, spacing, borderRadius, typography } from '../theme';
import { formatPrice } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

const applicationTypes: { label: string; value: ApplicationType }[] = [
  { label: 'Консультация', value: 'inquiry' },
  { label: 'Бронирование', value: 'booking' },
  { label: 'Покупка', value: 'purchase' },
];

export default function BookingScreen({ route, navigation }: Props) {
  const { apartmentId, apartmentNumber, price } = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');

  const handlePhoneChange = (text: string) => {
    setPhoneDigits(text.replace(/\D/g, '').slice(0, 10));
  };
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [applicationType, setApplicationType] =
    useState<ApplicationType>('booking');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    if (!phoneDigits) {
      newErrors.phone = 'Введите номер телефона';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Номер телефона должен содержать 10 цифр';
    }
    if (!email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Некорректный формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const dto: CreateApplicationDto = {
        apartmentId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: '+7' + phoneDigits,
        email: email.trim(),
        type: applicationType,
        comment: comment.trim() || undefined,
      };

      const result = await createApplication(dto);
      navigation.navigate('BookingSuccess', {
        applicationId: result.id,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Произошла ошибка';
      Alert.alert('Ошибка', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Card style={styles.apartmentInfo}>
        <BodySmall>Квартира</BodySmall>
        <H3>№ {apartmentNumber}</H3>
        <Body color={colors.primary}>{formatPrice(price)} ₸</Body>
      </Card>

      <Card style={styles.formCard}>
        <H3 style={styles.formTitle}>Контактные данные</H3>

        <Input
          label="Имя *"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Введите имя"
          error={errors.firstName}
        />

        <Input
          label="Фамилия *"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Введите фамилию"
          error={errors.lastName}
        />

        <View style={styles.phoneContainer}>
          <Text style={styles.phoneLabel}>Телефон *</Text>
          <View style={[styles.phoneRow, errors.phone ? styles.phoneRowError : null]}>
            <Text style={styles.phonePrefix}>+7</Text>
            <TextInput
              style={styles.phoneInput}
              value={phoneDigits}
              onChangeText={handlePhoneChange}
              placeholder="7XX XXX XX XX"
              maxLength={10}
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
            />
          </View>
          {errors.phone ? <Text style={styles.phoneError}>{errors.phone}</Text> : null}
        </View>

        <Input
          label="Email *"
          value={email}
          onChangeText={setEmail}
          placeholder="example@mail.com"
          keyboardType="email-address"
          error={errors.email}
        />

        <Divider />

        <Caption style={styles.typeLabel}>Тип заявки</Caption>
        <View style={styles.typeRow}>
          {applicationTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.typeButton,
                applicationType === type.value && styles.typeButtonActive,
              ]}
              onPress={() => setApplicationType(type.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  applicationType === type.value &&
                    styles.typeButtonTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Комментарий"
          value={comment}
          onChangeText={setComment}
          placeholder="Дополнительная информация..."
          multiline
        />

        <Button
          title="Отправить заявку"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  apartmentInfo: {
    marginBottom: spacing.md,
  },
  formCard: {
    marginBottom: spacing.md,
  },
  formTitle: {
    marginBottom: spacing.md,
  },
  typeLabel: {
    marginBottom: spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  phoneContainer: {
    marginBottom: spacing.md,
  },
  phoneLabel: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
  },
  phoneRowError: {
    borderColor: colors.error,
  },
  phonePrefix: {
    ...typography.body,
    color: colors.text,
    paddingLeft: spacing.md,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm + 2,
  },
  phoneError: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
