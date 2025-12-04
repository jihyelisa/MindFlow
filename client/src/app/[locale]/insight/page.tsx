'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Button,
  Badge,
  Separator,
} from '@chakra-ui/react';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function InsightPage() {
  const router = useRouter();
  const t = useTranslations('insight');

  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="6xl">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="xl">{t('title')}</Heading>
            <Text color="gray.600">{today}</Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} w="full">
            {/* Emotion Report Card */}
            <Card.Root
              borderTop="4px solid"
              borderColor="blue.400"
              _hover={{ transform: 'translateY(-4px)' }}
              transition="all 0.3s"
            >
              <Card.Header>
                <Stack gap={2} align="start">
                  <Badge colorPalette="blue">{t('emotionReport.badge')}</Badge>
                  <Heading size="md">{t('emotionReport.title')}</Heading>
                </Stack>
              </Card.Header>
              <Card.Body>
                <Stack gap={4} align="start">
                  <Box>
                    <Text fontSize="4xl" mb={2}>
                      😊
                    </Text>
                    <Text fontWeight="bold" mb={2}>
                      {t('emotionReport.mainEmotion')}: 행복
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {t('emotionReport.description')}
                    </Text>
                  </Box>
                  <Separator />
                  <Box w="full">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                      {t('emotionReport.intensity')}
                    </Text>
                    <Box bg="blue.100" h="8px" borderRadius="full" overflow="hidden">
                      <Box bg="blue.400" h="full" w="75%" />
                    </Box>
                  </Box>
                </Stack>
              </Card.Body>
            </Card.Root>

            {/* Saju Insight Card */}
            <Card.Root
              borderTop="4px solid"
              borderColor="purple.400"
              _hover={{ transform: 'translateY(-4px)' }}
              transition="all 0.3s"
            >
              <Card.Header>
                <Stack gap={2} align="start">
                  <Badge colorPalette="purple">{t('sajuInsight.badge')}</Badge>
                  <Heading size="md">{t('sajuInsight.title')}</Heading>
                </Stack>
              </Card.Header>
              <Card.Body>
                <Stack gap={4} align="start">
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      {t('sajuInsight.fortune')}
                    </Text>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      {t('sajuInsight.description')}
                    </Text>
                  </Box>
                  <Separator />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                      {t('sajuInsight.lifestyleTips')}
                    </Text>
                    <Text color="gray.600" fontSize="sm" whiteSpace="pre-line">
                      {t('sajuInsight.tips')}
                    </Text>
                  </Box>
                </Stack>
              </Card.Body>
            </Card.Root>

            {/* Combined Insight Card */}
            <Card.Root
              borderTop="4px solid"
              borderColor="pink.400"
              _hover={{ transform: 'translateY(-4px)' }}
              transition="all 0.3s"
            >
              <Card.Header>
                <Stack gap={2} align="start">
                  <Badge colorPalette="pink">{t('combinedInsight.badge')}</Badge>
                  <Heading size="md">{t('combinedInsight.title')}</Heading>
                </Stack>
              </Card.Header>
              <Card.Body>
                <Stack gap={4} align="start">
                  <Box>
                    <Text fontWeight="bold" mb={2} color="pink.600">
                      {t('combinedInsight.coreMessage')}
                    </Text>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      {t('combinedInsight.description')}
                    </Text>
                  </Box>
                  <Separator />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                      {t('combinedInsight.recommendations')}
                    </Text>
                    <Text color="gray.600" fontSize="sm" whiteSpace="pre-line">
                      {t('combinedInsight.activities')}
                    </Text>
                  </Box>
                </Stack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full" mt={4}>
            <Button
              size="lg"
              variant="outline"
              colorPalette="purple"
              onClick={() => router.push('/history')}
            >
              {t('viewHistory')}
            </Button>
            <Button
              size="lg"
              colorPalette="purple"
              onClick={() => router.push('/check-in')}
            >
              {t('newCheckin')}
            </Button>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
