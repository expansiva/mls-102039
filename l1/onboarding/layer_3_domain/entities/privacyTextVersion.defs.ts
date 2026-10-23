/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "PrivacyTextVersion",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "PrivacyTextVersion",
    "storageTarget": "moduleDatabase",
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
        "name": "versionCode",
        "type": "string",
        "derived": true
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "publishedAt",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.text",
        "type": "text"
      },
      {
        "name": "details.isProvisional",
        "type": "boolean"
      },
      {
        "name": "details.changeNote",
        "type": "text"
      },
      {
        "name": "details.isCurrent",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "draft",
          "reachedBy": "actor"
        },
        {
          "state": "published",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "publishPrivacyVersion",
          "from": [
            "draft"
          ],
          "to": "published",
          "by": [
            "companyOwner"
          ],
          "ruleRefs": [
            "publishedVersionImmutable",
            "currentVersionIsLatestPublished",
            "newCurrentVersionRequiresReacceptance",
            "onlyOwnerMaintainsPrivacyText"
          ]
        }
      ]
    },
    "invariants": [
      "publishedVersionImmutable",
      "currentVersionIsLatestPublished",
      "newCurrentVersionRequiresReacceptance",
      "onlyOwnerMaintainsPrivacyText",
      "initialProvisionalPrivacyText",
      "privacyVersionCodeFromSequence"
    ],
    "imports": []
  }
} as const;

export default definition;
