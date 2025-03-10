import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {toPokeInBox} from '@/components/shared/pokemon/predefined/lab/onDesk/utils';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  setup: PokemonOnDeskState,
  pokemon: PokemonInfo,
  pokemonMaxLevel: number,
};

export const PokemonOnDeskExportButton = ({setup, pokemon, pokemonMaxLevel}: Props) => {
  const [level, setLevel] = React.useState(1);
  const [name, setName] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);
  const {act, status} = useUserDataActor();
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  React.useEffect(() => {
    if (status === 'completed') {
      setShow(false);
    }
  }, [status]);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Flex className="max-w-2xl gap-2 overflow-hidden sm:min-w-[24rem]">
          <InputBox
            value={name ?? ''}
            type="text"
            placeholder={t2(`PokemonName.${pokemon.id}`)}
            className="w-full"
            onChange={({target}) => setName(target.value || null)}
          />
          <PokemonLevelSlider value={level} max={pokemonMaxLevel} setValue={setLevel} noSameLine/>
          <Flex>
            <button
              className="button-clickable-bg disabled:button-disabled ml-auto p-1"
              disabled={status === 'processing'}
              onClick={() => {
                if (!act) {
                  return;
                }

                act({
                  action: 'upload',
                  options: {
                    type: 'pokebox.create',
                    data: toPokeInBox({
                      pokemon,
                      name,
                      level,
                      setup,
                    }),
                  },
                });
              }}
            >
              <div className="h-8 w-8">
                <UserActionStatusIcon status={status}/>
              </div>
            </button>
          </Flex>
        </Flex>
      </PopupCommon>
      <button
        className="button-clickable-bg disabled:button-disabled w-32 p-1"
        disabled={!act || status === 'processing'}
        onClick={() => setShow(true)}
      >
        <Flex direction="row" center className="group gap-1">
          {status !== 'waiting' ?
            <div className="h-9 w-9">
              <UserActionStatusIcon status={status}/>
            </div> :
            <>
              <ArrowTopRightOnSquareIcon className="h-9 w-9"/>
              <GenericIconLarger
                src="/images/generic/pokebox.png"
                alt={t('Team.Box.Title')}
                dimension="h-9 w-9"
              />
            </>}
        </Flex>
      </button>
    </>
  );
};
