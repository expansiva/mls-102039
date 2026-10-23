/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "memberChooseCountry",
        "actorRef": "organizationMember",
        "entityRefs": [
          "Country"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Country.isoCode",
          "Country.name",
          "Country.details.displayName"
        ],
        "scopeMode": "custom",
        "session": "verified",
        "path": [
          {
            "entityId": "Country",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "memberOwnAccess",
        "actorRef": "organizationMember",
        "anchorEntity": "OrganizationMember",
        "entityRefs": [
          "OrganizationMember"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "OrganizationMember",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "memberReadPrivacyText",
        "actorRef": "organizationMember",
        "entityRefs": [
          "PrivacyTextVersion"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "PrivacyTextVersion.versionCode",
          "PrivacyTextVersion.publishedAt",
          "PrivacyTextVersion.details.text",
          "PrivacyTextVersion.details.isProvisional",
          "PrivacyTextVersion.details.isCurrent"
        ],
        "scopeMode": "custom",
        "session": "verified",
        "path": [
          {
            "entityId": "PrivacyTextVersion",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "ownerMaintainCountries",
        "actorRef": "companyOwner",
        "entityRefs": [
          "Country"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Country",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "ownerOwnAccess",
        "actorRef": "companyOwner",
        "anchorEntity": "OrganizationMember",
        "entityRefs": [
          "OrganizationMember"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "OrganizationMember",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "ownerPrepareCompany",
        "actorRef": "companyOwner",
        "entityRefs": [
          "OrganizationCompany",
          "CompanyContact"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "OrganizationCompany",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "CompanyContact",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "ownerPublishPrivacyText",
        "actorRef": "companyOwner",
        "entityRefs": [
          "PrivacyTextVersion"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "PrivacyTextVersion",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "ownerReviewPeople",
        "actorRef": "companyOwner",
        "entityRefs": [
          "OrganizationMember"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "OrganizationMember.details.identification.name",
          "OrganizationMember.details.identification.status",
          "OrganizationMember.details.identification.countryCode",
          "OrganizationMember.details.identification.updatedAt",
          "OrganizationMember.details.onboarding.loginEmail",
          "OrganizationMember.details.onboarding.missingItems",
          "OrganizationMember.details.onboarding.accessComplete",
          "OrganizationMember.details.onboarding.consentValid"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "OrganizationMember",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      }
    ]
  }
} as const;

export default definition;
