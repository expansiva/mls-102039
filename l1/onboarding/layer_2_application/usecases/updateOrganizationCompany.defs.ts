/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationCompany.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "updateOrganizationCompany",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/organizationCompany.defs.ts",
    "_102039_/l4/onboarding/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "updateOrganizationCompany",
    "entityId": "OrganizationCompany",
    "operation": "update",
    "rulesApplied": [
      "authorityErrorDistinctFromValidation",
      "companyContactNotDuplicated",
      "companyCountryNeverDefaulted",
      "companyNotAskedAgainForExistingData",
      "companyPreparedWhenRequiredSaved",
      "onlyOwnerPreparesCompany"
    ],
    "effects": [],
    "mdm": {
      "namespace": "onboarding",
      "role": "onboarding.OrganizationCompany",
      "atomic": true,
      "calls": [
        {
          "id": "update",
          "method": "update",
          "target": "entity",
          "shape": "write",
          "capabilities": [
            "edit.platformFields"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "mdmId",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "id"
              },
              "path": "id"
            },
            {
              "name": "expectedVersion",
              "role": "parameter",
              "origin": {
                "kind": "contract",
                "path": "version",
                "evidence": "writePrecondition"
              },
              "path": "version"
            },
            {
              "name": "addresses",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.base.addresses"
              },
              "capability": "edit.platformFields",
              "path": "details.base.addresses"
            },
            {
              "name": "companyKind",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.company.companyKind"
              },
              "capability": "edit.platformFields",
              "path": "details.company.companyKind"
            },
            {
              "name": "legalName",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.company.legalName"
              },
              "capability": "edit.platformFields",
              "path": "details.company.legalName"
            },
            {
              "name": "countryCode",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.countryCode"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.countryCode"
            },
            {
              "name": "docId",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.docId"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.docId"
            },
            {
              "name": "docType",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.docType"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.docType"
            },
            {
              "name": "name",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.name"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.name"
            }
          ],
          "result": [
            "mdmId",
            "version",
            "details"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
