/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/persistence/chamado.ts" enhancement="_blank"/>

import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const chamadoTableDef: TableDefinition = {
  moduleId: 'controleChamados',
  repositoryName: 'controleChamadosChamado',
  tableName: 'controlechamados_chamado',
  purpose: 'controle',
  description: 'Chamados. Campos não indexados são armazenados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'chamado_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['chamado_id'],
  indexes: [
    {
      name: 'controlechamados_chamado_status_idx',
      columns: ['status'],
      unique: false,
    },
  ],
  version: 1,
};
