/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/organization_people.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "organization_people",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listOrganizationMember.defs.ts"
  ],
  "data": {
    "pageId": "organization_people",
    "requests": [
      {
        "route": "onboarding.organization_people.qryOrganizationPeopleOverview",
        "kind": "qry",
        "uses": [
          "listOrganizationMember"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "people",
            "entity": "OrganizationMember",
            "items": "items",
            "page": "people.page",
            "pageSize": "people.pageSize",
            "hasMore": "people.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.onboarding.loginEmail",
                "path": "details.onboarding.loginEmail"
              },
              {
                "field": "details.onboarding.accessComplete",
                "path": "details.onboarding.accessComplete"
              },
              {
                "field": "details.onboarding.missingItems",
                "path": "details.onboarding.missingItems"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "people.items.country.details.displayName",
            "reason": "COMPUTED_NOT_DISCLOSED: onboarding.organization_people.qryOrganizationPeopleOverview items.country.details.displayName"
          },
          {
            "kind": "computed",
            "path": "highlights",
            "rules": [
              "accessCompleteByPlatformRule"
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "people",
            "pages": "people"
          },
          {
            "name": "pageSize",
            "target": "people",
            "pages": "people"
          }
        ],
        "rules": [
          "accessCompleteByPlatformRule",
          "reacceptOnNewPrivacyVersion",
          "currentVersionIsLatestPublished",
          "newCurrentVersionRequiresReacceptance",
          "loginEmailReadOnly",
          "listingProvesNoInvitation"
        ],
        "doc": {
          "raw": "Purpose: Opens the organization people page: access indicators and the first page of organization people.\nInput: page and pageSize: the page of the people list to return (normally the first).\nProcessing: Lists the organization users of the caller’s organization from the platform user list, ordered by name. Country names are resolved in one batch from the country codes (Country.details.displayName in the user language, English name as fallback; an unknown country stays empty, never defaulted). accessComplete, consentValid and missingItems are computed per person, never stored: accessCompleteByPlatformRule (name, country and, when required, a valid consent), reacceptOnNewPrivacyVersion with currentVersionIsLatestPublished and newCurrentVersionRequiresReacceptance (a consent for an earlier version is not valid). The indicators count, over the whole organization, people with complete and pending access and with valid and invalid consent. loginEmail is read from the platform login (loginEmailReadOnly). Being listed proves no invitation nor authority (listingProvesNoInvitation).\nOutput: highlights with the computed counts, and people as a page { items, page, pageSize, hasMore } of person rows with name, login e-mail, status, country code and name, access completion and missing items; an empty page when the organization has no people.",
          "purpose": "Opens the organization people page: access indicators and the first page of organization people.",
          "input": "page and pageSize: the page of the people list to return (normally the first).",
          "processing": "Lists the organization users of the caller’s organization from the platform user list, ordered by name. Country names are resolved in one batch from the country codes (Country.details.displayName in the user language, English name as fallback; an unknown country stays empty, never defaulted). accessComplete, consentValid and missingItems are computed per person, never stored: accessCompleteByPlatformRule (name, country and, when required, a valid consent), reacceptOnNewPrivacyVersion with currentVersionIsLatestPublished and newCurrentVersionRequiresReacceptance (a consent for an earlier version is not valid). The indicators count, over the whole organization, people with complete and pending access and with valid and invalid consent. loginEmail is read from the platform login (loginEmailReadOnly). Being listed proves no invitation nor authority (listingProvesNoInvitation).",
          "output": "highlights with the computed counts, and people as a page { items, page, pageSize, hasMore } of person rows with name, login e-mail, status, country code and name, access completion and missing items; an empty page when the organization has no people."
        }
      },
      {
        "route": "onboarding.organization_people.qrySearchOrganizationPeople",
        "kind": "qry",
        "uses": [
          "listOrganizationMember"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "people",
            "entity": "OrganizationMember",
            "items": "items",
            "page": "people.page",
            "pageSize": "people.pageSize",
            "hasMore": "people.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.onboarding.loginEmail",
                "path": "details.onboarding.loginEmail"
              },
              {
                "field": "details.onboarding.accessComplete",
                "path": "details.onboarding.accessComplete"
              },
              {
                "field": "details.onboarding.missingItems",
                "path": "details.onboarding.missingItems"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "people.items.country.details.displayName",
            "reason": "COMPUTED_NOT_DISCLOSED: onboarding.organization_people.qrySearchOrganizationPeople items.country.details.displayName"
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "people",
            "pages": "people"
          },
          {
            "name": "pageSize",
            "target": "people",
            "pages": "people"
          },
          {
            "name": "search",
            "target": "people",
            "optional": true
          },
          {
            "name": "status",
            "target": "people",
            "field": "details.identification.status",
            "optional": true
          }
        ],
        "rules": [
          "accessCompleteByPlatformRule",
          "reacceptOnNewPrivacyVersion",
          "loginEmailReadOnly",
          "listingProvesNoInvitation"
        ],
        "doc": {
          "raw": "Purpose: Searches and pages the organization people by name or login e-mail and by status.\nInput: search: text contained in the name or the login e-mail; status: optional platform status filter; page and pageSize: the requested page.\nProcessing: Filters the organization users by name or login e-mail containing the text and by status, ordered by name, and resolves country names in one batch. accessComplete and missingItems are computed per person by accessCompleteByPlatformRule and reacceptOnNewPrivacyVersion, never stored. loginEmail comes from the platform login (loginEmailReadOnly); listingProvesNoInvitation applies.\nOutput: people as a page { items, page, pageSize, hasMore } of matching person rows; an empty page when nothing matches.",
          "purpose": "Searches and pages the organization people by name or login e-mail and by status.",
          "input": "search: text contained in the name or the login e-mail; status: optional platform status filter; page and pageSize: the requested page.",
          "processing": "Filters the organization users by name or login e-mail containing the text and by status, ordered by name, and resolves country names in one batch. accessComplete and missingItems are computed per person by accessCompleteByPlatformRule and reacceptOnNewPrivacyVersion, never stored. loginEmail comes from the platform login (loginEmailReadOnly); listingProvesNoInvitation applies.",
          "output": "people as a page { items, page, pageSize, hasMore } of matching person rows; an empty page when nothing matches."
        }
      },
      {
        "route": "onboarding.organization_people.qryOrganizationPerson",
        "kind": "qry",
        "uses": [
          "getOrganizationMember"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "person",
            "entity": "OrganizationMember",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              },
              {
                "field": "details.identification.countryCode",
                "path": "details.identification.countryCode"
              },
              {
                "field": "details.identification.updatedAt",
                "path": "details.identification.updatedAt"
              },
              {
                "field": "details.onboarding.loginEmail",
                "path": "details.onboarding.loginEmail"
              },
              {
                "field": "details.onboarding.consentValid",
                "path": "details.onboarding.consentValid"
              },
              {
                "field": "details.onboarding.missingItems",
                "path": "details.onboarding.missingItems"
              },
              {
                "field": "details.onboarding.accessComplete",
                "path": "details.onboarding.accessComplete"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "person.country.details.displayName",
            "reason": "COMPUTED_NOT_DISCLOSED: onboarding.organization_people.qryOrganizationPerson country.details.displayName"
          },
          {
            "kind": "computed",
            "path": "person.currentPrivacyVersion",
            "rules": [
              "currentVersionIsLatestPublished"
            ]
          },
          {
            "kind": "unresolved",
            "path": "person.currentPrivacyVersion",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route onboarding.organization_people.qryOrganizationPerson projects OrganizationMember.currentPrivacyVersion, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "accessCompleteByPlatformRule",
          "reacceptOnNewPrivacyVersion",
          "currentVersionIsLatestPublished",
          "newCurrentVersionRequiresReacceptance",
          "loginEmailReadOnly",
          "unknownCountryNeverDefaulted",
          "dataEntryGrantsNoAuthority",
          "listingProvesNoInvitation"
        ],
        "doc": {
          "raw": "Purpose: Loads one organization person with each pending item and who resolves it.\nInput: memberId: id of the person selected in the people list.\nProcessing: Reads the person of the caller’s organization by id, resolves the country name in the user language (unknownCountryNeverDefaulted: an unknown country stays empty) and the current privacy text version (currentVersionIsLatestPublished). Computes consentValid (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance), accessComplete (accessCompleteByPlatformRule) and missingItems, each item saying whether the person completes it or the owner must release access on the platform (dataEntryGrantsNoAuthority); none is stored. loginEmail comes from the platform login (loginEmailReadOnly).\nOutput: person with name, login e-mail, status, country code and name, last update, consent validity, missing items with who resolves each, access completion and the current privacy text version (code, publication moment, current flag).",
          "purpose": "Loads one organization person with each pending item and who resolves it.",
          "input": "memberId: id of the person selected in the people list.",
          "processing": "Reads the person of the caller’s organization by id, resolves the country name in the user language (unknownCountryNeverDefaulted: an unknown country stays empty) and the current privacy text version (currentVersionIsLatestPublished). Computes consentValid (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance), accessComplete (accessCompleteByPlatformRule) and missingItems, each item saying whether the person completes it or the owner must release access on the platform (dataEntryGrantsNoAuthority); none is stored. loginEmail comes from the platform login (loginEmailReadOnly).",
          "output": "person with name, login e-mail, status, country code and name, last update, consent validity, missing items with who resolves each, access completion and the current privacy text version (code, publication moment, current flag)."
        }
      }
    ]
  }
} as const;

export default definition;
