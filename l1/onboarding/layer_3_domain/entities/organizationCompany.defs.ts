/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/organizationCompany.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "OrganizationCompany",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "OrganizationCompany",
    "storageTarget": "mdm",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.identification",
        "type": "object"
      },
      {
        "name": "details.identification.subtype",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.name",
        "type": "string"
      },
      {
        "name": "details.identification.status",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.docType",
        "type": "enum"
      },
      {
        "name": "details.identification.docId",
        "type": "string"
      },
      {
        "name": "details.identification.countryCode",
        "type": "string"
      },
      {
        "name": "details.base",
        "type": "object"
      },
      {
        "name": "details.base.addresses",
        "type": "object",
        "of": "Address"
      },
      {
        "name": "details.base.contacts",
        "type": "object",
        "derived": true,
        "of": "ContactSummary"
      },
      {
        "name": "details.company",
        "type": "object"
      },
      {
        "name": "details.company.companyKind",
        "type": "enum"
      },
      {
        "name": "details.company.legalName",
        "type": "string"
      },
      {
        "name": "details.general",
        "type": "object"
      },
      {
        "name": "details.onboarding",
        "type": "object"
      },
      {
        "name": "details.onboarding.missingData",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.onboarding.isPrepared",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "onlyOwnerPreparesCompany",
      "companyCountryNeverDefaulted",
      "companyContactNotDuplicated",
      "companyPreparedWhenRequiredSaved",
      "companyNotAskedAgainForExistingData",
      "authorityErrorDistinctFromValidation"
    ],
    "imports": []
  }
} as const;

export default definition;
