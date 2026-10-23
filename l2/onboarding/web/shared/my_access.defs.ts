/// <mls fileReference="_102039_/l2/onboarding/web/shared/my_access.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "organizationMemberId": {
        "type": "string",
        "sources": [
          "url"
        ],
        "effect": "select:privacyConsentDetail",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "getMyAccess": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "member",
        "countries",
        "consent"
      ]
    },
    "checkCountryConsent": {
      "kind": "qry",
      "trigger": "checkCountryConsent",
      "returns": [
        "consent"
      ]
    },
    "saveMyAccess": {
      "kind": "cmd",
      "trigger": "saveMyAccess",
      "returns": [
        "member",
        "consent"
      ],
      "writes": "OrganizationMember.update"
    }
  },
  "states": {
    "member": {
      "source": "getMyAccess.member",
      "description": "The signed-in person's own access record: identity data, read-only login e-mail and the computed access status.",
      "organisms": [
        "accessStatusSummary",
        "missingDataForm",
        "saveAccessActions"
      ]
    },
    "countries": {
      "source": "getMyAccess.countries",
      "description": "the list of An active country of the module list, with its ISO code, English name and name in the user language.",
      "organisms": [
        "missingDataForm"
      ]
    },
    "consent": {
      "source": "getMyAccess.consent",
      "description": "The privacy consent situation of the person for a given country: whether consent is required, whether the person already holds a valid consent, and the current privacy text when required.",
      "organisms": [
        "privacyConsentDetail"
      ]
    },
    "selectedOrganizationMember": {
      "source": "entry.params.organizationMemberId",
      "description": "the id of the OrganizationMember selected in missingDataForm",
      "organisms": [
        "missingDataForm",
        "privacyConsentDetail"
      ]
    }
  },
  "journeys": [
    {
      "step": "completeMyAccess/openMyAccess",
      "organisms": [
        "accessStatusSummary"
      ]
    },
    {
      "step": "completeMyAccess/chooseCountry",
      "organisms": [
        "missingDataForm"
      ]
    },
    {
      "step": "completeMyAccess/readPrivacyText",
      "organisms": [
        "privacyConsentDetail"
      ]
    },
    {
      "step": "completeMyAccess/saveMyAccess",
      "organisms": [
        "saveAccessActions",
        "accessStatusSummary"
      ]
    }
  ],
  "rules": [
    "accessCompleteByPlatformRule",
    "authorityErrorDistinctFromValidation",
    "consentFollowsEditedCountry",
    "consentNeverAutoAccepted",
    "countryFromActiveList",
    "currentVersionIsLatestPublished",
    "dataEntryGrantsNoAuthority",
    "loginEmailReadOnly",
    "newCurrentVersionRequiresReacceptance",
    "noSecondPerson",
    "onlyActiveCountryOffered",
    "onlyMissingDataAsked",
    "reacceptOnNewPrivacyVersion",
    "unknownCountryNeverDefaulted"
  ],
  "access": {
    "actors": [
      "companyOwner",
      "organizationMember"
    ],
    "grants": [
      "memberOwnAccess",
      "memberChooseCountry",
      "memberReadPrivacyText",
      "ownerOwnAccess",
      "ownerMaintainCountries",
      "ownerPublishPrivacyText",
      "ownerReviewPeople"
    ]
  }
} as const;
