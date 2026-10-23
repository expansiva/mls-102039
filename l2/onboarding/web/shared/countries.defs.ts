/// <mls fileReference="_102039_/l2/onboarding/web/shared/countries.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "countryId": {
        "type": "string",
        "sources": [
          "url"
        ],
        "effect": "select:countryForm",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "listCountries": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "countries"
      ]
    },
    "searchCountries": {
      "kind": "qry",
      "trigger": "searchCountries",
      "returns": [
        "countries"
      ]
    },
    "addCountry": {
      "kind": "cmd",
      "trigger": "addCountry",
      "returns": [
        "country"
      ],
      "writes": "Country.create"
    },
    "saveCountryChanges": {
      "kind": "cmd",
      "trigger": "saveCountryChanges",
      "returns": [
        "country"
      ],
      "writes": "Country.update"
    },
    "inactivateCountry": {
      "kind": "cmd",
      "trigger": "inactivateCountry",
      "returns": [
        "country"
      ],
      "writes": "Country.inactivateCountry"
    },
    "reactivateCountry": {
      "kind": "cmd",
      "trigger": "reactivateCountry",
      "returns": [
        "country"
      ],
      "writes": "Country.reactivateCountry"
    }
  },
  "states": {
    "countries": {
      "source": "listCountries.countries",
      "description": "the list of A country of the module country list with its ISO code, English name, status, name in the user language and version.",
      "organisms": [
        "countryActions",
        "countryForm",
        "countryList"
      ]
    },
    "selectedCountry": {
      "source": "entry.params.countryId",
      "description": "the id of the Country selected in countryList",
      "organisms": [
        "countryForm",
        "countryList"
      ]
    }
  },
  "journeys": [
    {
      "step": "maintainCountries/findCountry",
      "organisms": [
        "countryList"
      ]
    },
    {
      "step": "maintainCountries/addCountry",
      "organisms": [
        "countryForm"
      ]
    },
    {
      "step": "maintainCountries/editCountry",
      "organisms": [
        "countryList",
        "countryForm"
      ]
    },
    {
      "step": "maintainCountries/inactivateCountry",
      "organisms": [
        "countryActions"
      ]
    },
    {
      "step": "maintainCountries/reactivateCountry",
      "organisms": [
        "countryActions"
      ]
    }
  ],
  "rules": [
    "countryIsoCodeFormat",
    "countryIsoCodeUnique",
    "onlyActiveCountryOffered",
    "onlyOwnerMaintainsCountries"
  ],
  "access": {
    "actors": [
      "companyOwner"
    ],
    "grants": [
      "ownerMaintainCountries"
    ]
  }
} as const;
