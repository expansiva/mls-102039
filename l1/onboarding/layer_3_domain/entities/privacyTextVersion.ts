/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.ts" enhancement="_blank"/>
export type PrivacyTextVersion = {
  id: string;
  version: number;
  versionCode: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  details: {
    text: string;
    isProvisional: boolean;
    changeNote?: string;
    isCurrent?: boolean;
  };
};
