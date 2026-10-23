/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/organizationMember.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "OrganizationMember",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "OrganizationMember",
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
        "name": "details.identification.countryCode",
        "type": "string"
      },
      {
        "name": "details.identification.createdAt",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.identification.updatedAt",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.base",
        "type": "object"
      },
      {
        "name": "details.person",
        "type": "object"
      },
      {
        "name": "details.person.privacyConsent",
        "type": "object"
      },
      {
        "name": "details.person.privacyConsent.consentVersion",
        "type": "string"
      },
      {
        "name": "details.person.privacyConsent.consentedAt",
        "type": "timestamp"
      },
      {
        "name": "details.person.privacyConsent.channel",
        "type": "string"
      },
      {
        "name": "details.person.privacyConsent.revokedAt",
        "type": "timestamp"
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
        "name": "details.onboarding.loginEmail",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.onboarding.consentRequired",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.onboarding.consentValid",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.onboarding.missingItems",
        "type": "text",
        "derived": true
      },
      {
        "name": "details.onboarding.accessComplete",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "noSecondPerson",
      "loginEmailReadOnly",
      "onlyMissingDataAsked",
      "unknownCountryNeverDefaulted",
      "countryFromActiveList",
      "consentFollowsEditedCountry",
      "consentNeverAutoAccepted",
      "reacceptOnNewPrivacyVersion",
      "accessCompleteByPlatformRule",
      "dataEntryGrantsNoAuthority",
      "listingProvesNoInvitation"
    ],
    "imports": []
  }
} as const;

export default definition;
