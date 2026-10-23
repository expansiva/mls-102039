/// <mls fileReference="_102039_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/solution/helpers/ns4Types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "2026-09-15-mdm-ontology-v2",
  "modules": [
    {
      "moduleName": "onboarding",
      "actors": [
        {
          "actorId": "companyOwner",
          "kind": "internal"
        },
        {
          "actorId": "organizationMember",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "subtype": "Person",
          "roleTag": "onboarding.OrganizationMember",
          "namespace": "onboarding"
        },
        {
          "subtype": "Company",
          "roleTag": "onboarding.OrganizationCompany",
          "namespace": "onboarding"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "onboarding.CompanyContact",
          "namespace": "onboarding"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "OrganizationMember",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "OrganizationCompany",
          "kind": "role",
          "mdmSubtype": "Company",
          "class": "mdm"
        },
        {
          "entityId": "CompanyContact",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "Country",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "PrivacyTextVersion",
          "kind": "entity",
          "class": "core"
        }
      ],
      "events": [],
      "updatedAt": "2026-10-22T15:44:38.849Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
