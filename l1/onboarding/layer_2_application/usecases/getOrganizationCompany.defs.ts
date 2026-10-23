/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationCompany.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getOrganizationCompany",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/organizationCompany.defs.ts"
  ],
  "data": {
    "usecaseId": "getOrganizationCompany",
    "entityId": "OrganizationCompany",
    "operation": "get",
    "rulesApplied": [],
    "effects": [],
    "mdm": {
      "namespace": "onboarding",
      "role": "onboarding.OrganizationCompany",
      "atomic": true,
      "calls": [
        {
          "id": "get",
          "method": "get",
          "target": "entity",
          "shape": "point",
          "capabilities": [
            "read.byId"
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
