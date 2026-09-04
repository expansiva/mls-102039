/// <mls fileReference="_102039_/l2/controleChamados/web/shared/chamadoHub.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleChamadosChamadoHubBase } from '/_102039_/l2/controleChamados/web/shared/chamadoHub.js';
import type { QryListChamadoInput, QryListChamadoOutput, QryListComentarioOutput } from '/_102039_/l2/controleChamados/web/contracts/chamadoHub.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleChamadosChamadoHubBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_uiScenary = Assert<Assignable<typeof page.uiScenary, "base">>;
type _State_qryListChamadoState = Assert<Assignable<typeof page.qryListChamadoState, "idle" | "loading" | "success" | "error">>;
type _State_qryListChamadoSortBy = Assert<Assignable<typeof page.qryListChamadoSortBy, "open" | "closed" | QryListChamadoInput["sortBy"] | ''>>;
type _State_qryListChamadoSortOrder = Assert<Assignable<typeof page.qryListChamadoSortOrder, "asc" | "desc" | QryListChamadoInput["sortOrder"] | ''>>;
type _State_qryListChamadoData = Assert<Assignable<typeof page.qryListChamadoData, unknown[] | QryListChamadoOutput>>;
type _State_qryListComentarioState = Assert<Assignable<typeof page.qryListComentarioState, "idle" | "loading" | "success" | "error">>;
type _State_qryListComentarioData = Assert<Assignable<typeof page.qryListComentarioData, unknown[] | QryListComentarioOutput>>;
type _Action_loadQryListChamado = Assert<Assignable<typeof page.loadQryListChamado, (...args: any[]) => unknown>>;
type _Handler_handleQryListChamadoClick = Assert<Assignable<typeof page.handleQryListChamadoClick, (...args: any[]) => unknown>>;
type _Action_loadQryListComentario = Assert<Assignable<typeof page.loadQryListComentario, (...args: any[]) => unknown>>;
type _Handler_handleQryListComentarioClick = Assert<Assignable<typeof page.handleQryListComentarioClick, (...args: any[]) => unknown>>;
type _Action_setQryListChamadoSortBy = Assert<Assignable<typeof page.setQryListChamadoSortBy, (...args: any[]) => unknown>>;
type _Handler_handleQryListChamadoSortByChange = Assert<Assignable<typeof page.handleQryListChamadoSortByChange, (...args: any[]) => unknown>>;
type _Action_setQryListChamadoSortOrder = Assert<Assignable<typeof page.setQryListChamadoSortOrder, (...args: any[]) => unknown>>;
type _Handler_handleQryListChamadoSortOrderChange = Assert<Assignable<typeof page.handleQryListChamadoSortOrderChange, (...args: any[]) => unknown>>;

export {};