/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/country.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "onboarding",
  "repositoryName": "country",
  "tableName": "onboarding_country",
  "purpose": "transacao",
  "description": "onboarding_country",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "isoCode",
      "postgresType": "TEXT"
    },
    {
      "name": "name",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "status",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "details",
      "postgresType": "JSONB",
      "defaultSql": "'{}'::jsonb"
    }
  ],
  "primaryKey": [
    "id"
  ],
  "indexes": [
    {
      "name": "onboarding_country_isoCode",
      "columns": [
        "isoCode"
      ],
      "unique": true
    },
    {
      "name": "onboarding_country_name",
      "columns": [
        "name"
      ]
    },
    {
      "name": "onboarding_country_status",
      "columns": [
        "status"
      ]
    }
  ],
  "version": 1
} satisfies TableDefinition;

export const migrationPlan = {
  "format": "102034-schema-snapshot",
  "applied": false,
  "steps": [
    {
      "op": "createTable",
      "tableName": "onboarding_country",
      "name": "onboarding_country"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_country",
      "name": "onboarding_country_isoCode"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_country",
      "name": "onboarding_country_name"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_country",
      "name": "onboarding_country_status"
    }
  ],
  "blocked": []
} as const;
