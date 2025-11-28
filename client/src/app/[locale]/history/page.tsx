'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Card,
  Text,
  Badge,
  HStack,
  Button,
  Separator,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

// Mock data for demonstration
const emotionHistory = [
  { date: '11/20', emotion: '행복', intensity: 75, emoji: '😊' },
  { date: '11/21', emotion: '평온', intensity: 60, emoji: '😌' },
  { date: '11/22', emotion: '슬픔', intensity: 40, emoji: '😢' },
  { date: '11/23', emotion: '행복', intensity: 80, emoji: '😊' },
  { date: '11/24', emotion: '불안', intensity: 45, emoji: '😰' },
  { date: '11/25', emotion: '행복', intensity: 70, emoji: '😊' },
  { date: '11/26', emotion: '평온', intensity: 65, emoji: '😌' },
];

const chartData = emotionHistory.map((item) => ({
  date: item.date,
  intensity: item.intensity,
}));

export default function HistoryPage() {
  const router = useRouter();
  const t = useTranslations('history');

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="6xl">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="xl">{t('title')}</Heading>
            <Text color="gray.600">{t('subtitle')}</Text>
          </Stack>

          {/* Chart Section */}
          <Card.Root>
            <Card.Body>
              <Stack gap={4} align="start">
                <Heading size="md">{t('weeklyChart')}</Heading>
                <Box w="full" h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="intensity"
                        stroke="#9F7AEA"
                        strokeWidth={3}
                        dot={{ fill: '#9F7AEA', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                <Text fontSize="sm" color="gray.600">
                  {t('chartNote')}
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Timeline Section */}
          <Card.Root>
            <Card.Body>
              <Stack gap={4} align="start">
                <Heading size="md">{t('timeline')}</Heading>
                <Stack w="full" gap={4}>
                  {emotionHistory.reverse().map((record, index) => (
                    <Box key={index}>
                      <HStack justify="space-between" align="start">
                        <HStack gap={4}>
                          <Text fontSize="3xl">{record.emoji}</Text>
                          <Stack gap={1} align="start">
                            <HStack>
                              <Badge colorPalette="purple">{record.date}</Badge>
                              <Text fontWeight="bold">{record.emotion}</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {t('intensity')}: {record.intensity}%
                            </Text>
                          </Stack>
                        </HStack>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorPalette="purple"
                          onClick={() => router.push('/insight')}
                        >
                          {t('viewDetails')}
                        </Button>
                      </HStack>
                      {index < emotionHistory.length - 1 && <Separator mt={4} />}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Button
            size="lg"
            colorPalette="purple"
            w="full"
            onClick={() => router.push('/check-in')}
          >
            {t('newCheckin')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
