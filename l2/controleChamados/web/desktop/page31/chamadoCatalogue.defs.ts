/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page31/chamadoCatalogue.defs.ts" enhancement="_blank"/>

export const definition = `page: Chamado
actor: atendente
purpose: Cadastro de Chamado.
uxExperience: entityRecordManagement
The page extends the shared base class of this workspace: the shared travels in this pipeline and already carries the states, actions and handlers the page inherits. Render the experience around that intent — do not list fields and do not list routines.`;

export const pipeline = [
  {
    "id": "chamadoCatalogue__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102039_/l2/controleChamados/web/desktop/page31/chamadoCatalogue.ts",
    "defPath": "_102039_/l2/controleChamados/web/desktop/page31/chamadoCatalogue.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/shared/chamadoCatalogueDts.txt",
      "_102039_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "chamadoCatalogue__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts",
      "_102020_/l4/collabux/templates/entityRecordManagement/page31.md"
    ],
    "visualStyle": {},
    "agent": "agentCfeMaterializeGen"
  }
] as const;
