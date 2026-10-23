/// <mls fileReference="_102039_/l2/onboarding/web/shared/organization_people.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "organizationMemberId": {
        "type": "string",
        "sources": [
          "url"
        ],
        "effect": "select:personPendingDetail",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "qryOrganizationPeopleOverview": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "highlights",
        "people"
      ]
    },
    "qrySearchOrganizationPeople": {
      "kind": "qry",
      "trigger": "qrySearchOrganizationPeople",
      "returns": [
        "people"
      ]
    },
    "qryOrganizationPerson": {
      "kind": "qry",
      "trigger": "qryOrganizationPerson",
      "returns": [
        "person"
      ]
    }
  },
  "states": {
    "highlights": {
      "source": "qryOrganizationPeopleOverview.highlights",
      "description": "Counts of the organization people by access situation.",
      "organisms": [
        "accessHighlights"
      ]
    },
    "people": {
      "source": "qryOrganizationPeopleOverview.people",
      "description": "the list of An organization person with status, country, access completion and what is still missing.",
      "organisms": [
        "peopleList"
      ]
    },
    "person": {
      "source": "qryOrganizationPerson.person",
      "description": "One organization person with login e-mail, country, consent situation, missing items with who resolves each, and the current privacy text version.",
      "organisms": [
        "personPendingDetail"
      ]
    },
    "selectedOrganizationMember": {
      "source": "entry.params.organizationMemberId",
      "description": "the id of the OrganizationMember selected in peopleList",
      "organisms": [
        "peopleList",
        "personPendingDetail"
      ]
    }
  },
  "journeys": [
    {
      "step": "reviewOrganizationPeople/listPeople",
      "organisms": [
        "accessHighlights",
        "peopleList"
      ]
    },
    {
      "step": "reviewOrganizationPeople/inspectPerson",
      "organisms": [
        "personPendingDetail"
      ]
    }
  ],
  "rules": [
    "accessCompleteByPlatformRule",
    "currentVersionIsLatestPublished",
    "dataEntryGrantsNoAuthority",
    "listingProvesNoInvitation",
    "loginEmailReadOnly",
    "newCurrentVersionRequiresReacceptance",
    "reacceptOnNewPrivacyVersion",
    "unknownCountryNeverDefaulted"
  ],
  "access": {
    "actors": [
      "companyOwner"
    ],
    "grants": [
      "ownerOwnAccess",
      "ownerMaintainCountries",
      "ownerPublishPrivacyText",
      "ownerReviewPeople"
    ]
  }
} as const;
