/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page31/atendenteCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosAtendenteCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/atendenteCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListAtendenteOutput,
QryGetAtendenteOutput,
} from '/_102039_/l2/controleChamados/web/shared/atendenteCatalogue.js';
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
'page.new': 'Novo atendente',
'page.open': 'Abrir cadastro',
'page.edit': 'Editar dados',
'page.refresh': 'Atualizar lista',
'page.chooseRecord': 'Selecione um atendente para continuar',
'page.record': 'Cadastro do atendente',
'page.identity': 'Identidade',
'page.actions': 'Ações disponíveis',
'page.save': 'Salvar alterações',
'page.cancel': 'Cancelar',
'page.required': 'Obrigatório',
'page.loading': 'Carregando…',
'page.noRecord': 'Nenhum atendente selecionado',
'page.confirmDeactivate': 'Confirme a desativação deste atendente',
'page.confirmReactivate': 'Confirme a reativação deste atendente',
'page.missingSelection': 'Escolha um atendente antes de continuar',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--atendente-catalogue-102039')
export class ControleChamadosDesktopPage31AtendenteCataloguePage extends ControleChamadosAtendenteCatalogueBase {
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
const rows: QryListAtendenteOutput[] = this.qryListAtendenteData;
const selectedId: string = this.cmdUpdateAtendenteAtendenteId;
return html`
<section class="min-h-full space-y-6 bg-[var(--page-bg,#ffffff)] p-6 text-[var(--text-default,#0f172a)]">
<div class="flex flex-wrap items-center justify-between gap-4">
<div>
<h2 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordList.title']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['page.chooseRecord']}</p>
</div>
<div class="flex gap-3">
<button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${this.handleQryListAtendenteClick}>${msg['page.refresh']}</button>
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('createAtendente')}>${msg['page.new']}</button>
</div>
</div>
${this.qryListAtendenteState === 'loading' ? html`<div class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-6 text-[var(--text-muted,#64748b)]">${msg['page.loading']}</div>` : nothing}
${this.qryListAtendenteState !== 'loading' && rows.length === 0 ? html`<div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] p-6">${msg['intent.qryListAtendente.list.empty']}</div>` : nothing}
${rows.length > 0 ? html`
<div class="overflow-x-auto rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)]">
<table class="w-full text-left"><thead class="bg-[var(--surface-alt-bg,#f8fafc)]"><tr><th class="p-4">${msg['intent.qryListAtendente.list.column.platformUserId.label']}</th><th class="p-4">${msg['intent.qryListAtendente.list.column.atendenteId.label']}</th><th class="p-4">${msg['page.actions']}</th></tr></thead><tbody>
${rows.map((row: QryListAtendenteOutput) => html`<tr class=${String(row.atendenteId) === selectedId ? 'bg-[var(--selected-bg,#eff6ff)]' : ''} @click=${() => { const id = String(row.atendenteId); this.setCmdUpdateAtendenteAtendenteId(id); this.setCmdInactivateAtendenteAtendenteId(id); this.setCmdReactivateAtendenteAtendenteId(id); this.setQryGetAtendenteAtendenteId(id); this.setUiScenary('detail'); }}>
<td class="p-4">${row.platformUserId}</td><td class="p-4">${row.atendenteId}</td><td class="p-4"><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-3 py-2 text-[var(--button-secondary-text,#334155)]" @click=${(event: Event) => { event.stopPropagation(); this.setCmdUpdateAtendenteAtendenteId(String(row.atendenteId)); this.setUiScenary('updateAtendente'); }}>${msg['page.edit']}</button></td></tr>`)}
</tbody></table></div>` : nothing}
${this.cmdCreateAtendenteState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateAtendente.success']}</p>` : nothing}
${this.cmdCreateAtendenteState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#b91c1c)]">${this.cmdCreateAtendenteError || msg['action.cmdCreateAtendente.error']}</p>` : nothing}
${this.cmdUpdateAtendenteState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateAtendente.success']}</p>` : nothing}
${this.cmdUpdateAtendenteState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#b91c1c)]">${this.cmdUpdateAtendenteError || msg['action.cmdUpdateAtendente.error']}</p>` : nothing}
${this.cmdInactivateAtendenteState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdInactivateAtendente.success']}</p>` : nothing}
${this.cmdInactivateAtendenteState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#b91c1c)]">${this.cmdInactivateAtendenteError || msg['action.cmdInactivateAtendente.error']}</p>` : nothing}
${this.cmdReactivateAtendenteState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdReactivateAtendente.success']}</p>` : nothing}
${this.cmdReactivateAtendenteState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#b91c1c)]">${this.cmdReactivateAtendenteError || msg['action.cmdReactivateAtendente.error']}</p>` : nothing}
</section>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record: QryGetAtendenteOutput | null = this.qryGetAtendenteData;
return html`<section class="space-y-6 p-6 text-[var(--text-default,#0f172a)]"><div class="sticky top-0 rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-sm"><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['page.identity']}</p><h2 class="text-xl font-bold">${record ? record.platformUserId : msg['page.noRecord']}</h2>${record ? html`<p class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.atendenteId.label']}: ${record.atendenteId}</p>` : nothing}</div><div class="flex flex-wrap gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateAtendenteAtendenteId} title=${!this.cmdUpdateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${() => this.setUiScenary('updateAtendente')}>${msg['page.edit']}</button><button class="rounded-md bg-[var(--button-danger-bg,#dc2626)] px-4 py-2 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdInactivateAtendenteAtendenteId} title=${!this.cmdInactivateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${() => this.setUiScenary('inactivateAtendente')}>${msg['organism.cmdInactivateAtendente.title']}</button><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" ?disabled=${!this.cmdReactivateAtendenteAtendenteId} title=${!this.cmdReactivateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${() => this.setUiScenary('reactivateAtendente')}>${msg['organism.cmdReactivateAtendente.title']}</button></div></section>`;
}
renderScenaryCreateAtendente() {
const msg = this.msg;
return html`<section class="space-y-6 p-6"><div class="rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordForm.title']}</h2><label class="mt-6 block text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['intent.cmdCreateAtendente.form.field.platformUserId.label']} <span class="text-[var(--status-error-text,#b91c1c)]">*</span><input class="mt-2 w-full rounded-md border border-[var(--border-default,#cbd5e1)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateAtendentePlatformUserId} @input=${this.handleCmdCreateAtendentePlatformUserIdChange} required></label><div class="mt-6 flex gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateAtendentePlatformUserId || this.cmdCreateAtendenteState === 'loading'} @click=${this.handleCmdCreateAtendenteClick}>${this.cmdCreateAtendenteState === 'loading' ? msg['page.loading'] : msg['page.save']}</button><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => this.setUiScenary('base')}>${msg['page.cancel']}</button></div>${this.cmdCreateAtendenteState === 'success' ? html`<p class="mt-4 rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateAtendente.success']}</p>` : nothing}${this.cmdCreateAtendenteState === 'error' ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdCreateAtendenteError || msg['action.cmdCreateAtendente.error']}</p>` : nothing}</div></section>`;
}
renderScenaryUpdateAtendente() {
const msg = this.msg;
return html`<section class="space-y-6 p-6"><div class="rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.recordForm.title']}</h2><p class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.atendenteId.label']}: ${this.cmdUpdateAtendenteAtendenteId || msg['page.missingSelection']}</p><label class="mt-6 block text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['intent.cmdUpdateAtendente.form.field.platformUserId.label']} <span class="text-[var(--status-error-text,#b91c1c)]">*</span><input class="mt-2 w-full rounded-md border border-[var(--border-default,#cbd5e1)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdUpdateAtendentePlatformUserId} @input=${this.handleCmdUpdateAtendentePlatformUserIdChange} required></label><div class="mt-6 flex gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateAtendenteAtendenteId || !this.cmdUpdateAtendentePlatformUserId || this.cmdUpdateAtendenteState === 'loading'} title=${!this.cmdUpdateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${this.handleCmdUpdateAtendenteClick}>${this.cmdUpdateAtendenteState === 'loading' ? msg['page.loading'] : msg['page.save']}</button><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => this.setUiScenary('detail')}>${msg['page.cancel']}</button></div>${this.cmdUpdateAtendenteState === 'success' ? html`<p class="mt-4 rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateAtendente.success']}</p>` : nothing}${this.cmdUpdateAtendenteState === 'error' ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdUpdateAtendenteError || msg['action.cmdUpdateAtendente.error']}</p>` : nothing}</div></section>`;
}
renderScenaryInactivateAtendente() {
const msg = this.msg;
return html`<section class="space-y-6 p-6"><div class="rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['page.confirmDeactivate']}</h2><p class="mt-3 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.atendenteId.label']}: ${this.cmdInactivateAtendenteAtendenteId || msg['page.missingSelection']}</p><div class="mt-6 flex gap-3"><button class="rounded-md bg-[var(--button-danger-bg,#dc2626)] px-4 py-2 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdInactivateAtendenteAtendenteId || this.cmdInactivateAtendenteState === 'loading'} title=${!this.cmdInactivateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${this.handleCmdInactivateAtendenteClick}>${this.cmdInactivateAtendenteState === 'loading' ? msg['page.loading'] : msg['intent.cmdInactivateAtendente.form.action.cmdInactivateAtendente']}</button><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => this.setUiScenary('detail')}>${msg['page.cancel']}</button></div>${this.cmdInactivateAtendenteState === 'success' ? html`<p class="mt-4 rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdInactivateAtendente.success']}</p>` : nothing}${this.cmdInactivateAtendenteState === 'error' ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdInactivateAtendenteError || msg['action.cmdInactivateAtendente.error']}</p>` : nothing}</div></section>`;
}
renderScenaryReactivateAtendente() {
const msg = this.msg;
return html`<section class="space-y-6 p-6"><div class="rounded-lg border border-[var(--border-default,#cbd5e1)] bg-[var(--surface-bg,#ffffff)] p-6"><h2 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['page.confirmReactivate']}</h2><p class="mt-3 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetAtendente.list.column.atendenteId.label']}: ${this.cmdReactivateAtendenteAtendenteId || msg['page.missingSelection']}</p><div class="mt-6 flex gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdReactivateAtendenteAtendenteId || this.cmdReactivateAtendenteState === 'loading'} title=${!this.cmdReactivateAtendenteAtendenteId ? msg['page.missingSelection'] : ''} @click=${this.handleCmdReactivateAtendenteClick}>${this.cmdReactivateAtendenteState === 'loading' ? msg['page.loading'] : msg['intent.cmdReactivateAtendente.form.action.cmdReactivateAtendente']}</button><button class="rounded-md bg-[var(--button-secondary-bg,#f8fafc)] px-4 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => this.setUiScenary('detail')}>${msg['page.cancel']}</button></div>${this.cmdReactivateAtendenteState === 'success' ? html`<p class="mt-4 rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdReactivateAtendente.success']}</p>` : nothing}${this.cmdReactivateAtendenteState === 'error' ? html`<p class="mt-4 text-[var(--status-error-text,#b91c1c)]">${this.cmdReactivateAtendenteError || msg['action.cmdReactivateAtendente.error']}</p>` : nothing}</div></section>`;
}
}
