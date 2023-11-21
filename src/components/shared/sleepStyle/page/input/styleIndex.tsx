import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {SleepdexStyleIcon} from '@/components/shared/sleepdex/styleIcon';
import {MapInputCommonProps} from '@/components/shared/sleepStyle/page/input/type';
import {imageIconSizes} from '@/styles/image';
import {SleepStyleId} from '@/types/game/sleepStyle';


type Props = MapInputCommonProps & {
  sleepStyles: SleepStyleId[],
};

export const MapInputSleepStyleToggle = (props: Props) => {
  const {filter, setFilter, sleepStyles} = props;

  const t = useTranslations('UI.InPage.Map');

  return (
    <FilterTextInput
      title={
        <Flex direction="row" center>
          <div className="relative h-8 w-8">
            <NextImage
              src="/images/generic/sleep.png" alt={t('SleepStyle')}
              sizes={imageIconSizes} className="invert-on-light"
            />
          </div>
        </Flex>
      }
      idToButton={(id) => <SleepdexStyleIcon styleId={id}/>}
      ids={sleepStyles}
      {...getMultiSelectOnClickProps({
        filter,
        setFilter,
        filterKey: 'sleepStyle',
      })}
    />
  );
};
