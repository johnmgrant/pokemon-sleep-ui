import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';

import {Link} from '@/components/i18n';
import {Flex} from '@/components/layout/flex/common';
import {discordLink} from '@/const/external';
import {DefaultPageProps} from '@/types/next/page';
import {AboutSection} from '@/ui/about/section';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {getI18nTranslator} from '@/utils/i18n';


export const About = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return (
    <PublicPageLayout locale={locale}>
      <Flex center className="info-section !gap-8">
        <Flex className="gap-2">
          <div className="text-2xl">
            {t('Site.Name')}
          </div>
          <AboutSection title="Discord">
            <Link href={discordLink} className="border-link">
              {discordLink}
            </Link>
          </AboutSection>
        </Flex>
        <Flex className="gap-8 md:flex-row">
          <Flex className="gap-3">
            <Flex center className="relative h-10 w-10">
              <UserCircleIcon/>
            </Flex>
            <AboutSection title="Discord">
              @raenonx
            </AboutSection>
            <AboutSection title="LINE">
              RaenonX
            </AboutSection>
          </Flex>
          <Flex className="gap-2">
            <Flex center className="relative h-10 w-10">
              <CurrencyDollarIcon/>
            </Flex>
            <AboutSection title="Patreon">
              <Link href="https://patreon.com/RaenonX" className="border-link">
                https://patreon.com/RaenonX
              </Link>
            </AboutSection>
            <AboutSection title="USDT (TRC20)">
              TAztRpSHJk8GbZtNuxoyzndFrAfcorh87v
            </AboutSection>
            <AboutSection title="USDT / USDC (ERC20 / Cronos / Polygon)">
              0x8d3aD05D87f29E3617e93bF7D49b01940E04d8cb
            </AboutSection>
            <AboutSection title="Zelle (US)">
              (Discord / LINE)
            </AboutSection>
          </Flex>
        </Flex>
        <Flex className="md:w-1/2 xl:w-1/3">
          <iframe
            src="https://discord.com/widget?id=1138701819464392744&theme=dark"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="h-[40vh] rounded-lg"
          />
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
