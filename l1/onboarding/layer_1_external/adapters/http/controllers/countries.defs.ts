/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/http/controllers/countries.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "countries",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/requests/countries.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "countries",
    "handlers": [
      {
        "route": "onboarding.countries.addCountry",
        "kind": "command",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.addCountry",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      },
      {
        "route": "onboarding.countries.inactivateCountry",
        "kind": "command",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.inactivateCountry",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      },
      {
        "route": "onboarding.countries.listCountries",
        "kind": "query",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.listCountries",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      },
      {
        "route": "onboarding.countries.reactivateCountry",
        "kind": "command",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.reactivateCountry",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      },
      {
        "route": "onboarding.countries.saveCountryChanges",
        "kind": "command",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.saveCountryChanges",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      },
      {
        "route": "onboarding.countries.searchCountries",
        "kind": "query",
        "grantIds": [
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.countries.searchCountries",
        "contractPath": "l2/onboarding/web/contracts/countries.defs.ts",
        "contractInterface": "CountriesContracts"
      }
    ]
  }
} as const;

export default definition;
