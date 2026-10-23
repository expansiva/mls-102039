/// <mls fileReference="_102039_/l1/onboarding/layer_3_domain/entities/country.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Country",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "Country",
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
        "name": "isoCode",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.displayName",
        "type": "string",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "active",
          "reachedBy": "actor"
        },
        {
          "state": "inactive",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "inactivateCountry",
          "from": [
            "active"
          ],
          "to": "inactive",
          "by": [
            "companyOwner"
          ],
          "ruleRefs": [
            "onlyOwnerMaintainsCountries",
            "onlyActiveCountryOffered"
          ]
        },
        {
          "transitionId": "reactivateCountry",
          "from": [
            "inactive"
          ],
          "to": "active",
          "by": [
            "companyOwner"
          ],
          "ruleRefs": [
            "onlyOwnerMaintainsCountries"
          ]
        }
      ]
    },
    "invariants": [
      "onlyOwnerMaintainsCountries",
      "countryIsoCodeUnique",
      "countryIsoCodeFormat",
      "unknownCountryNeverDefaulted"
    ],
    "imports": []
  }
} as const;

export default definition;
