/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/persistence/comentario.ts" enhancement="_blank"/>

import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const comentarioTableDef: TableDefinition = {
  moduleId: 'controleChamados',
  repositoryName: 'controleChamadosComentario',
  tableName: 'controlechamados_comentario',
  purpose: 'controle',
  description: 'Comentários associados a chamados e atendentes. Conteúdo armazenado em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'comentario_id', postgresType: 'UUID' },
    { name: 'chamado_id', postgresType: 'UUID' },
    { name: 'atendente_id', postgresType: 'UUID' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['comentario_id'],
  indexes: [
    {
      name: 'controlechamados_comentario_chamado_id_idx',
      columns: ['chamado_id'],
      unique: false,
    },
    {
      name: 'controlechamados_comentario_atendente_id_idx',
      columns: ['atendente_id'],
      unique: false,
    },
  ],
  version: 1,
};
