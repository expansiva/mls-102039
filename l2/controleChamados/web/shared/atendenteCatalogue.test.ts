/// <mls fileReference="_102039_/l2/controleChamados/web/shared/atendenteCatalogue.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosAtendenteCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/atendenteCatalogue.js';
import type { CmdCreateAtendenteInput, CmdCreateAtendenteOutput, CmdInactivateAtendenteInput, CmdInactivateAtendenteOutput, CmdReactivateAtendenteInput, CmdReactivateAtendenteOutput, CmdUpdateAtendenteInput, CmdUpdateAtendenteOutput, QryGetAtendenteInput, QryGetAtendenteOutput, QryListAtendenteOutput } from '/_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosAtendenteCatalogueBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base" | "detail" | "createAtendente" | "updateAtendente" | "inactivateAtendente" | "reactivateAtendente">>;
type _State_qryListAtendenteState = Assert<Assignable<typeof page.qryListAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_qryListAtendenteData = Assert<Assignable<typeof page.qryListAtendenteData, unknown[] | QryListAtendenteOutput>>;
type _State_cmdCreateAtendenteState = Assert<Assignable<typeof page.cmdCreateAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_cmdCreateAtendentePlatformUserId = Assert<Assignable<typeof page.cmdCreateAtendentePlatformUserId, string | CmdCreateAtendenteInput["platformUserId"]>>;
type _State_cmdCreateAtendenteOutput = Assert<Assignable<typeof page.cmdCreateAtendenteOutput, CmdCreateAtendenteOutput | null>>;
type _State_cmdCreateAtendenteError = Assert<Assignable<typeof page.cmdCreateAtendenteError, string>>;
type _State_cmdUpdateAtendenteState = Assert<Assignable<typeof page.cmdUpdateAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_cmdUpdateAtendenteAtendenteId = Assert<Assignable<typeof page.cmdUpdateAtendenteAtendenteId, string | CmdUpdateAtendenteInput["atendenteId"]>>;
type _State_cmdUpdateAtendentePlatformUserId = Assert<Assignable<typeof page.cmdUpdateAtendentePlatformUserId, string | CmdUpdateAtendenteInput["platformUserId"]>>;
type _State_cmdUpdateAtendenteOutput = Assert<Assignable<typeof page.cmdUpdateAtendenteOutput, CmdUpdateAtendenteOutput | null>>;
type _State_cmdUpdateAtendenteError = Assert<Assignable<typeof page.cmdUpdateAtendenteError, string>>;
type _State_cmdInactivateAtendenteState = Assert<Assignable<typeof page.cmdInactivateAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_cmdInactivateAtendenteAtendenteId = Assert<Assignable<typeof page.cmdInactivateAtendenteAtendenteId, string | CmdInactivateAtendenteInput["atendenteId"]>>;
type _State_cmdInactivateAtendenteOutput = Assert<Assignable<typeof page.cmdInactivateAtendenteOutput, CmdInactivateAtendenteOutput | null>>;
type _State_cmdInactivateAtendenteError = Assert<Assignable<typeof page.cmdInactivateAtendenteError, string>>;
type _State_cmdReactivateAtendenteState = Assert<Assignable<typeof page.cmdReactivateAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_cmdReactivateAtendenteAtendenteId = Assert<Assignable<typeof page.cmdReactivateAtendenteAtendenteId, string | CmdReactivateAtendenteInput["atendenteId"]>>;
type _State_cmdReactivateAtendenteOutput = Assert<Assignable<typeof page.cmdReactivateAtendenteOutput, CmdReactivateAtendenteOutput | null>>;
type _State_cmdReactivateAtendenteError = Assert<Assignable<typeof page.cmdReactivateAtendenteError, string>>;
type _State_qryGetAtendenteState = Assert<Assignable<typeof page.qryGetAtendenteState, "idle" | "loading" | "success" | "error">>;
type _State_qryGetAtendenteAtendenteId = Assert<Assignable<typeof page.qryGetAtendenteAtendenteId, string | QryGetAtendenteInput["atendenteId"]>>;
type _State_qryGetAtendenteData = Assert<Assignable<typeof page.qryGetAtendenteData, QryGetAtendenteOutput | null>>;
type _Action_loadQryListAtendente = Assert<Assignable<typeof page.loadQryListAtendente, (...args: any[]) => unknown>>;
type _Handler_handleQryListAtendenteClick = Assert<Assignable<typeof page.handleQryListAtendenteClick, (...args: any[]) => unknown>>;
type _Action_cmdCreateAtendente = Assert<Assignable<typeof page.cmdCreateAtendente, (...args: any[]) => unknown>>;
type _Handler_handleCmdCreateAtendenteClick = Assert<Assignable<typeof page.handleCmdCreateAtendenteClick, (...args: any[]) => unknown>>;
type _Action_cmdUpdateAtendente = Assert<Assignable<typeof page.cmdUpdateAtendente, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateAtendenteClick = Assert<Assignable<typeof page.handleCmdUpdateAtendenteClick, (...args: any[]) => unknown>>;
type _Action_cmdInactivateAtendente = Assert<Assignable<typeof page.cmdInactivateAtendente, (...args: any[]) => unknown>>;
type _Handler_handleCmdInactivateAtendenteClick = Assert<Assignable<typeof page.handleCmdInactivateAtendenteClick, (...args: any[]) => unknown>>;
type _Action_cmdReactivateAtendente = Assert<Assignable<typeof page.cmdReactivateAtendente, (...args: any[]) => unknown>>;
type _Handler_handleCmdReactivateAtendenteClick = Assert<Assignable<typeof page.handleCmdReactivateAtendenteClick, (...args: any[]) => unknown>>;
type _Action_loadQryGetAtendente = Assert<Assignable<typeof page.loadQryGetAtendente, (...args: any[]) => unknown>>;
type _Handler_handleQryGetAtendenteClick = Assert<Assignable<typeof page.handleQryGetAtendenteClick, (...args: any[]) => unknown>>;
type _Action_setCmdCreateAtendentePlatformUserId = Assert<Assignable<typeof page.setCmdCreateAtendentePlatformUserId, (...args: any[]) => unknown>>;
type _Handler_handleCmdCreateAtendentePlatformUserIdChange = Assert<Assignable<typeof page.handleCmdCreateAtendentePlatformUserIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdUpdateAtendenteAtendenteId = Assert<Assignable<typeof page.setCmdUpdateAtendenteAtendenteId, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateAtendenteAtendenteIdChange = Assert<Assignable<typeof page.handleCmdUpdateAtendenteAtendenteIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdUpdateAtendentePlatformUserId = Assert<Assignable<typeof page.setCmdUpdateAtendentePlatformUserId, (...args: any[]) => unknown>>;
type _Handler_handleCmdUpdateAtendentePlatformUserIdChange = Assert<Assignable<typeof page.handleCmdUpdateAtendentePlatformUserIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdInactivateAtendenteAtendenteId = Assert<Assignable<typeof page.setCmdInactivateAtendenteAtendenteId, (...args: any[]) => unknown>>;
type _Handler_handleCmdInactivateAtendenteAtendenteIdChange = Assert<Assignable<typeof page.handleCmdInactivateAtendenteAtendenteIdChange, (...args: any[]) => unknown>>;
type _Action_setCmdReactivateAtendenteAtendenteId = Assert<Assignable<typeof page.setCmdReactivateAtendenteAtendenteId, (...args: any[]) => unknown>>;
type _Handler_handleCmdReactivateAtendenteAtendenteIdChange = Assert<Assignable<typeof page.handleCmdReactivateAtendenteAtendenteIdChange, (...args: any[]) => unknown>>;
type _Action_setQryGetAtendenteAtendenteId = Assert<Assignable<typeof page.setQryGetAtendenteAtendenteId, (...args: any[]) => unknown>>;
type _Handler_handleQryGetAtendenteAtendenteIdChange = Assert<Assignable<typeof page.handleQryGetAtendenteAtendenteIdChange, (...args: any[]) => unknown>>;

export {};