/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "persistenceSeeds",
  "artifactId": "seeds",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/country.defs.ts",
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersion.defs.ts"
  ],
  "data": {
    "seedId": "seeds",
    "phase": "plan",
    "scenarios": [
      {
        "scenarioId": "completeMyAccess",
        "tableId": "country",
        "source": "journey:completeMyAccess",
        "constraints": [
          "uniqueKeys:isoCode"
        ],
        "refs": [],
        "states": [],
        "entityId": "Country",
        "stateField": "status"
      },
      {
        "scenarioId": "maintainCountries",
        "tableId": "country",
        "source": "journey:maintainCountries",
        "constraints": [
          "state:active",
          "uniqueKeys:isoCode"
        ],
        "refs": [],
        "states": [
          "active"
        ],
        "entityId": "Country",
        "stateField": "status"
      },
      {
        "scenarioId": "prepareCompany",
        "tableId": "country",
        "source": "journey:prepareCompany",
        "constraints": [
          "uniqueKeys:isoCode"
        ],
        "refs": [],
        "states": [],
        "entityId": "Country",
        "stateField": "status"
      },
      {
        "scenarioId": "completeMyAccess",
        "tableId": "privacyTextVersion",
        "source": "journey:completeMyAccess",
        "constraints": [
          "uniqueKeys:versionCode"
        ],
        "refs": [],
        "states": [],
        "entityId": "PrivacyTextVersion",
        "stateField": "status"
      },
      {
        "scenarioId": "publishPrivacyText",
        "tableId": "privacyTextVersion",
        "source": "journey:publishPrivacyText",
        "constraints": [
          "state:draft",
          "uniqueKeys:versionCode"
        ],
        "refs": [],
        "states": [
          "draft"
        ],
        "entityId": "PrivacyTextVersion",
        "stateField": "status"
      }
    ],
    "dependencies": [
      {
        "entityId": "CompanyContact",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Country",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "OrganizationCompany",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "OrganizationMember",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "PrivacyTextVersion",
        "kind": "module",
        "seeded": false
      }
    ],
    "datasets": [
      {
        "datasetId": "country",
        "tableId": "country",
        "owners": [
          "completeMyAccess",
          "maintainCountries",
          "prepareCompany"
        ]
      },
      {
        "datasetId": "privacyTextVersion",
        "tableId": "privacyTextVersion",
        "owners": [
          "completeMyAccess",
          "publishPrivacyText"
        ]
      }
    ],
    "fixture": {
      "schemaVersion": "2026-09-27-m1-certification-fixture-v1",
      "phase": "plan",
      "targets": [
        "memory",
        "development"
      ],
      "datasets": [
        {
          "supportId": "data:Country",
          "entityId": "Country",
          "tableId": "country",
          "dependsOn": [],
          "sourceRefs": [
            "grant:memberChooseCountry",
            "grant:ownerMaintainCountries",
            "journey:completeMyAccess/chooseCountry",
            "journey:completeMyAccess/openMyAccess",
            "journey:completeMyAccess/readPrivacyText",
            "journey:completeMyAccess/saveMyAccess",
            "journey:maintainCountries/addCountry",
            "journey:maintainCountries/editCountry",
            "journey:maintainCountries/findCountry",
            "journey:maintainCountries/inactivateCountry",
            "journey:maintainCountries/reactivateCountry",
            "journey:prepareCompany/chooseCompanyCountry",
            "journey:prepareCompany/openCompany",
            "journey:prepareCompany/saveCompany",
            "journey:prepareCompany/viewGuidance",
            "journey:reviewOrganizationPeople/inspectPerson",
            "journey:reviewOrganizationPeople/listPeople",
            "ontology:Country/lifecycleStates/active",
            "ontology:Country/lifecycleStates/inactive",
            "relationship:Country/companyCountry",
            "relationship:Country/memberCountry",
            "relationship:OrganizationCompany/companyCountry",
            "relationship:OrganizationMember/memberCountry"
          ]
        },
        {
          "supportId": "data:PrivacyTextVersion",
          "entityId": "PrivacyTextVersion",
          "tableId": "privacyTextVersion",
          "dependsOn": [],
          "sourceRefs": [
            "grant:memberReadPrivacyText",
            "grant:ownerPublishPrivacyText",
            "journey:completeMyAccess/chooseCountry",
            "journey:completeMyAccess/openMyAccess",
            "journey:completeMyAccess/readPrivacyText",
            "journey:completeMyAccess/saveMyAccess",
            "journey:publishPrivacyText/createVersion",
            "journey:publishPrivacyText/publishVersion",
            "journey:publishPrivacyText/viewCurrentVersion",
            "journey:reviewOrganizationPeople/inspectPerson",
            "journey:reviewOrganizationPeople/listPeople",
            "ontology:PrivacyTextVersion/lifecycleStates/draft",
            "relationship:OrganizationMember/memberAcceptedVersion",
            "relationship:PrivacyTextVersion/memberAcceptedVersion"
          ]
        }
      ],
      "runtime": [
        {
          "supportId": "identity:companyOwner",
          "kind": "identity",
          "entityId": "OrganizationMember",
          "actorRefs": [
            "companyOwner"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for companyOwner bound to OrganizationMember",
          "owner": "runtime"
        },
        {
          "supportId": "identity:organizationMember",
          "kind": "identity",
          "entityId": "OrganizationMember",
          "actorRefs": [
            "organizationMember"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for organizationMember bound to OrganizationMember",
          "owner": "runtime"
        },
        {
          "supportId": "mdm:OrganizationCompany",
          "kind": "mdm",
          "entityId": "OrganizationCompany",
          "actorRefs": [
            "companyOwner",
            "organizationMember"
          ],
          "gap": "RUNTIME_MDM_FIXTURE_UNREFERENCED: no verified runtime capability provisions and removes OrganizationCompany records by execution id",
          "owner": "runtime"
        }
      ],
      "gaps": []
    }
  }
} as const;

export default definition;
