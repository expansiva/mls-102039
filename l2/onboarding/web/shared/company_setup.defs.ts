/// <mls fileReference="_102039_/l2/onboarding/web/shared/company_setup.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:companyDataForm",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "getCompanySetup": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "company",
        "countries"
      ]
    },
    "saveCompany": {
      "kind": "cmd",
      "trigger": "saveCompany",
      "returns": [
        "company"
      ],
      "writes": "OrganizationCompany.update"
    }
  },
  "states": {
    "company": {
      "source": "getCompanySetup.company",
      "description": "The organization company of the signed-in login with its data and its computed preparation status.",
      "organisms": [
        "companyDataForm",
        "companyReadiness",
        "saveCompanyActions",
        "studioGuidance"
      ]
    },
    "countries": {
      "source": "getCompanySetup.countries",
      "description": "the list of An active country of the module country list.",
      "organisms": [
        "companyDataForm"
      ]
    }
  },
  "journeys": [
    {
      "step": "prepareCompany/openCompany",
      "organisms": [
        "companyReadiness",
        "companyDataForm"
      ]
    },
    {
      "step": "prepareCompany/chooseCompanyCountry",
      "organisms": [
        "companyDataForm"
      ]
    },
    {
      "step": "prepareCompany/saveCompany",
      "organisms": [
        "companyDataForm",
        "saveCompanyActions"
      ]
    },
    {
      "step": "prepareCompany/viewGuidance",
      "organisms": [
        "studioGuidance"
      ]
    }
  ],
  "rules": [
    "authorityErrorDistinctFromValidation",
    "companyContactNotDuplicated",
    "companyCountryNeverDefaulted",
    "companyNotAskedAgainForExistingData",
    "companyPreparedWhenRequiredSaved",
    "onlyActiveCountryOffered",
    "onlyOwnerPreparesCompany"
  ],
  "access": {
    "actors": [
      "companyOwner"
    ],
    "grants": [
      "ownerPrepareCompany",
      "ownerMaintainCountries"
    ]
  }
} as const;
