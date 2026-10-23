/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/organizationMember.ts" enhancement="_blank"/>
export type OrganizationMember = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Person';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
      createdAt: string;
      updatedAt: string;
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: {
        consentVersion?: string;
        consentedAt?: string;
        channel?: string;
        revokedAt?: string;
      };
    };
    general?: Record<string, unknown>;
    onboarding?: {
      loginEmail?: string;
      consentRequired?: boolean;
      consentValid?: boolean;
      missingItems?: string;
      accessComplete?: boolean;
    };
  };
};
