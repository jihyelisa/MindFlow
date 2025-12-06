'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Input,
  Button,
  Text,
  Card,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from '@/navigation';
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select';
import { Field } from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import { userApi, ApiError } from '@/lib/api';
import { toaster } from '@/components/ui/toaster';

export default function OnboardingPage() {
  const router = useRouter();
  const t = useTranslations('onboarding');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await userApi.create({
        name: formData.name,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime || undefined,
        gender: formData.gender || undefined,
      });

      // Save user ID to localStorage
      localStorage.setItem('userId', user._id);

      toaster.create({
        title: t('successTitle') || 'Success',
        description: t('successMessage') || 'Your profile has been created',
        type: 'success',
      });

      router.push('/saju/menu');
    } catch (error) {
      console.error('Error creating user:', error);
      
      let errorMessage = t('errorMessage') || 'Failed to create profile';
      if (error instanceof ApiError) {
        errorMessage = error.details?.join(', ') || error.message;
      }

      toaster.create({
        title: t('errorTitle') || 'Error',
        description: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="md">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="2xl" bgGradient="to-r" gradientFrom="purple.400" gradientTo="pink.400" bgClip="text">
              {t('title')}
            </Heading>
            <Text color="gray.600">{t('subtitle')}</Text>
          </Stack>

          <Card.Root>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap={6}>
                  <Field label={t('name')} required>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('namePlaceholder')}
                      required
                    />
                  </Field>

                  <Field label={t('birthDate')} required>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      required
                    />
                  </Field>

                  <Field label={t('birthTime')}>
                    <Input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    />
                  </Field>

                  <Field label={t('gender')}>
                    <NativeSelectRoot>
                      <NativeSelectField
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        placeholder={t('genderPlaceholder')}
                      >
                        <option value="male">{t('male')}</option>
                        <option value="female">{t('female')}</option>
                        <option value="other">{t('other')}</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  <Button
                    type="submit"
                    colorPalette="purple"
                    size="lg"
                    w="full"
                    loading={isLoading}
                  >
                    {t('submit')}
                  </Button>

                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {t('privacyNote')}
                  </Text>
                </Stack>
              </form>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Container>
    </Box>
  );
}

