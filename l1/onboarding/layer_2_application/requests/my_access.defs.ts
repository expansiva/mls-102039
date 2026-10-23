/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/my_access.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "my_access",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationMember.defs.ts"
  ],
  "data": {
    "pageId": "my_access",
    "requests": [
      {
        "route": "onboarding.my_access.getMyAccess",
        "kind": "qry",
        "uses": [
          "getOrganizationMember",
          "listCountry",
          "listPrivacyTextVersion"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "member",
            "entity": "OrganizationMember",
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
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.displayName",
                "path": "details.displayName"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "consent.privacyText",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details.text",
                "path": "details.text"
              },
              {
                "field": "details.isProvisional",
                "path": "details.isProvisional"
              },
              {
                "field": "details.isCurrent",
                "path": "details.isCurrent"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "consent.details.onboarding.consentValid",
            "rules": [
              "reacceptOnNewPrivacyVersion"
            ]
          },
          {
            "kind": "unresolved",
            "path": "consent.details.onboarding.consentRequired",
            "reason": "Interface ConsentState groups outputs; it is not a list page (items plus paging keys), so no entity owns its readonly details.onboarding.consentRequired."
          }
        ],
        "params": [],
        "rules": [
          "noSecondPerson",
          "loginEmailReadOnly",
          "onlyMissingDataAsked",
          "onlyActiveCountryOffered",
          "countryFromActiveList",
          "unknownCountryNeverDefaulted",
          "currentVersionIsLatestPublished",
          "reacceptOnNewPrivacyVersion",
          "consentNeverAutoAccepted",
          "accessCompleteByPlatformRule"
        ],
        "doc": {
          "raw": "Purpose: Loads everything the Complete my access page needs in one call: the signed-in person’s access status, the active country list and the privacy consent situation for the person’s saved country.\nInput: None. The person is resolved by the platform session from the login.\nProcessing: Reads the session person (noSecondPerson: never creates or links another person). loginEmail is read from the platform login, never stored (loginEmailReadOnly). Computes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule, onlyMissingDataAsked). Lists only active countries ordered by name with displayName translated from the ISO code into the user language (onlyActiveCountryOffered, countryFromActiveList). An unknown country stays empty, never defaulted (unknownCountryNeverDefaulted). Computes consentRequired from the saved country and consentValid as a non-revoked consent for the current version (reacceptOnNewPrivacyVersion); when required, attaches the latest published privacy text (currentVersionIsLatestPublished). No acceptance is ever pre-filled (consentNeverAutoAccepted). Derived fields are computed, never stored.\nOutput: The person’s access record with id, version, name, country, login e-mail, missing items and access status; the active countries; and the consent state with the current privacy text when the saved country requires consent.",
          "purpose": "Loads everything the Complete my access page needs in one call: the signed-in person’s access status, the active country list and the privacy consent situation for the person’s saved country.",
          "input": "None. The person is resolved by the platform session from the login.",
          "processing": "Reads the session person (noSecondPerson: never creates or links another person). loginEmail is read from the platform login, never stored (loginEmailReadOnly). Computes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule, onlyMissingDataAsked). Lists only active countries ordered by name with displayName translated from the ISO code into the user language (onlyActiveCountryOffered, countryFromActiveList). An unknown country stays empty, never defaulted (unknownCountryNeverDefaulted). Computes consentRequired from the saved country and consentValid as a non-revoked consent for the current version (reacceptOnNewPrivacyVersion); when required, attaches the latest published privacy text (currentVersionIsLatestPublished). No acceptance is ever pre-filled (consentNeverAutoAccepted). Derived fields are computed, never stored.",
          "output": "The person’s access record with id, version, name, country, login e-mail, missing items and access status; the active countries; and the consent state with the current privacy text when the saved country requires consent."
        }
      },
      {
        "route": "onboarding.my_access.checkCountryConsent",
        "kind": "qry",
        "uses": [
          "listPrivacyTextVersion"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "consent.privacyText",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details.text",
                "path": "details.text"
              },
              {
                "field": "details.isProvisional",
                "path": "details.isProvisional"
              },
              {
                "field": "details.isCurrent",
                "path": "details.isCurrent"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "consent.details.onboarding.consentRequired",
            "rules": [
              "consentFollowsEditedCountry"
            ]
          },
          {
            "kind": "computed",
            "path": "consent.details.onboarding.consentValid",
            "rules": [
              "reacceptOnNewPrivacyVersion"
            ]
          }
        ],
        "params": [],
        "rules": [
          "consentFollowsEditedCountry",
          "countryFromActiveList",
          "currentVersionIsLatestPublished",
          "reacceptOnNewPrivacyVersion",
          "consentNeverAutoAccepted"
        ],
        "doc": {
          "raw": "Purpose: Tells, for the country currently chosen on screen and before saving, whether privacy consent is required and returns the current privacy text when it is.\nInput: countryCode: two-letter ISO code of the country the person just picked from the active list (not saved yet).\nProcessing: Applies the platform rule for the edited country (consentFollowsEditedCountry); the code must be an active country (countryFromActiveList). When consent is required, loads the latest published privacy text version (currentVersionIsLatestPublished) and computes consentValid for the session person against that version (reacceptOnNewPrivacyVersion). Never records or implies an acceptance (consentNeverAutoAccepted). Nothing is written.\nOutput: The consent state for that country: consentRequired, consentValid and, when required, the current privacy text with version code, publication date, provisional and current flags.",
          "purpose": "Tells, for the country currently chosen on screen and before saving, whether privacy consent is required and returns the current privacy text when it is.",
          "input": "countryCode: two-letter ISO code of the country the person just picked from the active list (not saved yet).",
          "processing": "Applies the platform rule for the edited country (consentFollowsEditedCountry); the code must be an active country (countryFromActiveList). When consent is required, loads the latest published privacy text version (currentVersionIsLatestPublished) and computes consentValid for the session person against that version (reacceptOnNewPrivacyVersion). Never records or implies an acceptance (consentNeverAutoAccepted). Nothing is written.",
          "output": "The consent state for that country: consentRequired, consentValid and, when required, the current privacy text with version code, publication date, provisional and current flags."
        }
      },
      {
        "route": "onboarding.my_access.saveMyAccess",
        "kind": "cmd",
        "uses": [
          "updateOrganizationMember",
          "listPrivacyTextVersion"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "member",
            "entity": "OrganizationMember",
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
                "field": "details.identification.name",
                "path": "details.identification.name"
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
            "kind": "entity",
            "path": "consent.privacyText",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details.text",
                "path": "details.text"
              },
              {
                "field": "details.isProvisional",
                "path": "details.isProvisional"
              },
              {
                "field": "details.isCurrent",
                "path": "details.isCurrent"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "consent.details.onboarding.consentRequired",
            "rules": [
              "consentFollowsEditedCountry"
            ]
          },
          {
            "kind": "unresolved",
            "path": "consent.details.onboarding.consentValid",
            "reason": "Interface ConsentState groups outputs; it is not a list page (items plus paging keys), so no entity owns its readonly details.onboarding.consentValid."
          }
        ],
        "params": [],
        "rules": [
          "noSecondPerson",
          "loginEmailReadOnly",
          "onlyMissingDataAsked",
          "countryFromActiveList",
          "unknownCountryNeverDefaulted",
          "consentFollowsEditedCountry",
          "consentNeverAutoAccepted",
          "reacceptOnNewPrivacyVersion",
          "newCurrentVersionRequiresReacceptance",
          "accessCompleteByPlatformRule",
          "dataEntryGrantsNoAuthority",
          "authorityErrorDistinctFromValidation"
        ],
        "doc": {
          "raw": "Purpose: Saves the signed-in person’s missing name and country and, when given, the explicit privacy acceptance, then returns the new access status.\nInput: id and version: the session person’s record and the version read, for optimistic concurrency. details.identification.name: the missing details.identification.name, only when it was missing. details.identification.countryCode: ISO code chosen from the active list, only when it was missing. details.person.privacyConsent.consentVersion: version code of the privacy text the person explicitly ticked, absent when not ticked. details.person.privacyConsent.consentedAt: the moment the person ticked the acceptance (ISO timestamp), sent only together with details.person.privacyConsent.consentVersion. details.person.privacyConsent.channel: how the acceptance was given (checkbox on desktop or mobile).\nProcessing: Updates only the session person (noSecondPerson); the e-mail is never accepted or stored (loginEmailReadOnly). Writes only name and country that were missing (onlyMissingDataAsked); refuses a country not active in the list and never defaults an empty one (countryFromActiveList, unknownCountryNeverDefaulted). Consent is recorded only when consentVersion is sent by the person’s explicit tick (consentNeverAutoAccepted); it must equal the current published version code (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance); records consentVersion, consentedAt (refusing a missing or future moment; the server may cap it to the save moment) and channel. Consent requirement is decided for the saved country (consentFollowsEditedCountry). Recomputes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule); these derived fields are computed, never stored. Never grants roles or permissions (dataEntryGrantsNoAuthority). Version conflicts and authority errors are returned distinct from validation errors (authorityErrorDistinctFromValidation).\nOutput: The person’s access record in its new state with the new version, saved name and country, remaining missing items and access status, plus the consent state for the saved country.",
          "purpose": "Saves the signed-in person’s missing name and country and, when given, the explicit privacy acceptance, then returns the new access status.",
          "input": "id and version: the session person’s record and the version read, for optimistic concurrency. details.identification.name: the missing details.identification.name, only when it was missing. details.identification.countryCode: ISO code chosen from the active list, only when it was missing. details.person.privacyConsent.consentVersion: version code of the privacy text the person explicitly ticked, absent when not ticked. details.person.privacyConsent.consentedAt: the moment the person ticked the acceptance (ISO timestamp), sent only together with details.person.privacyConsent.consentVersion. details.person.privacyConsent.channel: how the acceptance was given (checkbox on desktop or mobile).",
          "processing": "Updates only the session person (noSecondPerson); the e-mail is never accepted or stored (loginEmailReadOnly). Writes only name and country that were missing (onlyMissingDataAsked); refuses a country not active in the list and never defaults an empty one (countryFromActiveList, unknownCountryNeverDefaulted). Consent is recorded only when consentVersion is sent by the person’s explicit tick (consentNeverAutoAccepted); it must equal the current published version code (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance); records consentVersion, consentedAt (refusing a missing or future moment; the server may cap it to the save moment) and channel. Consent requirement is decided for the saved country (consentFollowsEditedCountry). Recomputes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule); these derived fields are computed, never stored. Never grants roles or permissions (dataEntryGrantsNoAuthority). Version conflicts and authority errors are returned distinct from validation errors (authorityErrorDistinctFromValidation).",
          "output": "The person’s access record in its new state with the new version, saved name and country, remaining missing items and access status, plus the consent state for the saved country."
        }
      }
    ]
  }
} as const;

export default definition;
