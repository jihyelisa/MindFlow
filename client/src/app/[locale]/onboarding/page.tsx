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

export default function OnboardingPage() {
  const router = useRouter();
  const t = useTranslations('onboarding');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save data to backend or local storage
    router.push('/saju/menu');
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
                    />
                  </Field>

                  <Field label={t('birthDate')} required>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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
