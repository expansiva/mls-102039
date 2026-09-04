/// <mls fileReference="_102039_/l2/controleChamados/web/shared/chamadoCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { QryListChamadoInput, QryListChamadoOutput, CmdCreateChamadoInput, CmdCreateChamadoOutput, CmdUpdateChamadoInput, CmdUpdateChamadoOutput, CmdDeleteChamadoInput, CmdDeleteChamadoOutput, QryGetChamadoInput, QryGetChamadoOutput, QryLocateChamadoInput, QryLocateChamadoOutput, CmdCloseChamadoInput, CmdCloseChamadoOutput } from '/_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.js';
import { qryListChamadoRoute, cmdCreateChamadoRoute, cmdUpdateChamadoRoute, cmdDeleteChamadoRoute, qryGetChamadoRoute, qryLocateChamadoRoute, cmdCloseChamadoRoute } from '/_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.js';
export type { QryListChamadoInput, QryListChamadoOutput, CmdCreateChamadoInput, CmdCreateChamadoOutput, CmdUpdateChamadoInput, CmdUpdateChamadoOutput, CmdDeleteChamadoInput, CmdDeleteChamadoOutput, QryGetChamadoInput, QryGetChamadoOutput, QryLocateChamadoInput, QryLocateChamadoOutput, CmdCloseChamadoInput, CmdCloseChamadoOutput } from '/_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.js';

const KEYS = ['ui.chamadoCatalogue.status','ui.chamadoCatalogue.scenary','ui.chamadoCatalogue.action.qryListChamado.status','ui.chamadoCatalogue.input.qryListChamado.sortBy','ui.chamadoCatalogue.input.qryListChamado.sortOrder','ui.chamadoCatalogue.data.qryListChamado','ui.chamadoCatalogue.action.cmdCreateChamado.status','ui.chamadoCatalogue.input.cmdCreateChamado.titulo','ui.chamadoCatalogue.input.cmdCreateChamado.descricao','ui.chamadoCatalogue.input.cmdCreateChamado.status','ui.chamadoCatalogue.output.cmdCreateChamado','ui.chamadoCatalogue.action.cmdCreateChamado.error','ui.chamadoCatalogue.action.cmdUpdateChamado.status','ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId','ui.chamadoCatalogue.input.cmdUpdateChamado.titulo','ui.chamadoCatalogue.input.cmdUpdateChamado.descricao','ui.chamadoCatalogue.input.cmdUpdateChamado.status','ui.chamadoCatalogue.output.cmdUpdateChamado','ui.chamadoCatalogue.action.cmdUpdateChamado.error','ui.chamadoCatalogue.action.cmdDeleteChamado.status','ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId','ui.chamadoCatalogue.output.cmdDeleteChamado','ui.chamadoCatalogue.action.cmdDeleteChamado.error','ui.chamadoCatalogue.action.qryGetChamado.status','ui.chamadoCatalogue.input.qryGetChamado.chamadoId','ui.chamadoCatalogue.data.qryGetChamado','ui.chamadoCatalogue.action.qryLocateChamado.status','ui.chamadoCatalogue.data.qryLocateChamado','ui.chamadoCatalogue.action.cmdCloseChamado.status','ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId','ui.chamadoCatalogue.input.cmdCloseChamado.status','ui.chamadoCatalogue.output.cmdCloseChamado','ui.chamadoCatalogue.action.cmdCloseChamado.error'];
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

export class ControleChamadosChamadoCatalogueBase extends CollabLitElement {
/** state status — pageStatus */ @property() status: string = '';
/** state ui.chamadoCatalogue.scenary — uiScenary, values: base|detail|createChamado|updateChamado|closeChamado */ @property() uiScenary: 'base'|'detail'|'createChamado'|'updateChamado'|'closeChamado' = 'base';
/** state qryListChamadoState — actionStatus, values: idle|loading|success|error */ @property() qryListChamadoState: ActionStatus = 'idle';
/** state qryListChamadoSortBy — input, values: open|closed */ @property() qryListChamadoSortBy: string = '';
/** state qryListChamadoSortOrder — input, values: asc|desc */ @property() qryListChamadoSortOrder: string = '';
/** state qryListChamadoData — queryResult, outputShape: array */ @property() qryListChamadoData: QryListChamadoOutput[] = [];
/** state cmdCreateChamadoState — actionStatus, values: idle|loading|success|error */ @property() cmdCreateChamadoState: ActionStatus = 'idle';
/** state cmdCreateChamadoTitulo — input */ @property() cmdCreateChamadoTitulo: string = '';
/** state cmdCreateChamadoDescricao — input */ @property() cmdCreateChamadoDescricao: string = '';
/** state cmdCreateChamadoStatus — input, values: open|closed */ @property() cmdCreateChamadoStatus: string = '';
/** state cmdCreateChamadoOutput — commandOutput */ @property() cmdCreateChamadoOutput: CmdCreateChamadoOutput|null = null;
/** state cmdCreateChamadoError — actionError */ @property() cmdCreateChamadoError: string = '';
/** state cmdUpdateChamadoState — actionStatus, values: idle|loading|success|error */ @property() cmdUpdateChamadoState: ActionStatus = 'idle';
/** state cmdUpdateChamadoChamadoId — input */ @property() cmdUpdateChamadoChamadoId: string = '';
/** state cmdUpdateChamadoTitulo — input */ @property() cmdUpdateChamadoTitulo: string = '';
/** state cmdUpdateChamadoDescricao — input */ @property() cmdUpdateChamadoDescricao: string = '';
/** state cmdUpdateChamadoStatus — input, values: open|closed */ @property() cmdUpdateChamadoStatus: string = '';
/** state cmdUpdateChamadoOutput — commandOutput */ @property() cmdUpdateChamadoOutput: CmdUpdateChamadoOutput|null = null;
/** state cmdUpdateChamadoError — actionError */ @property() cmdUpdateChamadoError: string = '';
/** state cmdDeleteChamadoState — actionStatus, values: idle|loading|success|error */ @property() cmdDeleteChamadoState: ActionStatus = 'idle';
/** state cmdDeleteChamadoChamadoId — input */ @property() cmdDeleteChamadoChamadoId: string = '';
/** state cmdDeleteChamadoOutput — commandOutput */ @property() cmdDeleteChamadoOutput: CmdDeleteChamadoOutput|null = null;
/** state cmdDeleteChamadoError — actionError */ @property() cmdDeleteChamadoError: string = '';
/** state qryGetChamadoState — actionStatus, values: idle|loading|success|error */ @property() qryGetChamadoState: ActionStatus = 'idle';
/** state qryGetChamadoChamadoId — input */ @property() qryGetChamadoChamadoId: string = '';
/** state qryGetChamadoData — queryResult, outputShape: object */ @property() qryGetChamadoData: QryGetChamadoOutput|null = null;
/** state qryLocateChamadoState — actionStatus, values: idle|loading|success|error */ @property() qryLocateChamadoState: ActionStatus = 'idle';
/** state qryLocateChamadoData — queryResult, outputShape: array */ @property() qryLocateChamadoData: QryLocateChamadoOutput[] = [];
/** state cmdCloseChamadoState — actionStatus, values: idle|loading|success|error */ @property() cmdCloseChamadoState: ActionStatus = 'idle';
/** state cmdCloseChamadoChamadoId — input */ @property() cmdCloseChamadoChamadoId: string = '';
/** state cmdCloseChamadoStatus — input, values: open|closed */ @property() cmdCloseChamadoStatus: string = '';
/** state cmdCloseChamadoOutput — commandOutput */ @property() cmdCloseChamadoOutput: CmdCloseChamadoOutput|null = null;
/** state cmdCloseChamadoError — actionError */ @property() cmdCloseChamadoError: string = '';

connectedCallback(): void {
 super.connectedCallback();
 const defaults: Record<string, unknown> = {'ui.chamadoCatalogue.status':'','ui.chamadoCatalogue.scenary':'base','ui.chamadoCatalogue.action.qryListChamado.status':'idle','ui.chamadoCatalogue.input.qryListChamado.sortBy':'','ui.chamadoCatalogue.input.qryListChamado.sortOrder':'','ui.chamadoCatalogue.data.qryListChamado':[],'ui.chamadoCatalogue.action.cmdCreateChamado.status':'idle','ui.chamadoCatalogue.input.cmdCreateChamado.titulo':'','ui.chamadoCatalogue.input.cmdCreateChamado.descricao':'','ui.chamadoCatalogue.input.cmdCreateChamado.status':'','ui.chamadoCatalogue.output.cmdCreateChamado':null,'ui.chamadoCatalogue.action.cmdCreateChamado.error':'','ui.chamadoCatalogue.action.cmdUpdateChamado.status':'idle','ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId':'','ui.chamadoCatalogue.input.cmdUpdateChamado.titulo':'','ui.chamadoCatalogue.input.cmdUpdateChamado.descricao':'','ui.chamadoCatalogue.input.cmdUpdateChamado.status':'','ui.chamadoCatalogue.output.cmdUpdateChamado':null,'ui.chamadoCatalogue.action.cmdUpdateChamado.error':'','ui.chamadoCatalogue.action.cmdDeleteChamado.status':'idle','ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId':'','ui.chamadoCatalogue.output.cmdDeleteChamado':null,'ui.chamadoCatalogue.action.cmdDeleteChamado.error':'','ui.chamadoCatalogue.action.qryGetChamado.status':'idle','ui.chamadoCatalogue.input.qryGetChamado.chamadoId':'','ui.chamadoCatalogue.data.qryGetChamado':null,'ui.chamadoCatalogue.action.qryLocateChamado.status':'idle','ui.chamadoCatalogue.data.qryLocateChamado':[],'ui.chamadoCatalogue.action.cmdCloseChamado.status':'idle','ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId':'','ui.chamadoCatalogue.input.cmdCloseChamado.status':'','ui.chamadoCatalogue.output.cmdCloseChamado':null,'ui.chamadoCatalogue.action.cmdCloseChamado.error':''};
 KEYS.forEach((key: string) => this.initStateValue(key, defaults[key]));
 this.syncRouteParams(); this.applyUrlScenary(); subscribe(KEYS, this); void this.loadQryListChamado(); void this.loadQryLocateChamado();
}
disconnectedCallback(): void { unsubscribe(KEYS, this); super.disconnectedCallback(); }
/** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
handleIcaStateChange(key: string, value: unknown): void { const map: Record<string, string> = {'ui.chamadoCatalogue.status':'status','ui.chamadoCatalogue.scenary':'uiScenary','ui.chamadoCatalogue.action.qryListChamado.status':'qryListChamadoState','ui.chamadoCatalogue.input.qryListChamado.sortBy':'qryListChamadoSortBy','ui.chamadoCatalogue.input.qryListChamado.sortOrder':'qryListChamadoSortOrder','ui.chamadoCatalogue.data.qryListChamado':'qryListChamadoData','ui.chamadoCatalogue.action.cmdCreateChamado.status':'cmdCreateChamadoState','ui.chamadoCatalogue.input.cmdCreateChamado.titulo':'cmdCreateChamadoTitulo','ui.chamadoCatalogue.input.cmdCreateChamado.descricao':'cmdCreateChamadoDescricao','ui.chamadoCatalogue.input.cmdCreateChamado.status':'cmdCreateChamadoStatus','ui.chamadoCatalogue.output.cmdCreateChamado':'cmdCreateChamadoOutput','ui.chamadoCatalogue.action.cmdCreateChamado.error':'cmdCreateChamadoError','ui.chamadoCatalogue.action.cmdUpdateChamado.status':'cmdUpdateChamadoState','ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId':'cmdUpdateChamadoChamadoId','ui.chamadoCatalogue.input.cmdUpdateChamado.titulo':'cmdUpdateChamadoTitulo','ui.chamadoCatalogue.input.cmdUpdateChamado.descricao':'cmdUpdateChamadoDescricao','ui.chamadoCatalogue.input.cmdUpdateChamado.status':'cmdUpdateChamadoStatus','ui.chamadoCatalogue.output.cmdUpdateChamado':'cmdUpdateChamadoOutput','ui.chamadoCatalogue.action.cmdUpdateChamado.error':'cmdUpdateChamadoError','ui.chamadoCatalogue.action.cmdDeleteChamado.status':'cmdDeleteChamadoState','ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId':'cmdDeleteChamadoChamadoId','ui.chamadoCatalogue.output.cmdDeleteChamado':'cmdDeleteChamadoOutput','ui.chamadoCatalogue.action.cmdDeleteChamado.error':'cmdDeleteChamadoError','ui.chamadoCatalogue.action.qryGetChamado.status':'qryGetChamadoState','ui.chamadoCatalogue.input.qryGetChamado.chamadoId':'qryGetChamadoChamadoId','ui.chamadoCatalogue.data.qryGetChamado':'qryGetChamadoData','ui.chamadoCatalogue.action.qryLocateChamado.status':'qryLocateChamadoState','ui.chamadoCatalogue.data.qryLocateChamado':'qryLocateChamadoData','ui.chamadoCatalogue.action.cmdCloseChamado.status':'cmdCloseChamadoState','ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId':'cmdCloseChamadoChamadoId','ui.chamadoCatalogue.input.cmdCloseChamado.status':'cmdCloseChamadoStatus','ui.chamadoCatalogue.output.cmdCloseChamado':'cmdCloseChamadoOutput','ui.chamadoCatalogue.action.cmdCloseChamado.error':'cmdCloseChamadoError'}; const field = map[key]; if (field) (this as unknown as Record<string, unknown>)[field] = value ?? (field.endsWith('Data') ? [] : ''); this.requestUpdate(); }
private initStateValue(key: string, fallback: unknown): void { const value = getState(key) ?? fallback; setState(key, value); this.handleIcaStateChange(key, value); }
private syncRouteParams(): void { const m = window.location.pathname.match(/^\/controleChamados\/chamadoCatalogue(?:\/([^/]+))?\/?$/); const raw = m?.[1] ?? ''; let id = ''; try { id = raw ? decodeURIComponent(raw) : ''; } catch { id = raw; } if (id && !this.cmdCloseChamadoChamadoId) { this.setCmdCloseChamadoChamadoId(id); } }
private readErrorMessage(error: unknown, fallback: string): string { if (error && typeof error === 'object' && 'message' in error && typeof (error as {message?: unknown}).message === 'string') return (error as {message: string}).message; return fallback; }
private setStatus(key: string, status: ActionStatus): void { setState(key, status); }
private async refreshAll(): Promise<boolean> { await this.loadQryListChamado(); if (this.qryListChamadoState === 'error') return false; await this.loadQryGetChamado(); if (this.qryGetChamadoState === 'error') return false; await this.loadQryLocateChamado(); return this.qryLocateChamadoState !== 'error'; }

  /** setter for state ui.chamadoCatalogue.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createChamado', 'updateChamado', 'closeChamado'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && (!this.qryGetChamadoChamadoId)) next = 'base';
    if (value === 'updateChamado' && (!this.cmdUpdateChamadoChamadoId)) next = 'base';
    if (value === 'closeChamado' && (!this.cmdCloseChamadoChamadoId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.chamadoCatalogue.scenary', next);
    this.syncScenaryQuery(next);
    this.requestUpdate();
  }

  /** handler for action set.uiScenary — bind UI events here */
  handleUiScenaryChange(event: Event): void {
    const custom = event as CustomEvent<{ value?: unknown }>;
    const fromDetail: string = custom.detail && typeof custom.detail.value === 'string' ? custom.detail.value : '';
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = fromDetail || (target && 'value' in target ? String(target.value) : '');
    this.setUiScenary(value);
  }

  private applyUrlScenary(): void {
    const params = new URLSearchParams(window.location.search);
    const rawChamadoId: string = params.get('chamadoId') || '';
    if (rawChamadoId) {
      if (!this.qryGetChamadoChamadoId) {
        this.qryGetChamadoChamadoId = rawChamadoId;
        setState('ui.chamadoCatalogue.input.qryGetChamado.chamadoId', rawChamadoId);
      }
      if (!this.cmdUpdateChamadoChamadoId) {
        this.cmdUpdateChamadoChamadoId = rawChamadoId;
        setState('ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId', rawChamadoId);
      }
      if (!this.cmdCloseChamadoChamadoId) {
        this.cmdCloseChamadoChamadoId = rawChamadoId;
        setState('ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId', rawChamadoId);
      }
    }
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

/** action qryListChamado (query) — route controleChamados.chamadoCatalogue.qryListChamado; inputs: sortBy, sortOrder; writes ui.chamadoCatalogue.data.qryListChamado; status ui.chamadoCatalogue.action.qryListChamado.status */
async loadQryListChamado(): Promise<void> { this.qryListChamadoState='loading'; this.setStatus('ui.chamadoCatalogue.action.qryListChamado.status','loading'); const p: QryListChamadoInput={}; if(this.qryListChamadoSortBy)p.sortBy=this.qryListChamadoSortBy as QryListChamadoInput['sortBy']; if(this.qryListChamadoSortOrder)p.sortOrder=this.qryListChamadoSortOrder as QryListChamadoInput['sortOrder']; const r=await execBff<QryListChamadoOutput[]>(qryListChamadoRoute,p,{mode:'silent'}); if(r.ok){this.qryListChamadoData=r.data??[];setState('ui.chamadoCatalogue.data.qryListChamado',this.qryListChamadoData);this.qryListChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.qryListChamado.status','success');}else{this.qryListChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.qryListChamado.status','error');console.error('qryListChamado failed',r.error);} this.requestUpdate(); }
/** handler for action qryListChamado — bind UI events here */ handleQryListChamadoClick(event?: Event): void { event?.preventDefault(); void this.loadQryListChamado(); }
/** action cmdCreateChamado (command) — route controleChamados.chamadoCatalogue.cmdCreateChamado; inputs: titulo, descricao, status; writes ui.chamadoCatalogue.output.cmdCreateChamado; status ui.chamadoCatalogue.action.cmdCreateChamado.status; feedback keys action.cmdCreateChamado.success / action.cmdCreateChamado.error */
async cmdCreateChamado(): Promise<void> { this.cmdCreateChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.cmdCreateChamado.status','loading');const p:CmdCreateChamadoInput={titulo:this.cmdCreateChamadoTitulo,descricao:this.cmdCreateChamadoDescricao,status:this.cmdCreateChamadoStatus as CmdCreateChamadoInput['status']};const r=await execBff<CmdCreateChamadoOutput>(cmdCreateChamadoRoute,p,{mode:'blocking'});if(!r.ok){const e=this.readErrorMessage(r.error,'action.cmdCreateChamado.error');this.cmdCreateChamadoError=e;setState('ui.chamadoCatalogue.action.cmdCreateChamado.error',e);this.cmdCreateChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdCreateChamado.status','error');return;}this.cmdCreateChamadoOutput=r.data??null;setState('ui.chamadoCatalogue.output.cmdCreateChamado',this.cmdCreateChamadoOutput);if(!await this.refreshAll()){this.cmdCreateChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdCreateChamado.status','error');return;}this.setCmdCreateChamadoTitulo('');this.setCmdCreateChamadoDescricao('');this.setCmdCreateChamadoStatus('');this.setUiScenary('base');this.cmdCreateChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.cmdCreateChamado.status','success');}
/** handler for action cmdCreateChamado — bind UI events here */ handleCmdCreateChamadoClick(event?: Event): void { event?.preventDefault(); void runBlockingUiAction(async (_signal: AbortSignal)=>this.cmdCreateChamado()); }
/** action cmdUpdateChamado (command) — route controleChamados.chamadoCatalogue.cmdUpdateChamado; inputs: chamadoId, titulo, descricao, status; writes ui.chamadoCatalogue.output.cmdUpdateChamado; status ui.chamadoCatalogue.action.cmdUpdateChamado.status; feedback keys action.cmdUpdateChamado.success / action.cmdUpdateChamado.error */
async cmdUpdateChamado(): Promise<void> { if(!this.cmdUpdateChamadoChamadoId){this.cmdUpdateChamadoState='idle';return;}this.cmdUpdateChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.cmdUpdateChamado.status','loading');const p:CmdUpdateChamadoInput={chamadoId:this.cmdUpdateChamadoChamadoId,titulo:this.cmdUpdateChamadoTitulo,descricao:this.cmdUpdateChamadoDescricao,status:this.cmdUpdateChamadoStatus as CmdUpdateChamadoInput['status']};const r=await execBff<CmdUpdateChamadoOutput>(cmdUpdateChamadoRoute,p,{mode:'blocking'});if(!r.ok){const e=this.readErrorMessage(r.error,'action.cmdUpdateChamado.error');this.cmdUpdateChamadoError=e;setState('ui.chamadoCatalogue.action.cmdUpdateChamado.error',e);this.cmdUpdateChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdUpdateChamado.status','error');return;}this.cmdUpdateChamadoOutput=r.data??null;setState('ui.chamadoCatalogue.output.cmdUpdateChamado',this.cmdUpdateChamadoOutput);if(!await this.refreshAll()){this.cmdUpdateChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdUpdateChamado.status','error');return;}this.setCmdUpdateChamadoChamadoId('');this.setCmdUpdateChamadoTitulo('');this.setCmdUpdateChamadoDescricao('');this.setCmdUpdateChamadoStatus('');this.setUiScenary('base');this.cmdUpdateChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.cmdUpdateChamado.status','success');}
/** handler for action cmdUpdateChamado — bind UI events here */ handleCmdUpdateChamadoClick(event?: Event): void { event?.preventDefault(); void runBlockingUiAction(async (_signal: AbortSignal)=>this.cmdUpdateChamado()); }
/** action cmdDeleteChamado (command) — route controleChamados.chamadoCatalogue.cmdDeleteChamado; inputs: chamadoId; writes ui.chamadoCatalogue.output.cmdDeleteChamado; status ui.chamadoCatalogue.action.cmdDeleteChamado.status; feedback keys action.cmdDeleteChamado.success / action.cmdDeleteChamado.error */
async cmdDeleteChamado(): Promise<void> { if(!this.cmdDeleteChamadoChamadoId){this.cmdDeleteChamadoState='idle';return;}this.cmdDeleteChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.cmdDeleteChamado.status','loading');const r=await execBff<CmdDeleteChamadoOutput>(cmdDeleteChamadoRoute,{chamadoId:this.cmdDeleteChamadoChamadoId} as CmdDeleteChamadoInput,{mode:'blocking'});if(!r.ok){const e=this.readErrorMessage(r.error,'action.cmdDeleteChamado.error');this.cmdDeleteChamadoError=e;setState('ui.chamadoCatalogue.action.cmdDeleteChamado.error',e);this.cmdDeleteChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdDeleteChamado.status','error');return;}this.cmdDeleteChamadoOutput=r.data??null;setState('ui.chamadoCatalogue.output.cmdDeleteChamado',this.cmdDeleteChamadoOutput);if(!await this.refreshAll()){this.cmdDeleteChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdDeleteChamado.status','error');return;}this.setCmdDeleteChamadoChamadoId('');this.setUiScenary('base');this.cmdDeleteChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.cmdDeleteChamado.status','success');}
/** handler for action cmdDeleteChamado — bind UI events here */ handleCmdDeleteChamadoClick(event?: Event): void { event?.preventDefault(); void runBlockingUiAction(async (_signal: AbortSignal)=>this.cmdDeleteChamado()); }
/** action qryGetChamado (query) — route controleChamados.chamadoCatalogue.qryGetChamado; inputs: chamadoId; writes ui.chamadoCatalogue.data.qryGetChamado; status ui.chamadoCatalogue.action.qryGetChamado.status */
async loadQryGetChamado(): Promise<void> {if(!this.qryGetChamadoChamadoId){this.qryGetChamadoState='idle';return;}this.qryGetChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.qryGetChamado.status','loading');const r=await execBff<QryGetChamadoOutput>(qryGetChamadoRoute,{chamadoId:this.qryGetChamadoChamadoId} as QryGetChamadoInput,{mode:'silent'});if(r.ok){this.qryGetChamadoData=r.data??null;setState('ui.chamadoCatalogue.data.qryGetChamado',this.qryGetChamadoData);this.qryGetChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.qryGetChamado.status','success');}else{this.qryGetChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.qryGetChamado.status','error');console.error('qryGetChamado failed',r.error);}}
/** handler for action qryGetChamado — bind UI events here */ handleQryGetChamadoClick(event?: Event): void { event?.preventDefault(); void this.loadQryGetChamado(); }
/** action qryLocateChamado (query) — route controleChamados.chamadoCatalogue.qryLocateChamado; inputs: none; writes ui.chamadoCatalogue.data.qryLocateChamado; status ui.chamadoCatalogue.action.qryLocateChamado.status */
async loadQryLocateChamado(): Promise<void> {this.qryLocateChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.qryLocateChamado.status','loading');const r=await execBff<QryLocateChamadoOutput[]>(qryLocateChamadoRoute,{} as QryLocateChamadoInput,{mode:'silent'});if(r.ok){this.qryLocateChamadoData=r.data??[];setState('ui.chamadoCatalogue.data.qryLocateChamado',this.qryLocateChamadoData);this.qryLocateChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.qryLocateChamado.status','success');}else{this.qryLocateChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.qryLocateChamado.status','error');console.error('qryLocateChamado failed',r.error);}}
/** handler for action qryLocateChamado — bind UI events here */ handleQryLocateChamadoClick(event?: Event): void { event?.preventDefault(); void this.loadQryLocateChamado(); }
/** action cmdCloseChamado (command) — route controleChamados.chamadoCatalogue.cmdCloseChamado; inputs: chamadoId, status; writes ui.chamadoCatalogue.output.cmdCloseChamado; status ui.chamadoCatalogue.action.cmdCloseChamado.status; feedback keys action.cmdCloseChamado.success / action.cmdCloseChamado.error */
async cmdCloseChamado(): Promise<void> {if(!this.cmdCloseChamadoChamadoId){this.cmdCloseChamadoState='idle';return;}this.cmdCloseChamadoState='loading';this.setStatus('ui.chamadoCatalogue.action.cmdCloseChamado.status','loading');const r=await execBff<CmdCloseChamadoOutput>(cmdCloseChamadoRoute,{chamadoId:this.cmdCloseChamadoChamadoId,status:this.cmdCloseChamadoStatus as CmdCloseChamadoInput['status']},{mode:'blocking'});if(!r.ok){const e=this.readErrorMessage(r.error,'action.cmdCloseChamado.error');this.cmdCloseChamadoError=e;setState('ui.chamadoCatalogue.action.cmdCloseChamado.error',e);this.cmdCloseChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdCloseChamado.status','error');return;}this.cmdCloseChamadoOutput=r.data??null;setState('ui.chamadoCatalogue.output.cmdCloseChamado',this.cmdCloseChamadoOutput);if(!await this.refreshAll()){this.cmdCloseChamadoState='error';this.setStatus('ui.chamadoCatalogue.action.cmdCloseChamado.status','error');return;}this.setCmdCloseChamadoStatus('');this.setUiScenary('base');this.cmdCloseChamadoState='success';this.setStatus('ui.chamadoCatalogue.action.cmdCloseChamado.status','success');}
/** handler for action cmdCloseChamado — bind UI events here */ handleCmdCloseChamadoClick(event?: Event): void { event?.preventDefault(); void runBlockingUiAction(async (_signal: AbortSignal)=>this.cmdCloseChamado()); }

private input(event: Event): string { const t=event.target as HTMLInputElement|HTMLSelectElement|null; return t && 'value' in t ? String(t.value) : ''; }
private setInput(key: string, field: keyof ControleChamadosChamadoCatalogueBase, value: string): void { (this as unknown as Record<string, unknown>)[field]=value;setState(key,value);this.requestUpdate(); }
/** setter for state ui.chamadoCatalogue.input.qryListChamado.sortBy */ setQryListChamadoSortBy(value:string):void{this.setInput('ui.chamadoCatalogue.input.qryListChamado.sortBy','qryListChamadoSortBy',value)}
/** handler for action set.qryListChamadoSortBy — bind UI events here */ handleQryListChamadoSortByChange(event:Event):void{this.setQryListChamadoSortBy(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.qryListChamado.sortOrder */ setQryListChamadoSortOrder(value:string):void{this.setInput('ui.chamadoCatalogue.input.qryListChamado.sortOrder','qryListChamadoSortOrder',value)}
/** handler for action set.qryListChamadoSortOrder — bind UI events here */ handleQryListChamadoSortOrderChange(event:Event):void{this.setQryListChamadoSortOrder(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdCreateChamado.titulo */ setCmdCreateChamadoTitulo(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdCreateChamado.titulo','cmdCreateChamadoTitulo',value)}
/** handler for action set.cmdCreateChamadoTitulo — bind UI events here */ handleCmdCreateChamadoTituloChange(event:Event):void{this.setCmdCreateChamadoTitulo(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdCreateChamado.descricao */ setCmdCreateChamadoDescricao(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdCreateChamado.descricao','cmdCreateChamadoDescricao',value)}
/** handler for action set.cmdCreateChamadoDescricao — bind UI events here */ handleCmdCreateChamadoDescricaoChange(event:Event):void{this.setCmdCreateChamadoDescricao(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdCreateChamado.status */ setCmdCreateChamadoStatus(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdCreateChamado.status','cmdCreateChamadoStatus',value)}
/** handler for action set.cmdCreateChamadoStatus — bind UI events here */ handleCmdCreateChamadoStatusChange(event:Event):void{this.setCmdCreateChamadoStatus(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId */ setCmdUpdateChamadoChamadoId(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId','cmdUpdateChamadoChamadoId',value);const item=this.qryListChamadoData.find((row:QryListChamadoOutput)=>String(row.chamadoId)===String(value));if(item){this.setCmdUpdateChamadoTitulo(item.titulo);this.setCmdUpdateChamadoDescricao(item.descricao);this.setCmdUpdateChamadoStatus(item.status)}}
/** handler for action set.cmdUpdateChamadoChamadoId — bind UI events here */ handleCmdUpdateChamadoChamadoIdChange(event:Event):void{this.setCmdUpdateChamadoChamadoId(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdUpdateChamado.titulo */ setCmdUpdateChamadoTitulo(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdUpdateChamado.titulo','cmdUpdateChamadoTitulo',value)}
/** handler for action set.cmdUpdateChamadoTitulo — bind UI events here */ handleCmdUpdateChamadoTituloChange(event:Event):void{this.setCmdUpdateChamadoTitulo(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdUpdateChamado.descricao */ setCmdUpdateChamadoDescricao(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdUpdateChamado.descricao','cmdUpdateChamadoDescricao',value)}
/** handler for action set.cmdUpdateChamadoDescricao — bind UI events here */ handleCmdUpdateChamadoDescricaoChange(event:Event):void{this.setCmdUpdateChamadoDescricao(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdUpdateChamado.status */ setCmdUpdateChamadoStatus(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdUpdateChamado.status','cmdUpdateChamadoStatus',value)}
/** handler for action set.cmdUpdateChamadoStatus — bind UI events here */ handleCmdUpdateChamadoStatusChange(event:Event):void{this.setCmdUpdateChamadoStatus(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId */ setCmdDeleteChamadoChamadoId(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId','cmdDeleteChamadoChamadoId',value)}
/** handler for action set.cmdDeleteChamadoChamadoId — bind UI events here */ handleCmdDeleteChamadoChamadoIdChange(event:Event):void{this.setCmdDeleteChamadoChamadoId(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.qryGetChamado.chamadoId */ setQryGetChamadoChamadoId(value:string):void{this.setInput('ui.chamadoCatalogue.input.qryGetChamado.chamadoId','qryGetChamadoChamadoId',value);if(value)this.setUiScenary('detail')}
/** handler for action set.qryGetChamadoChamadoId — bind UI events here */ handleQryGetChamadoChamadoIdChange(event:Event):void{this.setQryGetChamadoChamadoId(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId */ setCmdCloseChamadoChamadoId(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId','cmdCloseChamadoChamadoId',value);const item=this.qryListChamadoData.find((row:QryListChamadoOutput)=>String(row.chamadoId)===String(value));if(item)this.setCmdCloseChamadoStatus(item.status)}
/** handler for action set.cmdCloseChamadoChamadoId — bind UI events here */ handleCmdCloseChamadoChamadoIdChange(event:Event):void{this.setCmdCloseChamadoChamadoId(this.input(event))}
/** setter for state ui.chamadoCatalogue.input.cmdCloseChamado.status */ setCmdCloseChamadoStatus(value:string):void{this.setInput('ui.chamadoCatalogue.input.cmdCloseChamado.status','cmdCloseChamadoStatus',value)}
/** handler for action set.cmdCloseChamadoStatus — bind UI events here */ handleCmdCloseChamadoStatusChange(event:Event):void{this.setCmdCloseChamadoStatus(this.input(event))}
}