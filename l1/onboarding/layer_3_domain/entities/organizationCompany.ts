/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/organizationCompany.ts" enhancement="_blank"/>
import type { AddressValue, ContactSummaryValue } from '/_102034_/l1/mdm/module.js';
export type OrganizationCompany = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Company';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'EIN' | 'CNPJ' | 'VAT' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
    };
    base: {
      addresses: AddressValue[];
      contacts: ContactSummaryValue[];
    };
    company: {
      companyKind: 'LegalEntity';
      legalName: string;
    };
    general?: Record<string, unknown>;
    onboarding?: {
      missingData?: string;
      isPrepared?: boolean;
    };
  };
};
