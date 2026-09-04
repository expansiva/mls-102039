/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/registrarComentarioChamado.defs.ts" enhancement="_blank"/>

export const definition = `page: Registrar comentário em chamado aberto
actor: atendente
purpose: Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado.
uxExperience: processWizard
The page extends the shared base class of this workspace: the shared travels in this pipeline and already carries the states, actions and handlers the page inherits. Render the experience around that intent — do not list fields and do not list routines.`;

export const pipeline = [
  {
    "id": "registrarComentarioChamado__l2_page",
    "type": "l2_page",
    "outputPath": "_102039_/l2/controleChamados/web/desktop/page11/registrarComentarioChamado.ts",
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/registrarComentarioChamado.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/shared/registrarComentarioChamadoDts.txt",
      "_102039_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "registrarComentarioChamado__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {},
    "agent": "agentCfeMaterializeGen"
  }
] as const;
