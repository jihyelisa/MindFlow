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
} from '@chakra-ui/react';
import { useRouter } from '@/navigation';
import { FiSun, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function SajuMenuPage() {
  const router = useRouter();
  const t = useTranslations('sajuMenu');

  const menuItems = [
    {
      title: t('today.title'),
      description: t('today.description'),
      icon: FiSun,
      path: '/saju/today',
      color: 'yellow',
    },
    {
      title: t('month.title'),
      description: t('month.description'),
      icon: FiCalendar,
      path: '/saju/month',
      color: 'blue',
    },
    {
      title: t('life.title'),
      description: t('life.description'),
      icon: FiTrendingUp,
      path: '/saju/life',
      color: 'purple',
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

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card.Root
                  key={item.path}
                  _hover={{ 
                    transform: 'translateY(-8px)', 
                    shadow: '2xl',
                    borderColor: `${item.color}.200`
                  }}
                  transition="all 0.3s ease-in-out"
                  cursor="pointer"
                  onClick={() => router.push(item.path)}
                  borderRadius="3xl"
                  shadow="lg"
                  bg="white/80"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="transparent"
                  overflow="hidden"
                >
                  <Card.Body p={8}>
                    <Stack gap={6} align="center" textAlign="center">
                      <Box 
                        p={4} 
                        bg={`${item.color}.50`} 
                        color={`${item.color}.500`}
                        borderRadius="2xl"
                        shadow="sm"
                      >
                        <IconComponent size={48} />
                      </Box>
                      <Stack gap={3} align="center">
                        <Heading size="lg" fontWeight="bold" color="gray.800">
                          {item.title}
                        </Heading>
                        <Text color="gray.500" fontSize="md" lineHeight="relaxed">
                          {item.description}
                        </Text>
                      </Stack>
                      <Button 
                        variant="solid" 
                        colorPalette={item.color} 
                        size="lg"
                        w="full"
                      >
                        {t('select')}
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
