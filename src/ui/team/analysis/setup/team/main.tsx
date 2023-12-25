import React from 'react';


import {Grid} from '@/components/layout/grid';
import {
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {getCurrentTeam} from '@/ui/team/analysis/utils';

import {TeamAnalysisGridItem, TeamAnalysisTeamViewProps} from './slot';


export const TeamAnalysisTeamView = (props: TeamAnalysisTeamViewProps) => {
  const {
    setSetup,
  } = props;

  const setMember = React.useCallback((
    slotName: TeamAnalysisSlotName,
    member: TeamAnalysisMember,
  ) => setSetup((original): TeamAnalysisSetup => ({
    ...original,
    comps: {
      ...original.comps,
      [original.config.current]: getCurrentTeam({
        setup: original,
        overrideSlot: slotName,
        overrideMember: member,
      }),
    },
  })), [setSetup]);

  return (
    <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-3 xl:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => <TeamAnalysisGridItem
        {...props}
        key={slotName}
        slotName={slotName}
        setMember={setMember}
      />)}
    </Grid>
  );
};
