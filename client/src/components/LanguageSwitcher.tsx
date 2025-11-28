'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { Button, HStack } from '@chakra-ui/react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <HStack gap={2}>
      <Button
        size="sm"
        variant={locale === 'ko' ? 'solid' : 'ghost'}
        colorPalette="purple"
        onClick={() => handleLocaleChange('ko')}
      >
        KO
      </Button>
      <Button
        size="sm"
        variant={locale === 'en' ? 'solid' : 'ghost'}
        colorPalette="purple"
        onClick={() => handleLocaleChange('en')}
      >
        EN
      </Button>
    </HStack>
  );
}
