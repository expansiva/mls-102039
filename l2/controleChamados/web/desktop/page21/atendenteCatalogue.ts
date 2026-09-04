/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page21/atendenteCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosAtendenteCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/atendenteCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.recordList.title': 'Atendentes',
'organism.qryListAtendente.title': 'Listar Atendente',
'intent.qryListAtendente.list.title': 'Listar Atendente',
'intent.qryListAtendente.list.empty': 'Nenhum registro encontrado',
'intent.qryListAtendente.list.column.atendenteId.label': 'Identificador do atendente',
'intent.qryListAtendente.list.column.platformUserId.label': 'Usuário da plataforma',
'organism.qryGetAtendente.title': 'Obter Atendente',
'intent.qryGetAtendente.list.title': 'Obter Atendente',
'intent.qryGetAtendente.list.empty': 'Nenhum registro encontrado',
'intent.qryGetAtendente.list.column.atendenteId.label': 'Identificador do atendente',
'intent.qryGetAtendente.list.column.platformUserId.label': 'Usuário da plataforma',
'organism.cmdInactivateAtendente.title': 'Desativar Atendente',
'intent.cmdInactivateAtendente.form.title': 'Desativar Atendente',
'intent.cmdInactivateAtendente.form.action.cmdInactivateAtendente': 'Desativar Atendente',
'organism.cmdReactivateAtendente.title': 'Reativar Atendente',
'intent.cmdReactivateAtendente.form.title': 'Reativar Atendente',
'intent.cmdReactivateAtendente.form.action.cmdReactivateAtendente': 'Reativar Atendente',
'section.recordForm.title': 'Cadastro e correção',
'organism.cmdCreateAtendente.title': 'Criar Atendente',
'intent.cmdCreateAtendente.form.title': 'Criar Atendente',
'intent.cmdCreateAtendente.form.action.cmdCreateAtendente': 'Criar Atendente',
'intent.cmdCreateAtendente.form.field.platformUserId.label': 'Usuário da plataforma',
'organism.cmdUpdateAtendente.title': 'Atualizar Atendente',
'intent.cmdUpdateAtendente.form.title': 'Atualizar Atendente',
'intent.cmdUpdateAtendente.form.action.cmdUpdateAtendente': 'Atualizar Atendente',
'intent.cmdUpdateAtendente.form.field.platformUserId.label': 'Usuário da plataforma',
'action.cmdCreateAtendente.success': 'Criar Atendente: OK',
'action.cmdCreateAtendente.error': 'Criar Atendente: falhou',
'action.cmdUpdateAtendente.success': 'Atualizar Atendente: OK',
'action.cmdUpdateAtendente.error': 'Atualizar Atendente: falhou',
'action.cmdInactivateAtendente.success': 'Desativar Atendente: OK',
'action.cmdInactivateAtendente.error': 'Desativar Atendente: falhou',
'action.cmdReactivateAtendente.success': 'Reativar Atendente: OK',
'action.cmdReactivateAtendente.error': 'Reativar Atendente: falhou',
'scenary.base': 'Listar Atendente',
'scenary.detail': 'Obter Atendente',
'scenary.createAtendente': 'Criar Atendente',
'scenary.updateAtendente': 'Atualizar Atendente',
'scenary.inactivateAtendente': 'Desativar Atendente',
'scenary.reactivateAtendente': 'Reativar Atendente',
'scenary.back': 'Voltar',
'form.required': 'Obrigatório',
'list.loading': 'Carregando atendentes…',
'detail.loading': 'Carregando atendente…',
'detail.selected': 'Dados do atendente',
'form.identity': 'Identificação',
'form.account': 'Vínculo da plataforma',
'form.cancel': 'Cancelar',
'form.saving': 'Salvando…',
'action.loading': 'Processando…',
'action.missingRecord': 'Selecione um atendente antes de continuar',
'confirm.inactivate': 'Deseja desativar o atendente ',
'confirm.reactivate': 'Deseja reativar o atendente ',
'new.record': 'Novo atendente',
'field.notAvailable': 'Não informado',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--atendente-catalogue-102039')
export class ControleChamadosDesktopPage21AtendenteCataloguePage extends ControleChamadosAtendenteCatalogueBase {
#msgLang: string | null = null;
#msgCache: PageMessageType = pageFallback;
/** i18n catalog — resolved once per language, refreshed only when the document language changes. */
protected get msg(): PageMessageType {
const lang = (document.documentElement.lang || '').toLowerCase();
if (lang !== this.#msgLang) {
this.#msgLang = lang;
this.#msgCache = pageMessages[this.getMessageKey(pageMessages)] || pageFallback;
}
return this.#msgCache;
}
/** Main render. The scenary host and Scene list are fixed — fill renderScenary<X>(), not this. */
render() {
const msg = this.msg;
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary}
@change=${this.handleUiScenaryChange} backLabel=${msg['scenary.back']}>
<Scene value="base" title=${msg['scenary.base']}>
${this.renderScenaryBase()}
</Scene>
<Scene value="detail" title=${msg['scenary.detail']} nav="back">
${this.renderScenaryDetail()}
</Scene>
<Scene value="createAtendente" title=${msg['scenary.createAtendente']}>
${this.renderScenaryCreateAtendente()}
</Scene>
<Scene value="updateAtendente" title=${msg['scenary.updateAtendente']}>
${this.renderScenaryUpdateAtendente()}
</Scene>
<Scene value="inactivateAtendente" title=${msg['scenary.inactivateAtendente']}>
${this.renderScenaryInactivateAtendente()}
</Scene>
<Scene value="reactivateAtendente" title=${msg['scenary.reactivateAtendente']}>
${this.renderScenaryReactivateAtendente()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const rows = this.qryListAtendenteData;
return html`
<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
<div class="mx-auto flex max-w-5xl items-center justify-between gap-4">
<div>
<h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordList.title']}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryListAtendente.list.title']}</p>
</div>
<button type="button" class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('createAtendente')}>${msg['organism.cmdCreateAtendente.title']}</button>
</div>
${this.qryListAtendenteState === 'loading' ? html`<p class="mx-auto mt-6 max-w-5xl rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4 text-[var(--text-muted,#64748b)]">${msg['list.loading']}</p>` : nothing}
${this.qryListAtendenteState !== 'loading' && rows.length === 0 ? html`<p class="mx-auto mt-6 max-w-5xl rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 text-[var(--text-muted,#64748b)]">${msg['intent.qryListAtendente.list.empty']}</p>` : nothing}
${rows.length > 0 ? html`
<div class="mx-auto mt-6 max-w-5xl overflow-hidden rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]">
<table class="w-full text-left text-sm"><thead class="bg-[var(--surface-alt-bg,#f8fafc)]"><tr><th class="px-4 py-3">${msg['intent.qryListAtendente.list.column.atendenteId.label']}</th><th class="px-4 py-3">${msg['intent.qryListAtendente.list.column.platformUserId.label']}</th></tr></thead><tbody>
${rows.map((row) => html`<tr class="cursor-pointer border-t border-[var(--border-subtle,#e2e8f0)] hover:bg-[var(--surface-alt-bg,#f8fafc)] ${row.atendenteId === this.qryGetAtendenteAtendenteId ? 'bg-[var(--selected-bg,#eff6ff)]' : ''}" @click=${() => { this.setQryGetAtendenteAtendenteId(String(row.atendenteId)); this.setCmdUpdateAtendenteAtendenteId(String(row.atendenteId)); this.setCmdInactivateAtendenteAtendenteId(String(row.atendenteId)); this.setCmdReactivateAtendenteAtendenteId(String(row.atendenteId)); void this.loadQryGetAtendente(); }}><td class="px-4 py-3">${row.atendenteId}</td><td class="px-4 py-3">${row.platformUserId}</td></tr>`)}
</tbody></table></div>` : nothing}
</section>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record = this.qryGetAtendenteData;
return html`<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><div class="mx-auto max-w-3xl rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]">
${this.qryGetAtendenteState === 'loading' ? html`<p class="text-[var(--text-muted,#64748b)]">${msg['detail.loading']}</p>` : nothing}
${record ? html`<header class="mb-6 flex flex-wrap items-start justify-between gap-4"><div><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['detail.selected']}</p><h1 class="mt-1 text-2xl font-bold text-[var(--text-strong,#0f172a)]">${record.atendenteId}</h1></div><div class="flex flex-wrap gap-2"><button type="button" class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('updateAtendente')}>${msg['organism.cmdUpdateAtendente.title']}</button><button type="button" class="rounded-md bg-[var(--button-danger-bg,#b91c1c)] px-3 py-2 text-[var(--button-danger-text,#ffffff)]" @click=${() => this.setUiScenary('inactivateAtendente')}>${msg['organism.cmdInactivateAtendente.title']}</button></div></header><dl class="grid gap-4"><div><dt class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.atendenteId.label']}</dt><dd class="mt-1">${record.atendenteId}</dd></div><div><dt class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.platformUserId.label']}</dt><dd class="mt-1">${record.platformUserId || msg['field.notAvailable']}</dd></div></dl>` : nothing}
</div></section>`;
}
renderScenaryCreateAtendente() {
const msg = this.msg;
const loading = this.cmdCreateAtendenteState === 'loading';
return html`<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><div class="mx-auto max-w-2xl rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['new.record']}</h1><div class="mt-6"><h2 class="text-lg font-semibold">${msg['form.identity']}</h2><label class="mt-4 block text-sm font-medium">${msg['intent.cmdCreateAtendente.form.field.platformUserId.label']} <span class="text-[var(--text-muted,#64748b)]">(${msg['form.required']})</span><input required class="mt-2 w-full rounded-md border border-[var(--border-default,#cbd5e1)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateAtendentePlatformUserId} @input=${this.handleCmdCreateAtendentePlatformUserIdChange}></label></div>${this.cmdCreateAtendenteError ? html`<p class="mt-5 text-[var(--status-error-text,#b91c1c)]">${this.cmdCreateAtendenteError}</p>` : nothing}${this.cmdCreateAtendenteState === 'success' ? html`<p class="mt-5 text-[var(--status-success-text,#15803d)]">${msg['action.cmdCreateAtendente.success']}</p>` : nothing}<div class="mt-6 flex gap-3"><button type="button" class="rounded-md px-4 py-2 text-[var(--text-muted,#64748b)]" @click=${() => this.setUiScenary('base')}>${msg['form.cancel']}</button><button type="button" ?disabled=${loading || !this.cmdCreateAtendentePlatformUserId} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" @click=${this.handleCmdCreateAtendenteClick}>${loading ? msg['form.saving'] : msg['intent.cmdCreateAtendente.form.action.cmdCreateAtendente']}</button></div></div></section>`;
}
renderScenaryUpdateAtendente() {
const msg = this.msg;
const loading = this.cmdUpdateAtendenteState === 'loading';
return html`<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><div class="mx-auto max-w-2xl rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordForm.title']}</h1><div class="mt-6"><h2 class="text-lg font-semibold">${msg['form.account']}</h2><label class="mt-4 block text-sm font-medium">${msg['intent.cmdUpdateAtendente.form.field.platformUserId.label']} <span class="text-[var(--text-muted,#64748b)]">(${msg['form.required']})</span><input required class="mt-2 w-full rounded-md border border-[var(--border-default,#cbd5e1)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdUpdateAtendentePlatformUserId} @input=${this.handleCmdUpdateAtendentePlatformUserIdChange}></label></div>${this.cmdUpdateAtendenteError ? html`<p class="mt-5 text-[var(--status-error-text,#b91c1c)]">${this.cmdUpdateAtendenteError}</p>` : nothing}${this.cmdUpdateAtendenteState === 'success' ? html`<p class="mt-5 text-[var(--status-success-text,#15803d)]">${msg['action.cmdUpdateAtendente.success']}</p>` : nothing}<div class="mt-6 flex gap-3"><button type="button" class="rounded-md px-4 py-2 text-[var(--text-muted,#64748b)]" @click=${() => this.setUiScenary('detail')}>${msg['form.cancel']}</button><button type="button" ?disabled=${loading || !this.cmdUpdateAtendenteAtendenteId || !this.cmdUpdateAtendentePlatformUserId} title=${!this.cmdUpdateAtendenteAtendenteId ? msg['action.missingRecord'] : ''} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" @click=${this.handleCmdUpdateAtendenteClick}>${loading ? msg['form.saving'] : msg['intent.cmdUpdateAtendente.form.action.cmdUpdateAtendente']}</button></div></div></section>`;
}
renderScenaryInactivateAtendente() {
const msg = this.msg;
const loading = this.cmdInactivateAtendenteState === 'loading';
const id = this.cmdInactivateAtendenteAtendenteId;
return html`<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><div class="mx-auto max-w-xl rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['intent.cmdInactivateAtendente.form.title']}</h1><p class="mt-4 text-sm text-[var(--text-muted,#64748b)]">${id || msg['action.missingRecord']}</p>${this.cmdInactivateAtendenteError ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdInactivateAtendenteError}</p>` : nothing}${this.cmdInactivateAtendenteState === 'success' ? html`<p class="mt-4 text-[var(--status-success-text,#15803d)]">${msg['action.cmdInactivateAtendente.success']}</p>` : nothing}<div class="mt-6 flex gap-3"><button type="button" class="rounded-md px-4 py-2 text-[var(--text-muted,#64748b)]" @click=${() => this.setUiScenary('detail')}>${msg['form.cancel']}</button><button type="button" ?disabled=${loading || !id} title=${!id ? msg['action.missingRecord'] : ''} class="rounded-md bg-[var(--button-danger-bg,#b91c1c)] px-4 py-2 text-[var(--button-danger-text,#ffffff)] disabled:opacity-50" @click=${(event: Event) => { if (id && window.confirm(msg['confirm.inactivate'] + id)) this.handleCmdInactivateAtendenteClick(event); }}>${loading ? msg['action.loading'] : msg['intent.cmdInactivateAtendente.form.action.cmdInactivateAtendente']}</button></div></div></section>`;
}
renderScenaryReactivateAtendente() {
const msg = this.msg;
const loading = this.cmdReactivateAtendenteState === 'loading';
const id = this.cmdReactivateAtendenteAtendenteId;
return html`<section class="min-h-full bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]"><div class="mx-auto max-w-xl rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['intent.cmdReactivateAtendente.form.title']}</h1><p class="mt-4 text-sm text-[var(--text-muted,#64748b)]">${id || msg['action.missingRecord']}</p>${this.cmdReactivateAtendenteError ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdReactivateAtendenteError}</p>` : nothing}${this.cmdReactivateAtendenteState === 'success' ? html`<p class="mt-4 text-[var(--status-success-text,#15803d)]">${msg['action.cmdReactivateAtendente.success']}</p>` : nothing}<div class="mt-6 flex gap-3"><button type="button" class="rounded-md px-4 py-2 text-[var(--text-muted,#64748b)]" @click=${() => this.setUiScenary('detail')}>${msg['form.cancel']}</button><button type="button" ?disabled=${loading || !id} title=${!id ? msg['action.missingRecord'] : ''} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" @click=${(event: Event) => { if (id && window.confirm(msg['confirm.reactivate'] + id)) this.handleCmdReactivateAtendenteClick(event); }}>${loading ? msg['action.loading'] : msg['intent.cmdReactivateAtendente.form.action.cmdReactivateAtendente']}</button></div></div></section>`;
}
}
