/// <mls fileReference="_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosRegistrarComentarioChamadoBase } from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
import type { CmdRegisterComentarioInput, CmdRegisterComentarioOutput, QryAtendentePickerOutput, QryLocateChamadoOutput } from '/_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosRegistrarComentarioChamadoBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base" | "registerComentario">>;
type _State_qryLocateChamadoState = Assert<Assignable<typeof page.qryLocateChamadoState, "idle" | "loading" | "success" | "error">>;
type _State_qryLocateChamadoData = Assert<Assignable<typeof page.qryLocateChamadoData, unknown[] | QryLocateChamadoOutput>>;
type _State_cmdRegisterComentarioState = Assert<Assignable<typeof page.cmdRegisterComentarioState, "idle" | "loading" | "success" | "error">>;
type _State_cmdRegisterComentarioAtendenteId = Assert<Assignable<typeof page.cmdRegisterComentarioAtendenteId, string | CmdRegisterComentarioInput["atendenteId"]>>;
type _State_cmdRegisterComentarioChamadoId = Assert<Assignable<typeof page.cmdRegisterComentarioChamadoId, string | CmdRegisterComentarioInput["chamadoId"]>>;
type _State_cmdRegisterComentarioConteudo = Assert<Assignable<typeof page.cmdRegisterComentarioConteudo, string | CmdRegisterComentarioInput["conteudo"]>>;
type _State_cmdRegisterComentarioOutput = Assert<Assignable<typeof page.cmdRegisterComentarioOutput, CmdRegisterComentarioOutput | null>>;
type _State_cmdRegisterComentarioError = Assert<Assignable<typeof page.cmdRegisterComentarioError, string>>;
type _State_qryAtendentePickerState = Assert<Assignable<typeof page.qryAtendentePickerState, "idle" | "loading" | "success" | "error">>;
type _State_qryAtendentePickerData = Assert<Assignable<typeof page.qryAtendentePickerData, unknown[] | QryAtendentePickerOutput>>;
type _Action_loadQryLocateChamado = Assert<Assignable<typeof page.loadQryLocateChamado, (...args: any[]) => unknown>>;
type _Handler_handleQryLocateChamadoClick = Assert<Assignable<typeof page.handleQryLocateChamadoClick, (...args: any[]) => unknown>>;
type _Action_cmdRegisterComentario = Assert<Assignable<typeof page.cmdRegisterComentario, (...args: any[]) => unknown>>;
type _Handler_handleCmdRegisterComentarioClick = Assert<Assignable<typeof page.handleCmdRegisterComentarioClick, (...args: any[]) => unknown>>;
type _Action_loadQryAtendentePicker = Assert<Assignable<typeof page.loadQryAtendentePicker, (...args: any[]) => unknown>>;
type _Handler_handleQryAtendentePickerClick = Assert<Assignable<typeof page.handleQryAtendentePickerClick, (...args: any[]) => unknown>>;
type _Action_setCmdRegisterComentarioAtendenteId = Assert<Assignable<typeof page.setCmdRegisterComentarioAtendenteId, (...args: any[]) => unknown>>;
type _Handler_handleCmdRegisterComentarioAtendenteIdChange = Assert<Assignable<typeof page.handleCmdRegisterComentarioAtendenteIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdRegisterComentarioChamadoId = Assert<Assignable<typeof page.setCmdRegisterComentarioChamadoId, (...args: any[]) => unknown>>;
type _Handler_handleCmdRegisterComentarioChamadoIdChange = Assert<Assignable<typeof page.handleCmdRegisterComentarioChamadoIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdRegisterComentarioConteudo = Assert<Assignable<typeof page.setCmdRegisterComentarioConteudo, (...args: any[]) => unknown>>;
type _Handler_handleCmdRegisterComentarioConteudoChange = Assert<Assignable<typeof page.handleCmdRegisterComentarioConteudoChange, (...args: any[]) => unknown>>;

export {};