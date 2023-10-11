import React from 'react';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {OcrPokemonInfoImporter} from '@/components/ocr/importer/pokemonInfo/main';
import {PokeboxImporterButton} from '@/components/shared/pokebox/importer/button';
import {PokemonCollapsibleFilter} from '@/components/shared/pokemon/predefined/filter';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';
import {useRatingFilter} from '@/ui/rating/filter/hook';
import {RatingFilterCommonProps} from '@/ui/rating/filter/type';


export const RatingFilter = (props: RatingFilterCommonProps) => {
  const {
    pokemonList,
    pokedexMap,
    ingredientChainMap,
    subSkillMap,
    onPokemonPicked,
    ocrTranslations,
  } = props;

  const {filter, setFilter, isIncluded} = useRatingFilter({
    data: pokemonList,
    ingredientChainMap,
  });
  const filterCollapsible = useCollapsible();
  const resultCollapsible = useCollapsible();

  React.useEffect(() => {
    resultCollapsible.setShow(true);
  }, [filter]);

  return (
    <Flex className="gap-1">
      <PokemonCollapsibleFilter
        collapsibleState={filterCollapsible}
        filter={filter}
        setFilter={setFilter}
        ingredientChainMap={ingredientChainMap}
        pokemonList={pokemonList}
      />
      <PokemonCollapsiblePicker
        collapsibleState={resultCollapsible}
        isIncluded={isIncluded}
        pokemonList={pokemonList}
        onPokemonPicked={(pokemon) => onPokemonPicked({origin: 'pokedex', pokemon})}
      />
      <Flex direction="row" center className="gap-1.5">
        <PokeboxImporterButton
          {...props}
          noFullWidth={false}
          onPokeboxPicked={(pokeInBox) => {
            const pokemon = pokedexMap[pokeInBox.pokemon];

            if (!pokemon) {
              return;
            }

            onPokemonPicked({...pokeInBox, origin: 'pokebox', pokemon});
          }}
        />
        <OcrPokemonInfoImporter
          ocrTranslations={ocrTranslations}
          onCompleteImport={(pokemonId, {subSkill, nature}) => {
            const pokemon = pokedexMap[pokemonId];

            if (!pokemon) {
              return;
            }

            onPokemonPicked({
              origin: 'ocr',
              pokemon,
              subSkill,
              nature,
            });
          }}
          subSkillMap={subSkillMap}
          noFullWidth={false}
        />
      </Flex>
    </Flex>
  );
};
