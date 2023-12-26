import React from 'react';

import {RatingPopupControl, RatingPopupControlState, RatingResultMap} from '@/components/shared/pokemon/rating/type';
import {initialRatingResult} from '@/const/game/rating';
import {PokemonKeyLevel, pokemonKeyLevels} from '@/types/game/pokemon/level';
import {RatingRequest, RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {ValueOf} from '@/utils/type';


export const useRatingPopup = (): RatingPopupControl => {
  const [state, setState] = React.useState<RatingPopupControlState>({
    show: false,
    request: undefined,
  });

  return {
    state,
    setState,
    sendRequest: (setup) => setState({
      show: true,
      request: {
        timestamp: Date.now(),
        setup,
      },
    }),
  };
};

type UseRatingResultOpts = {
  pokemonMaxLevel: number,
  request: RatingRequest | undefined,
};

export const useRatingResult = ({
  pokemonMaxLevel,
  request,
}: UseRatingResultOpts) => {
  const validKeyLevels: PokemonKeyLevel[] = React.useMemo(() => (
    pokemonKeyLevels
      .filter((level) => level <= pokemonMaxLevel)
      .sort((a, b) => a - b)
  ), [pokemonMaxLevel]);

  const generateEmptyRatingResultMap = React.useCallback((): RatingResultMap => {
    return Object.fromEntries(validKeyLevels.map((level) => [
      level,
      {level, ...initialRatingResult} satisfies ValueOf<RatingResultMap>,
    ])) as RatingResultMap;
  }, [validKeyLevels]);

  const [
    resultMap,
    setResultMap,
  ] = React.useState<RatingResultMap>(generateEmptyRatingResultMap);

  React.useEffect(() => {
    setResultMap(generateEmptyRatingResultMap());
  }, [request]);

  const updateResultOfLevel = React.useCallback((result: RatingResultOfLevel) => {
    const {level} = result;

    setResultMap((original) => ({
      ...original,
      [level]: result,
    }));
  }, []);

  return {
    validKeyLevels,
    resultMap,
    updateResultOfLevel,
  };
};
