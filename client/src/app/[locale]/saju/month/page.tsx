'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Card,
  Text,
  Button,
  Badge,
  Separator,
} from '@chakra-ui/react';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function MonthFortunePage() {
  const router = useRouter();
  const t = useTranslations('sajuResult');
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    setCurrentMonth(new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    }));
  }, []);

  return (
    <Box minH="100vh" bgGradient="to-br" gradientFrom="purple.50" gradientTo="blue.50" py={12}>
      <Container maxW="6xl">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="xl">{t('month.title')}</Heading>
            <Text color="gray.600">{currentMonth}</Text>
          </Stack>

          <Card.Root
            borderTop="4px solid"
            borderColor="blue.400"
            shadow="lg"
            borderRadius="2xl"
          >
            <Card.Header>
              <Stack gap={2} align="start">
                <Badge colorPalette="blue">{t('month.badge')}</Badge>
                <Heading size="md">{t('month.fortuneTitle')}</Heading>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Stack gap={4} align="start">
                <Box>
                  <Text fontSize="4xl" mb={2}>
                    🌙
                  </Text>
                  <Text fontWeight="bold" mb={2}>
                    {t('month.fortuneLevel')}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {t('month.fortuneDescription')}
                  </Text>
                </Box>
                <Separator />
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    {t('month.adviceTitle')}
                  </Text>
                  <Text color="gray.600" fontSize="sm" whiteSpace="pre-line">
                    {t('month.advice')}
                  </Text>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Stack direction="row" gap={4}>
            <Button
              variant="outline"
              colorPalette="purple"
              onClick={() => router.push('/saju/menu')}
            >
              {t('backToMenu')}
            </Button>
            <Button
              colorPalette="purple"
              onClick={() => router.push('/')}
            >
              {t('backToHome')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
