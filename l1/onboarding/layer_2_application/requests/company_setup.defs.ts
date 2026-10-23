/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/company_setup.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "company_setup",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationCompany.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationCompany.defs.ts"
  ],
  "data": {
    "pageId": "company_setup",
    "requests": [
      {
        "route": "onboarding.company_setup.getCompanySetup",
        "kind": "qry",
        "uses": [
          "getOrganizationCompany",
          "listCountry"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "company",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "company.details.identification",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "docType",
                "path": "details.identification.docType"
              },
              {
                "field": "docId",
                "path": "details.identification.docId"
              },
              {
                "field": "countryCode",
                "path": "details.identification.countryCode"
              }
            ]
          },
          {
            "kind": "related",
            "path": "company.details.identification",
            "entity": "Country",
            "relationship": "companyCountry",
            "fields": [
              {
                "field": "name",
                "path": "name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "company.details.company",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "legalName",
                "path": "details.company.legalName"
              }
            ]
          },
          {
            "kind": "list",
            "path": "countries",
            "entity": "Country",
            "items": "",
            "fields": [
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "company.details.onboarding",
            "rules": [
              "companyPreparedWhenRequiredSaved"
            ]
          },
          {
            "kind": "unresolved",
            "path": "company.details.identification",
            "reason": "OrganizationCompany inside OrganizationCompany needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "company.details.base",
            "reason": "Interface CompanyBase has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "company.details.company",
            "reason": "OrganizationCompany inside OrganizationCompany needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerPreparesCompany",
          "companyNotAskedAgainForExistingData",
          "companyPreparedWhenRequiredSaved",
          "onlyActiveCountryOffered",
          "companyCountryNeverDefaulted",
          "authorityErrorDistinctFromValidation"
        ],
        "doc": {
          "raw": "Purpose: Loads in one call the company the platform has for the signed-in login, with its computed preparation status, and the active countries the owner may choose as company country.\nInput: None: the company is resolved from the signed-in login on the server.\nProcessing: Resolves the company of the session login (read.byId) and refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), kept distinct from a validation error and from a missing company (authorityErrorDistinctFromValidation). Reads the linked contacts summary (listLinks) so the existing contact is not asked again (companyNotAskedAgainForExistingData). Computes missingData and isPrepared: prepared only when name, legal name, country, document, address and a contact are all saved (companyPreparedWhenRequiredSaved); these derived values are never stored. Lists only active countries ordered by name, with displayName translated from the ISO code into the user language, falling back to the English name (onlyActiveCountryOffered). The company countryCode is returned as stored; when unknown it stays empty and is never replaced by a default (companyCountryNeverDefaulted).\nOutput: company: the company record with id, version, identification (name, docType, docId, countryCode), base (addresses, contacts summary), legal name and onboarding (missingData, isPrepared). countries: the plain list of active countries with ISO code, English name, status and display name.",
          "purpose": "Loads in one call the company the platform has for the signed-in login, with its computed preparation status, and the active countries the owner may choose as company country.",
          "input": "None: the company is resolved from the signed-in login on the server.",
          "processing": "Resolves the company of the session login (read.byId) and refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), kept distinct from a validation error and from a missing company (authorityErrorDistinctFromValidation). Reads the linked contacts summary (listLinks) so the existing contact is not asked again (companyNotAskedAgainForExistingData). Computes missingData and isPrepared: prepared only when name, legal name, country, document, address and a contact are all saved (companyPreparedWhenRequiredSaved); these derived values are never stored. Lists only active countries ordered by name, with displayName translated from the ISO code into the user language, falling back to the English name (onlyActiveCountryOffered). The company countryCode is returned as stored; when unknown it stays empty and is never replaced by a default (companyCountryNeverDefaulted).",
          "output": "company: the company record with id, version, identification (name, docType, docId, countryCode), base (addresses, contacts summary), legal name and onboarding (missingData, isPrepared). countries: the plain list of active countries with ISO code, English name, status and display name."
        }
      },
      {
        "route": "onboarding.company_setup.saveCompany",
        "kind": "cmd",
        "uses": [
          "updateOrganizationCompany"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "company",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "company.details.identification",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "docType",
                "path": "details.identification.docType"
              },
              {
                "field": "docId",
                "path": "details.identification.docId"
              },
              {
                "field": "countryCode",
                "path": "details.identification.countryCode"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "company.details.identification.name",
            "reason": "DISCLOSURE: Route onboarding.company_setup.saveCompany projects details.identification.name, which this page's grants do not disclose."
          },
          {
            "kind": "related",
            "path": "company.details.identification",
            "entity": "Country",
            "relationship": "companyCountry",
            "fields": []
          },
          {
            "kind": "related",
            "path": "company.details.company",
            "entity": "OrganizationCompany",
            "fields": [
              {
                "field": "legalName",
                "path": "details.company.legalName"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "company.details.onboarding",
            "rules": [
              "companyPreparedWhenRequiredSaved"
            ]
          },
          {
            "kind": "unresolved",
            "path": "company.details.identification",
            "reason": "OrganizationCompany inside OrganizationCompany needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "company.details.base",
            "reason": "Interface CompanyBase has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "company.details.company",
            "reason": "OrganizationCompany inside OrganizationCompany needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerPreparesCompany",
          "companyNotAskedAgainForExistingData",
          "companyCountryNeverDefaulted",
          "onlyActiveCountryOffered",
          "companyContactNotDuplicated",
          "companyPreparedWhenRequiredSaved",
          "authorityErrorDistinctFromValidation"
        ],
        "doc": {
          "raw": "Purpose: Saves the missing company data of the owner’s company through the platform update.\nInput: id and version: the company and the version the owner saw, for optimistic concurrency. details.identification.name, details.company.legalName, details.identification.docType, details.identification.docId, details.identification.countryCode, details.base.addresses: the company data typed by the owner; only the data still missing is sent.\nProcessing: Refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), distinct from validation errors such as a stale version, a bad document shape or a document already held by another record (authorityErrorDistinctFromValidation). Writes only the data the platform does not already have (companyNotAskedAgainForExistingData). Requires countryCode to be one of the active countries and never fills an absent country with a default (onlyActiveCountryOffered, companyCountryNeverDefaulted). Reuses the existing company contact of the same type and value instead of creating a duplicate (companyContactNotDuplicated). Recomputes missingData and isPrepared after saving (companyPreparedWhenRequiredSaved); they are derived, never stored.\nOutput: company: the company record in its new state with its new version, data, contacts summary and recomputed missingData and isPrepared.",
          "purpose": "Saves the missing company data of the owner’s company through the platform update.",
          "input": "id and version: the company and the version the owner saw, for optimistic concurrency. details.identification.name, details.company.legalName, details.identification.docType, details.identification.docId, details.identification.countryCode, details.base.addresses: the company data typed by the owner; only the data still missing is sent.",
          "processing": "Refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), distinct from validation errors such as a stale version, a bad document shape or a document already held by another record (authorityErrorDistinctFromValidation). Writes only the data the platform does not already have (companyNotAskedAgainForExistingData). Requires countryCode to be one of the active countries and never fills an absent country with a default (onlyActiveCountryOffered, companyCountryNeverDefaulted). Reuses the existing company contact of the same type and value instead of creating a duplicate (companyContactNotDuplicated). Recomputes missingData and isPrepared after saving (companyPreparedWhenRequiredSaved); they are derived, never stored.",
          "output": "company: the company record in its new state with its new version, data, contacts summary and recomputed missingData and isPrepared."
        }
      }
    ]
  }
} as const;

export default definition;
