/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/country.ts" enhancement="_blank"/>
export type Country = {
  id: string;
  version: number;
  isoCode: string;
  name: string;
  status: 'active' | 'inactive';
  details: {
    displayName?: string;
  };
};
