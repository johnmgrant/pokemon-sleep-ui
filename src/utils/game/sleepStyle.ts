import {spoStrengthAmplifier, spoToDrowsyScoreMultiplier} from '@/const/game/sleepStyle';
import {SleepStyleSpoRequirement} from '@/types/game/sleepStyle';


export const getSpoRequirement = (spo: number): SleepStyleSpoRequirement => {
  const drowsyScore = spo * spoToDrowsyScoreMultiplier;

  return {
    snorlaxStrength: drowsyScore / spoStrengthAmplifier,
    drowsyScore,
  };
};
