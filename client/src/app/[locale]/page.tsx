'use client';

import { Box, Container, Heading, Stack, SimpleGrid, Card, Text, Button } from '@chakra-ui/react';
import { useRouter } from '@/navigation';
import { FiUser, FiHeart, FiBarChart2, FiClock } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter();
  const t = useTranslations('home');

  const pages = [
    {
      title: t('onboarding.title'),
      description: t('onboarding.description'),
      icon: FiUser,
      path: '/onboarding',
      color: 'purple',
    },
    {
      title: t('checkin.title'),
      description: t('checkin.description'),
      icon: FiHeart,
      path: '/check-in',
      color: 'pink',
    },
    {
      title: t('insight.title'),
      description: t('insight.description'),
      icon: FiBarChart2,
      path: '/insight',
      color: 'blue',
    },
    {
      title: t('history.title'),
      description: t('history.description'),
      icon: FiClock,
      path: '/history',
      color: 'cyan',
    },
  ];

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="6xl">
        <Stack gap={12}>
          <Stack gap={4} textAlign="center">
            <Heading size="2xl" bgGradient="to-r" gradientFrom="purple.400" gradientTo="pink.400" bgClip="text">
              {t('title')}
            </Heading>
            <Text fontSize="xl" color="gray.600">
              {t('subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
            {pages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Card.Root
                  key={page.path}
                  _hover={{ transform: 'translateY(-4px)' }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => router.push(page.path)}
                >
                  <Card.Body>
                    <Stack gap={4} align="start">
                      <Box color={`${page.color}.400`}>
                        <IconComponent size={48} />
                      </Box>
                      <Stack gap={2} align="start">
                        <Heading size="md">{page.title}</Heading>
                        <Text color="gray.600">{page.description}</Text>
                      </Stack>
                      <Button variant="ghost" colorPalette={page.color}>
                        {t('goTo')} →
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </SimpleGrid>

          <Box textAlign="center" pt={8}>
            <Text fontSize="sm" color="gray.500">
              {t('copyright')}
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
