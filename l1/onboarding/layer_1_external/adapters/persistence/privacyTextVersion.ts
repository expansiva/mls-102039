/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersion.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinition = {
  "moduleId": "onboarding",
  "repositoryName": "privacyTextVersion",
  "tableName": "onboarding_privacytextversion",
  "purpose": "transacao",
  "description": "onboarding_privacytextversion",
  "backupHot": false,
  "storageProfile": "postgres",
  "writeMode": "sync",
  "columns": [
    {
      "name": "id",
      "postgresType": "TEXT"
    },
    {
      "name": "versionCode",
      "postgresType": "TEXT"
    },
    {
      "name": "status",
      "postgresType": "TEXT",
      "nullable": true
    },
    {
      "name": "publishedAt",
      "postgresType": "TIMESTAMPTZ",
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
      "name": "onboarding_privacytextversion_versionCode",
      "columns": [
        "versionCode"
      ],
      "unique": true
    },
    {
      "name": "onboarding_privacytextversion_status",
      "columns": [
        "status"
      ]
    },
    {
      "name": "onboarding_privacytextversion_publishedAt",
      "columns": [
        "publishedAt"
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
      "tableName": "onboarding_privacytextversion",
      "name": "onboarding_privacytextversion"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_privacytextversion",
      "name": "onboarding_privacytextversion_versionCode"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_privacytextversion",
      "name": "onboarding_privacytextversion_status"
    },
    {
      "op": "createIndex",
      "tableName": "onboarding_privacytextversion",
      "name": "onboarding_privacytextversion_publishedAt"
    }
  ],
  "blocked": []
} as const;
