/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page21/chamadoCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosChamadoCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/chamadoCatalogue.js';
import type { QryListChamadoOutput, QryGetChamadoOutput } from '/_102039_/l2/controleChamados/web/shared/chamadoCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.recordList.title': 'Localização e seleção de chamados',
'organism.qryListChamado.title': 'Listar Chamado',
'intent.qryListChamado.list.title': 'Listar Chamado',
'intent.qryListChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryListChamado.list.column.chamadoId.label': 'Identificador do chamado',
'intent.qryListChamado.list.column.titulo.label': 'Título',
'intent.qryListChamado.list.column.descricao.label': 'Descrição',
'intent.qryListChamado.list.column.status.label': 'Status',
'intent.qryListChamado.list.filter.sortBy.label': 'Sort By',
'intent.qryListChamado.list.filter.sortOrder.label': 'Sort Order',
'organism.qryLocateChamado.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryLocateChamado.list.column.chamadoId.label': 'Identificador do chamado',
'intent.qryLocateChamado.list.column.titulo.label': 'Título',
'intent.qryLocateChamado.list.column.descricao.label': 'Descrição',
'intent.qryLocateChamado.list.column.status.label': 'Status',
'organism.qryGetChamado.title': 'Obter Chamado',
'intent.qryGetChamado.list.title': 'Obter Chamado',
'intent.qryGetChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryGetChamado.list.column.chamadoId.label': 'Identificador do chamado',
'intent.qryGetChamado.list.column.titulo.label': 'Título',
'intent.qryGetChamado.list.column.descricao.label': 'Descrição',
'intent.qryGetChamado.list.column.status.label': 'Status',
'organism.cmdDeleteChamado.title': 'Excluir Chamado',
'intent.cmdDeleteChamado.form.title': 'Excluir Chamado',
'intent.cmdDeleteChamado.form.action.cmdDeleteChamado': 'Excluir Chamado',
'section.recordForm.title': 'Criação e correção',
'organism.cmdCreateChamado.title': 'Criar Chamado',
'intent.cmdCreateChamado.form.title': 'Criar Chamado',
'intent.cmdCreateChamado.form.action.cmdCreateChamado': 'Criar Chamado',
'intent.cmdCreateChamado.form.field.titulo.label': 'Título',
'intent.cmdCreateChamado.form.field.descricao.label': 'Descrição',
'intent.cmdCreateChamado.form.field.status.label': 'Status',
'organism.cmdUpdateChamado.title': 'Atualizar Chamado',
'intent.cmdUpdateChamado.form.title': 'Atualizar Chamado',
'intent.cmdUpdateChamado.form.action.cmdUpdateChamado': 'Atualizar Chamado',
'intent.cmdUpdateChamado.form.field.titulo.label': 'Título',
'intent.cmdUpdateChamado.form.field.descricao.label': 'Descrição',
'intent.cmdUpdateChamado.form.field.status.label': 'Status',
'section.closeChamado.title': 'Conclusão do chamado',
'organism.cmdCloseChamado.title': 'Confirmar o fechamento do chamado',
'intent.cmdCloseChamado.form.title': 'Confirmar o fechamento do chamado',
'intent.cmdCloseChamado.form.action.cmdCloseChamado': 'Confirmar o fechamento do chamado',
'intent.cmdCloseChamado.form.field.status.label': 'Status',
'action.cmdCreateChamado.success': 'Criar Chamado: OK',
'action.cmdCreateChamado.error': 'Criar Chamado: falhou',
'action.cmdUpdateChamado.success': 'Atualizar Chamado: OK',
'action.cmdUpdateChamado.error': 'Atualizar Chamado: falhou',
'action.cmdDeleteChamado.success': 'Excluir Chamado: OK',
'action.cmdDeleteChamado.error': 'Excluir Chamado: falhou',
'action.cmdCloseChamado.success': 'Confirmar o fechamento do chamado: OK',
'action.cmdCloseChamado.error': 'Confirmar o fechamento do chamado: falhou',
'scenary.base': 'Listar Chamado',
'scenary.detail': 'Obter Chamado',
'scenary.createChamado': 'Criar Chamado',
'scenary.updateChamado': 'Atualizar Chamado',
'scenary.closeChamado': 'Confirmar o fechamento do chamado',
'scenary.back': 'Voltar',
'page.title': 'Cadastro de Chamado',
'page.newRecord': 'Novo chamado',
'page.selectRecord': 'Selecione um chamado para consultar ou editar',
'page.chooseStatus': 'Selecione o status',
'status.open': 'Aberto',
'status.closed': 'Fechado',
'group.identity': 'Identificação',
'group.description': 'Descrição',
'action.new': 'Novo chamado',
'action.edit': 'Editar dados',
'action.close': 'Fechar chamado',
'action.delete': 'Excluir chamado',
'action.cancel': 'Cancelar',
'action.saveCreate': 'Salvar chamado',
'action.saveUpdate': 'Salvar alterações',
'action.loading': 'Salvando…',
'action.closeLoading': 'Fechando…',
'feedback.required': 'Preencha os campos obrigatórios.',
'feedback.missingSelection': 'Selecione um chamado antes de continuar.',
'feedback.deleted': 'Chamado excluído com sucesso.',
'feedback.closed': 'Chamado fechado com sucesso.',
'confirm.delete': 'Confirma a exclusão deste chamado?',
'confirm.close': 'Confirma o fechamento deste chamado?',
'query.loading': 'Carregando chamados…',
'query.error': 'Não foi possível carregar os chamados.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--chamado-catalogue-102039')
export class ControleChamadosDesktopPage21ChamadoCataloguePage extends ControleChamadosChamadoCatalogueBase {
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
<Scene value="createChamado" title=${msg['scenary.createChamado']}>
${this.renderScenaryCreateChamado()}
</Scene>
<Scene value="updateChamado" title=${msg['scenary.updateChamado']}>
${this.renderScenaryUpdateChamado()}
</Scene>
<Scene value="closeChamado" title=${msg['scenary.closeChamado']}>
${this.renderScenaryCloseChamado()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const statusLabel = (status: string): string => status === 'closed' ? msg['status.closed'] : msg['status.open'];
const rows: QryListChamadoOutput[] = this.qryListChamadoData;
return html`
<section class="mx-auto flex max-w-5xl flex-col gap-6 p-6 text-[var(--text-default,#0f172a)]">
<header class="flex flex-wrap items-center justify-between gap-4">
<div><h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['page.title']}</h1><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['page.selectRecord']}</p></div>
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('createChamado')}>${msg['action.new']}</button>
</header>
${this.qryListChamadoState === 'loading' ? html`<p class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4">${msg['query.loading']}</p>` : nothing}
${this.qryListChamadoState === 'error' ? html`<p class="rounded-lg bg-[var(--status-error-bg,#fee2e2)] p-4 text-[var(--status-error-text,#991b1b)]">${msg['query.error']}</p>` : nothing}
${rows.length === 0 && this.qryListChamadoState !== 'loading' ? html`<p class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] p-6">${msg['intent.qryListChamado.list.empty']}</p>` : nothing}
${rows.length > 0 ? html`<div class="overflow-x-auto rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)]"><table class="w-full text-left"><thead class="bg-[var(--surface-alt-bg,#f8fafc)]"><tr><th class="p-3">${msg['intent.qryListChamado.list.column.titulo.label']}</th><th class="p-3">${msg['intent.qryListChamado.list.column.descricao.label']}</th><th class="p-3">${msg['intent.qryListChamado.list.column.status.label']}</th></tr></thead><tbody>${rows.map((item: QryListChamadoOutput) => html`<tr class="cursor-pointer border-t border-[var(--border-subtle,#e2e8f0)] hover:bg-[var(--selected-bg,#eff6ff)]" @click=${() => { this.setQryGetChamadoChamadoId(String(item.chamadoId)); this.setCmdUpdateChamadoChamadoId(String(item.chamadoId)); this.setCmdCloseChamadoChamadoId(String(item.chamadoId)); }}><td class="p-3 font-medium">${item.titulo}</td><td class="p-3">${item.descricao}</td><td class="p-3"><span class="rounded-full bg-[var(--status-neutral-bg,#f1f5f9)] px-2 py-1 text-sm text-[var(--status-neutral-text,#475569)]">${statusLabel(String(item.status))}</span></td></tr>`)}</tbody></table></div>` : nothing}
</section>`;
}
renderScenaryDetail() {
const msg = this.msg;
const record: QryGetChamadoOutput | null = this.qryGetChamadoData;
if (!record) return html`<section class="p-6">${this.qryGetChamadoState === 'loading' ? msg['query.loading'] : msg['feedback.missingSelection']}</section>`;
const status = String(record.status);
return html`<section class="mx-auto flex max-w-3xl flex-col gap-6 p-6"><header class="flex flex-wrap items-start justify-between gap-4"><div><h1 class="text-2xl font-bold">${record.titulo}</h1><span class="rounded-full bg-[var(--status-neutral-bg,#f1f5f9)] px-2 py-1 text-sm">${status === 'closed' ? msg['status.closed'] : msg['status.open']}</span></div><div class="flex gap-2"><button ?disabled=${!this.cmdUpdateChamadoChamadoId} title=${!this.cmdUpdateChamadoChamadoId ? msg['feedback.missingSelection'] : nothing} class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)]" @click=${() => { this.setCmdUpdateChamadoChamadoId(String(record.chamadoId)); this.setUiScenary('updateChamado'); }}>${msg['action.edit']}</button>${status === 'open' ? html`<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-3 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => { this.setCmdCloseChamadoChamadoId(String(record.chamadoId)); this.setCmdCloseChamadoStatus('closed'); this.setUiScenary('closeChamado'); }}>${msg['action.close']}</button>` : nothing}<button ?disabled=${!this.cmdDeleteChamadoChamadoId} title=${!this.cmdDeleteChamadoChamadoId ? msg['feedback.missingSelection'] : nothing} class="rounded-md bg-[var(--button-danger-bg,#dc2626)] px-3 py-2 text-[var(--button-danger-text,#ffffff)]" @click=${() => { if (window.confirm(msg['confirm.delete'])) { this.setCmdDeleteChamadoChamadoId(String(record.chamadoId)); this.handleCmdDeleteChamadoClick(); } }}>${msg['action.delete']}</button></div></header><div class="rounded-lg bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0_1px_3px_rgba(0,0,0,.1))]"><h2 class="mb-2 font-semibold">${msg['group.description']}</h2><p class="whitespace-pre-wrap">${record.descricao}</p></div>${this.cmdDeleteChamadoState === 'success' ? html`<p class="bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteChamado.success']}</p>` : nothing}${this.cmdDeleteChamadoState === 'error' ? html`<p class="bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteChamadoError || msg['action.cmdDeleteChamado.error']}</p>` : nothing}</section>`;
}
renderScenaryCreateChamado() {
const msg = this.msg;
const loading = this.cmdCreateChamadoState === 'loading';
const valid = Boolean(this.cmdCreateChamadoTitulo.trim() && this.cmdCreateChamadoDescricao.trim() && this.cmdCreateChamadoStatus);
return html`<form class="mx-auto flex max-w-2xl flex-col gap-6 p-6" @submit=${this.handleCmdCreateChamadoClick}><h1 class="text-2xl font-bold">${msg['page.newRecord']}</h1><fieldset class="flex flex-col gap-4"><legend class="font-semibold">${msg['group.identity']}</legend><label class="flex flex-col gap-1">${msg['intent.cmdCreateChamado.form.field.titulo.label']}<input required .value=${this.cmdCreateChamadoTitulo} @input=${this.handleCmdCreateChamadoTituloChange} class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"></label><label class="flex flex-col gap-1">${msg['intent.cmdCreateChamado.form.field.status.label']}<select required .value=${this.cmdCreateChamadoStatus} @change=${this.handleCmdCreateChamadoStatusChange} class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"><option value="">${msg['page.chooseStatus']}</option><option value="open">${msg['status.open']}</option><option value="closed">${msg['status.closed']}</option></select></label></fieldset><label class="flex flex-col gap-1">${msg['intent.cmdCreateChamado.form.field.descricao.label']}<textarea required .value=${this.cmdCreateChamadoDescricao} @input=${this.handleCmdCreateChamadoDescricaoChange} class="min-h-32 rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"></textarea></label>${this.cmdCreateChamadoState === 'error' ? html`<p class="text-[var(--status-error-text,#991b1b)]">${this.cmdCreateChamadoError || msg['action.cmdCreateChamado.error']}</p>` : nothing}${this.cmdCreateChamadoState === 'success' ? html`<p class="text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateChamado.success']}</p>` : nothing}<div class="flex gap-3"><button type="button" class="rounded-md px-4 py-3" @click=${() => this.setUiScenary('base')}>${msg['action.cancel']}</button><button type="submit" ?disabled=${!valid || loading} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]">${loading ? msg['action.loading'] : msg['action.saveCreate']}</button></div></form>`;
}
renderScenaryUpdateChamado() {
const msg = this.msg;
const loading = this.cmdUpdateChamadoState === 'loading';
const valid = Boolean(this.cmdUpdateChamadoChamadoId && this.cmdUpdateChamadoTitulo.trim() && this.cmdUpdateChamadoDescricao.trim() && this.cmdUpdateChamadoStatus);
return html`<form class="mx-auto flex max-w-2xl flex-col gap-6 p-6" @submit=${this.handleCmdUpdateChamadoClick}><h1 class="text-2xl font-bold">${msg['intent.cmdUpdateChamado.form.title']}</h1><fieldset class="flex flex-col gap-4"><legend class="font-semibold">${msg['group.identity']}</legend><label class="flex flex-col gap-1">${msg['intent.cmdUpdateChamado.form.field.titulo.label']}<input required .value=${this.cmdUpdateChamadoTitulo} @input=${this.handleCmdUpdateChamadoTituloChange} class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"></label><label class="flex flex-col gap-1">${msg['intent.cmdUpdateChamado.form.field.status.label']}<select required .value=${this.cmdUpdateChamadoStatus} @change=${this.handleCmdUpdateChamadoStatusChange} class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"><option value="">${msg['page.chooseStatus']}</option><option value="open">${msg['status.open']}</option><option value="closed">${msg['status.closed']}</option></select></label></fieldset><label class="flex flex-col gap-1">${msg['intent.cmdUpdateChamado.form.field.descricao.label']}<textarea required .value=${this.cmdUpdateChamadoDescricao} @input=${this.handleCmdUpdateChamadoDescricaoChange} class="min-h-32 rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"></textarea></label>${this.cmdUpdateChamadoState === 'error' ? html`<p class="text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateChamadoError || msg['action.cmdUpdateChamado.error']}</p>` : nothing}${this.cmdUpdateChamadoState === 'success' ? html`<p class="text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateChamado.success']}</p>` : nothing}<div class="flex gap-3"><button type="button" class="rounded-md px-4 py-3" @click=${() => this.setUiScenary('detail')}>${msg['action.cancel']}</button><button type="submit" ?disabled=${!valid || loading} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]">${loading ? msg['action.loading'] : msg['action.saveUpdate']}</button></div></form>`;
}
renderScenaryCloseChamado() {
const msg = this.msg;
const loading = this.cmdCloseChamadoState === 'loading';
return html`<section class="mx-auto flex max-w-xl flex-col gap-6 p-6"><h1 class="text-2xl font-bold">${msg['section.closeChamado.title']}</h1><p>${msg['confirm.close']}</p>${this.cmdCloseChamadoState === 'error' ? html`<p class="text-[var(--status-error-text,#991b1b)]">${this.cmdCloseChamadoError || msg['action.cmdCloseChamado.error']}</p>` : nothing}${this.cmdCloseChamadoState === 'success' ? html`<p class="text-[var(--status-success-text,#166534)]">${msg['action.cmdCloseChamado.success']}</p>` : nothing}<div class="flex gap-3"><button class="rounded-md px-4 py-3" @click=${() => this.setUiScenary('detail')}>${msg['action.cancel']}</button><button ?disabled=${!this.cmdCloseChamadoChamadoId || loading} title=${!this.cmdCloseChamadoChamadoId ? msg['feedback.missingSelection'] : nothing} class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" @click=${() => { if (window.confirm(msg['confirm.close'])) this.handleCmdCloseChamadoClick(); }}>${loading ? msg['action.closeLoading'] : msg['intent.cmdCloseChamado.form.action.cmdCloseChamado']}</button></div></section>`;
}
}
