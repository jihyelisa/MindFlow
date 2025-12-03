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
      title: t('insight.title'),
      description: t('insight.description'),
      icon: FiBarChart2,
      path: '/insight',
      color: 'blue',
    },
    {
      title: t('checkin.title'),
      description: t('checkin.description'),
      icon: FiHeart,
      path: '/check-in',
      color: 'pink',
    },
  ];

  return (
    <Box minH="100vh" bgGradient="to-br" gradientFrom="purple.50" gradientTo="blue.50" py={20}>
      <Container maxW="6xl">
        <Stack gap={16}>
          <Stack gap={6} textAlign="center" align="center">
            <Heading 
              size="4xl" 
              bgGradient="to-r" 
              gradientFrom="purple.500" 
              gradientTo="pink.500" 
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {t('title')}
            </Heading>
            <Text fontSize="2xl" color="gray.600" maxW="2xl" lineHeight="tall">
              {t('subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full" maxW="4xl" mx="auto">
            {pages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Card.Root
                  key={page.path}
                  _hover={{ 
                    transform: 'translateY(-8px)', 
                    shadow: '2xl',
                    borderColor: `${page.color}.200`
                  }}
                  transition="all 0.3s ease-in-out"
                  cursor="pointer"
                  onClick={() => router.push(page.path)}
                  borderRadius="3xl"
                  shadow="lg"
                  bg="white/80"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="transparent"
                  overflow="hidden"
                >
                  <Card.Body p={8}>
                    <Stack gap={6} align="start">
                      <Box 
                        p={4} 
                        bg={`${page.color}.50`} 
                        color={`${page.color}.500`}
                        borderRadius="2xl"
                        shadow="sm"
                      >
                        <IconComponent size={32} />
                      </Box>
                      <Stack gap={3} align="start">
                        <Heading size="lg" fontWeight="bold" color="gray.800">
                          {page.title}
                        </Heading>
                        <Text color="gray.500" fontSize="lg" lineHeight="relaxed">
                          {page.description}
                        </Text>
                      </Stack>
                      <Button 
                        variant="ghost" 
                        colorPalette={page.color} 
                        size="lg"
                        fontWeight="bold"
                        px={0}
                        _hover={{ bg: 'transparent', color: `${page.color}.600` }}
                      >
                        {t('goTo')} <Box as="span" ml={2} transition="transform 0.2s" _groupHover={{ transform: 'translateX(4px)' }}>→</Box>
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </SimpleGrid>

          <Box textAlign="center" pt={12}>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              {t('copyright')}
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
