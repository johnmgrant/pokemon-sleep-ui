import React from 'react';

import {clsx} from 'clsx';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterCategoryInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterCategoryInput = <TId extends IndexableNonSymbol | null>({
  title,
  ids,
  idToButton,
  isHidden,
  onClick,
  isActive,
  getClassNames,
  noWrap,
  ...rowOpts
}: FilterCategoryInputProps<TId>) => {
  const {noFixedTitleWidth} = rowOpts;

  return (
    <InputRowWithTitle
      title={
        <div className={clsx('whitespace-nowrap text-center text-sm', !noFixedTitleWidth && 'w-32')}>
          {title}
        </div>
      }
      {...rowOpts}
    >
      <Flex direction="row" center wrap={!noWrap} className="gap-1 sm:justify-normal">
        {ids.map((id) => {
          const active = isActive(id);
          const hidden = isHidden && isHidden(id);

          if (hidden) {
            return null;
          }

          return (
            <ToggleButton
              key={id}
              active={active}
              onClick={() => onClick(id)}
              className={getClassNames(active, id)}
            >
              {idToButton(id, active)}
            </ToggleButton>
          );
        })}
      </Flex>
    </InputRowWithTitle>
  );
};
