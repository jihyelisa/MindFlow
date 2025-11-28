'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  SimpleGrid,
  Button,
  Textarea,
  Text,
  Card,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from '@/navigation';
import { toaster } from '@/components/ui/toaster';
import { useTranslations } from 'next-intl';

export default function CheckInPage() {
  const router = useRouter();
  const t = useTranslations('checkin');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [memo, setMemo] = useState('');

  const emotions = [
    { emoji: '😊', label: t('emotions.happy'), key: 'happy', color: 'yellow' },
    { emoji: '😢', label: t('emotions.sad'), key: 'sad', color: 'blue' },
    { emoji: '😠', label: t('emotions.angry'), key: 'angry', color: 'red' },
    { emoji: '😰', label: t('emotions.anxious'), key: 'anxious', color: 'purple' },
    { emoji: '😌', label: t('emotions.calm'), key: 'calm', color: 'green' },
    { emoji: '😴', label: t('emotions.tired'), key: 'tired', color: 'gray' },
    { emoji: '🤗', label: t('emotions.grateful'), key: 'grateful', color: 'pink' },
    { emoji: '😔', label: t('emotions.depressed'), key: 'depressed', color: 'cyan' },
  ];

  const handleSubmit = () => {
    if (!selectedEmotion) {
      toaster.create({
        title: t('selectEmotion'),
        type: 'warning',
        duration: 2000,
      });
      return;
    }

    toaster.create({
      title: t('analyzing'),
      type: 'info',
      duration: 1500,
    });

    setTimeout(() => {
      router.push('/insight');
    }, 1500);
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="2xl">
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading size="xl">{t('title')}</Heading>
            <Text color="gray.600">{today}</Text>
          </Stack>

          <Card.Root>
            <Card.Body>
              <Stack gap={6}>
                <Box w="full">
                  <Text fontWeight="bold" mb={4}>
                    {t('emotionQuestion')}
                  </Text>
                  <SimpleGrid columns={4} gap={4}>
                    {emotions.map((emotion) => (
                      <Button
                        key={emotion.key}
                        h="100px"
                        flexDirection="column"
                        gap={2}
                        colorPalette={emotion.color}
                        variant={selectedEmotion === emotion.key ? 'solid' : 'outline'}
                        onClick={() => setSelectedEmotion(emotion.key)}
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                        transition="all 0.2s"
                      >
                        <Text fontSize="3xl">{emotion.emoji}</Text>
                        <Text fontSize="sm">{emotion.label}</Text>
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                <Box w="full">
                  <Text fontWeight="bold" mb={2}>
                    {t('memoLabel')}
                  </Text>
                  <Textarea
                    placeholder={t('memoPlaceholder')}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    rows={4}
                  />
                </Box>

                <Button
                  colorPalette="purple"
                  size="lg"
                  w="full"
                  onClick={handleSubmit}
                >
                  {t('submit')}
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Container>
    </Box>
  );
}
