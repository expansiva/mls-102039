/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/companyContact.ts" enhancement="_blank"/>
export type CompanyContact = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'ContactChannel';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
    };
    base?: Record<string, unknown>;
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
      isVerified: boolean;
    };
    general?: Record<string, unknown>;
    onboarding?: Record<string, unknown>;
  };
};
