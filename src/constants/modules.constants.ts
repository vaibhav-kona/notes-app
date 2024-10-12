const MODULE = {
  GLOBAL: 'global',
};

type ModuleKey = (typeof MODULE)[keyof typeof MODULE];

export { MODULE };
export type { ModuleKey };
