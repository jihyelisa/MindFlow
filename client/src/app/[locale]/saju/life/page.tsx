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
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { sajuApi, ApiError } from '@/lib/api';
import { SajuReading } from '@/types';

export default function LifeFlowPage() {
  const router = useRouter();
  const t = useTranslations('sajuResult');
  const [reading, setReading] = useState<SajuReading | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReading = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          router.push('/onboarding');
          return;
        }

        const data = await sajuApi.getReading(userId, 'life');
        setReading(data);
      } catch (err) {
        console.error('Error fetching reading:', err);
        if (err instanceof ApiError && err.statusCode === 404) {
          setError(t('life.noReading') || 'No reading available yet');
        } else {
          setError(t('life.errorLoading') || 'Failed to load reading');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReading();
  }, [router, t]);

  if (isLoading) {
    return (
      <Box minH="100vh" bgGradient="to-br" gradientFrom="purple.50" gradientTo="blue.50" py={12}>
        <Container maxW="6xl">
          <Stack gap={8} align="center" justify="center" minH="60vh">
            <Spinner size="xl" color="purple.500" />
            <Text color="gray.600">{t('loading') || 'Loading...'}</Text>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (error || !reading) {
    return (
      <Box minH="100vh" bgGradient="to-br" gradientFrom="purple.50" gradientTo="blue.50" py={12}>
        <Container maxW="6xl">
          <Stack gap={8}>
            <Heading size="xl">{t('life.title')}</Heading>
            <Card.Root>
              <Card.Body>
                <Stack gap={4} align="center" py={8}>
                  <Text fontSize="4xl">⚠️</Text>
                  <Text color="gray.600">{error}</Text>
                  <Button colorPalette="purple" onClick={() => router.push('/saju/menu')}>
                    {t('backToMenu')}
                  </Button>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bgGradient="to-br" gradientFrom="purple.50" gradientTo="blue.50" py={12}>
      <Container maxW="6xl">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="xl">{t('life.title')}</Heading>
            <Text color="gray.600">{t('life.subtitle')}</Text>
          </Stack>

          <Card.Root
            borderTop="4px solid"
            borderColor="purple.400"
            shadow="lg"
            borderRadius="2xl"
          >
            <Card.Header>
              <Stack gap={2} align="start">
                <Badge colorPalette="purple">{t('life.badge')}</Badge>
                <Heading size="md">{t('life.fortuneTitle')}</Heading>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Stack gap={4} align="start">
                <Box>
                  <Text fontSize="4xl" mb={2}>
                    ✨
                  </Text>
                  <Text fontWeight="bold" mb={2}>
                    {reading.content.fortuneLevel}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {reading.content.fortuneDescription}
                  </Text>
                </Box>
                <Separator />
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    {t('life.adviceTitle')}
                  </Text>
                  <Text color="gray.600" fontSize="sm" whiteSpace="pre-line">
                    {reading.content.advice}
                  </Text>
                </Box>
                {reading.content.luckyColor && (
                  <>
                    <Separator />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" mb={2}>
                        {t('life.luckyColor') || 'Lucky Color'}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {reading.content.luckyColor}
                      </Text>
                    </Box>
                  </>
                )}
                {reading.content.warning && (
                  <>
                    <Separator />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" mb={2} color="red.500">
                        {t('life.warning') || 'Warning'}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {reading.content.warning}
                      </Text>
                    </Box>
                  </>
                )}
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

