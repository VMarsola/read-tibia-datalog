export type IContextProps = {
  children: React.ReactNode;
};

export type ILogType = {
  data: {
    hitpointsHealed: number;
    damageTaken: {
      total: number;
      byCreatureKind: {
        [key: string]: number;
      };
    };
    experienceGained: number;
    loot: {
      [key: string]: number;
    };
  };
};
