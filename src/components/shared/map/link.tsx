import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';


type Props = {
  mapId: string | number,
  className?: string,
  toUnique?: boolean,
  noAbsolute?: boolean,
};

export const MapLink = ({mapId, className, toUnique, noAbsolute, children}: React.PropsWithChildren<Props>) => {
  const t = useTranslations('Game.Field');

  const mapName = t(mapId.toString());

  return (
    <Link href={`/map/${toUnique ? 'unique/' : ''}${mapId}`} className={clsx(
      'button-clickable-bg group relative',
      className,
    )}>
      <NextImage
        src={`/images/field/${mapId}.png`}
        alt={mapName}
        sizes={imageGallerySizes}
        className="rounded-lg opacity-50 dark:opacity-25"
      />
      <Flex center className={clsx('h-full gap-1.5', !noAbsolute && 'absolute left-0 top-0 z-10')}>
        {children}
      </Flex>
    </Link>
  );
};
