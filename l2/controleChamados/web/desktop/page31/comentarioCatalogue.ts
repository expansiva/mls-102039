/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page31/comentarioCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosComentarioCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/comentarioCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListComentarioOutput,
QryGetComentarioOutput,
QryChamadoPickerOutput,
QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/shared/comentarioCatalogue.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.recordList.title': 'Localizar Comentário',
'organism.qryListComentario.title': 'Listar Comentário',
'intent.qryListComentario.list.title': 'Listar Comentário',
'intent.qryListComentario.list.empty': 'Nenhum registro encontrado',
'intent.qryListComentario.list.column.comentarioId.label': 'Identificador do comentário',
'intent.qryListComentario.list.column.chamadoId.label': 'Chamado',
'intent.qryListComentario.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryListComentario.list.column.conteudo.label': 'Comentário',
'organism.qryGetComentario.title': 'Obter Comentário',
'intent.qryGetComentario.list.title': 'Obter Comentário',
'intent.qryGetComentario.list.empty': 'Nenhum registro encontrado',
'intent.qryGetComentario.list.column.comentarioId.label': 'Identificador do comentário',
'intent.qryGetComentario.list.column.chamadoId.label': 'Chamado',
'intent.qryGetComentario.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryGetComentario.list.column.conteudo.label': 'Comentário',
'organism.cmdDeleteComentario.title': 'Excluir Comentário',
'intent.cmdDeleteComentario.form.title': 'Excluir Comentário',
'intent.cmdDeleteComentario.form.action.cmdDeleteComentario': 'Excluir Comentário',
'section.recordForm.title': 'Criar ou corrigir Comentário',
'organism.cmdCreateComentario.title': 'Criar Comentário',
'intent.cmdCreateComentario.form.title': 'Criar Comentário',
'intent.cmdCreateComentario.form.action.cmdCreateComentario': 'Criar Comentário',
'intent.cmdCreateComentario.form.field.conteudo.label': 'Comentário',
'organism.qryChamadoPicker.title': 'Listar Chamado',
'intent.qryChamadoPicker.list.title': 'Listar Chamado',
'intent.qryChamadoPicker.list.empty': 'Nenhum registro encontrado',
'intent.qryChamadoPicker.list.column.chamadoId.label': 'Chamado',
'intent.qryChamadoPicker.list.column.titulo.label': 'Título',
'intent.qryChamadoPicker.list.column.descricao.label': 'Descrição',
'intent.qryChamadoPicker.list.column.status.label': 'Status',
'intent.qryChamadoPicker.list.filter.sortBy.label': 'Sort By',
'intent.qryChamadoPicker.list.filter.sortOrder.label': 'Sort Order',
'organism.qryAtendentePicker.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.empty': 'Nenhum registro encontrado',
'intent.qryAtendentePicker.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryAtendentePicker.list.column.platformUserId.label': 'Usuário da plataforma',
'organism.cmdUpdateComentario.title': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.title': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.action.cmdUpdateComentario': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.field.conteudo.label': 'Comentário',
'action.cmdCreateComentario.success': 'Criar Comentário: OK',
'action.cmdCreateComentario.error': 'Criar Comentário: falhou',
'action.cmdUpdateComentario.success': 'Atualizar Comentário: OK',
'action.cmdUpdateComentario.error': 'Atualizar Comentário: falhou',
'action.cmdDeleteComentario.success': 'Excluir Comentário: OK',
'action.cmdDeleteComentario.error': 'Excluir Comentário: falhou',
'section.comentarioWorkbench.title': 'Comentários',
'section.comentarioCreation.title': 'Novo comentário',
'section.comentarioWorkspace.title': 'Comentários',
'scenary.base': 'Listar Comentário',
'scenary.detail': 'Obter Comentário',
'scenary.createComentario': 'Criar Comentário',
'scenary.updateComentario': 'Atualizar Comentário',
'scenary.back': 'Voltar',
'common.new': 'Novo comentário',
'common.select': 'Selecione uma opção',
'common.required': 'Obrigatório',
'common.save': 'Salvar comentário',
'common.cancel': 'Cancelar',
'common.edit': 'Editar dados',
'common.deleteConfirm': 'Confirma a exclusão deste comentário?',
'common.chooseRecord': 'Escolha um comentário para continuar',
'common.loading': 'Carregando…',
'common.saving': 'Salvando…',
'common.success': 'Alteração salva com sucesso',
'common.noSelection': 'Selecione um chamado e um atendente',
'common.feedbackError': 'Não foi possível concluir a operação',
'common.status': 'Status',
'common.identity': 'Comentário selecionado',
'common.chamado': 'Escolha o chamado',
'common.atendente': 'Escolha o atendente',
'common.content': 'Escreva o comentário',
'common.createHint': 'Registre uma nova observação no chamado',
'common.updateHint': 'Revise os dados desta observação',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--comentario-catalogue-102039')
export class ControleChamadosDesktopPage31ComentarioCataloguePage extends ControleChamadosComentarioCatalogueBase {
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
<Scene value="createComentario" title=${msg['scenary.createComentario']}>
${this.renderScenaryCreateComentario()}
</Scene>
<Scene value="updateComentario" title=${msg['scenary.updateComentario']}>
${this.renderScenaryUpdateComentario()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const rows: QryListComentarioOutput[] = this.qryListComentarioData;
const selectedId = this.qryGetComentarioComentarioId;
return html`
<section class="min-h-full space-y-6 bg-[var(--page-bg,#f8fafc)] p-4 text-[var(--text-default,#0f172a)] md:p-6">
<header class="flex flex-wrap items-center justify-between gap-4">
<div>
<h2 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.comentarioWorkbench.title']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['common.chooseRecord']}</p>
</div>
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('createComentario')}>${msg['common.new']}</button>
</header>
${this.qryListComentarioState === 'loading' ? html`<p class="rounded-md bg-[var(--surface-bg,#ffffff)] p-4 text-[var(--text-muted,#64748b)]">${msg['common.loading']}</p>` : nothing}
${this.qryListComentarioState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-4 text-[var(--status-error-text,#991b1b)]">${msg['common.feedbackError']}</p>` : nothing}
${this.qryListComentarioState !== 'loading' && rows.length === 0 ? html`<p class="rounded-md bg-[var(--surface-bg,#ffffff)] p-6">${msg['intent.qryListComentario.list.empty']}</p>` : nothing}
${rows.length > 0 ? html`
<div class="overflow-x-auto rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]">
<table class="w-full text-left text-sm"><thead class="border-b border-[var(--border-subtle,#e2e8f0)] text-[var(--text-muted,#64748b)]"><tr>
<th class="px-4 py-3">${msg['intent.qryListComentario.list.column.chamadoId.label']}</th><th class="px-4 py-3">${msg['intent.qryListComentario.list.column.atendenteId.label']}</th><th class="px-4 py-3">${msg['intent.qryListComentario.list.column.conteudo.label']}</th>
</tr></thead><tbody>
${rows.map((item: QryListComentarioOutput) => html`<tr class="cursor-pointer border-b border-[var(--border-subtle,#e2e8f0)] hover:bg-[var(--surface-alt-bg,#f1f5f9)] ${String(item.comentarioId) === String(selectedId) ? 'bg-[var(--selected-bg,#eff6ff)]' : ''}" @click=${() => { this.setQryGetComentarioComentarioId(String(item.comentarioId)); this.setCmdUpdateComentarioComentarioId(String(item.comentarioId)); this.setCmdUpdateComentarioChamadoId(String(item.chamadoId)); this.setCmdUpdateComentarioAtendenteId(String(item.atendenteId)); this.setCmdDeleteComentarioComentarioId(String(item.comentarioId)); void this.loadQryGetComentario(); }}>
<td class="px-4 py-3">${item.chamadoId}</td><td class="px-4 py-3">${item.atendenteId}</td><td class="max-w-xl px-4 py-3">${item.conteudo}</td></tr>`)}
</tbody></table></div>` : nothing}
${this.cmdCreateComentarioState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateComentario.success']}</p>` : nothing}
${this.cmdUpdateComentarioState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateComentario.success']}</p>` : nothing}
${this.cmdDeleteComentarioState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteComentario.success']}</p>` : nothing}
</section>`;
}
renderScenaryDetail() {
const msg = this.msg;
const item: QryGetComentarioOutput | null = this.qryGetComentarioData;
if (!item) return html`<section class="space-y-4 p-6"><p>${this.qryGetComentarioState === 'loading' ? msg['common.loading'] : msg['common.chooseRecord']}</p></section>`;
return html`<section class="space-y-6 p-4 md:p-6"><header class="sticky top-0 z-10 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.08))]"><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['common.identity']}</p><h2 class="text-xl font-semibold">${item.conteudo}</h2><div class="mt-3 grid gap-3 text-sm md:grid-cols-2"><span>${msg['intent.qryGetComentario.list.column.chamadoId.label']}: ${item.chamadoId}</span><span>${msg['intent.qryGetComentario.list.column.atendenteId.label']}: ${item.atendenteId}</span></div></header><div class="flex flex-wrap gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('updateComentario')}>${msg['common.edit']}</button><button class="rounded-md bg-[var(--button-danger-bg,#dc2626)] px-4 py-2 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteComentarioComentarioId} title=${!this.cmdDeleteComentarioComentarioId ? msg['common.chooseRecord'] : ''} @click=${(event: Event) => { if (confirm(msg['common.deleteConfirm'])) this.handleCmdDeleteComentarioClick(event); }}>${this.cmdDeleteComentarioState === 'loading' ? msg['common.saving'] : msg['intent.cmdDeleteComentario.form.action.cmdDeleteComentario']}</button></div>${this.cmdDeleteComentarioState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteComentarioError || msg['action.cmdDeleteComentario.error']}</p>` : nothing}</section>`;
}
renderScenaryCreateComentario() {
const msg = this.msg;
const chamadoRows: QryChamadoPickerOutput[] = this.qryChamadoPickerData;
const atendenteRows: QryAtendentePickerOutput[] = this.qryAtendentePickerData;
return html`<section class="mx-auto max-w-3xl space-y-6 p-4 md:p-6"><header><h2 class="text-xl font-semibold">${msg['section.comentarioCreation.title']}</h2><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['common.createHint']}</p></header><div class="space-y-4 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5"><label class="block text-sm font-medium">${msg['common.chamado']}<select class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2 text-[var(--text-default,#0f172a)]" .value=${this.cmdCreateComentarioChamadoId} @change=${this.handleCmdCreateComentarioChamadoIdChange}><option value="">${msg['common.select']}</option>${chamadoRows.map((row: QryChamadoPickerOutput) => html`<option value=${String(row.chamadoId)}>${row.titulo}</option>`)}</select></label><label class="block text-sm font-medium">${msg['common.atendente']}<select class="mt-1 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2 text-[var(--text-default,#0f172a)]" .value=${this.cmdCreateComentarioAtendenteId} @change=${this.handleCmdCreateComentarioAtendenteIdChange}><option value="">${msg['common.select']}</option>${atendenteRows.map((row: QryAtendentePickerOutput) => html`<option value=${String(row.atendenteId)}>${row.platformUserId}</option>`)}</select></label><label class="block text-sm font-medium">${msg['common.content']}<textarea class="mt-1 min-h-32 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdCreateComentarioConteudo} @change=${this.handleCmdCreateComentarioConteudoChange}></textarea><span class="text-xs text-[var(--text-muted,#64748b)]">${msg['common.required']}</span></label>${this.cmdCreateComentarioState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdCreateComentarioError || msg['action.cmdCreateComentario.error']}</p>` : nothing}${this.cmdCreateComentarioState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateComentario.success']}</p>` : nothing}<div class="flex gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId || !this.cmdCreateComentarioConteudo || this.cmdCreateComentarioState === 'loading'} title=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId ? msg['common.noSelection'] : ''} @click=${this.handleCmdCreateComentarioClick}>${this.cmdCreateComentarioState === 'loading' ? msg['common.saving'] : msg['common.save']}</button><button class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-4 py-2 text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('base')}>${msg['common.cancel']}</button></div></div></section>`;
}
renderScenaryUpdateComentario() {
const msg = this.msg;
return html`<section class="mx-auto max-w-3xl space-y-6 p-4 md:p-6"><header><h2 class="text-xl font-semibold">${msg['section.recordForm.title']}</h2><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['common.updateHint']}</p></header><div class="space-y-4 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5"><div class="grid gap-3 text-sm md:grid-cols-2"><span>${msg['common.chamado']}: ${this.cmdUpdateComentarioChamadoId}</span><span>${msg['common.atendente']}: ${this.cmdUpdateComentarioAtendenteId}</span></div><label class="block text-sm font-medium">${msg['common.content']}<textarea class="mt-1 min-h-32 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdUpdateComentarioConteudo} @change=${this.handleCmdUpdateComentarioConteudoChange}></textarea></label>${this.cmdUpdateComentarioState === 'error' ? html`<p class="rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateComentarioError || msg['action.cmdUpdateComentario.error']}</p>` : nothing}${this.cmdUpdateComentarioState === 'success' ? html`<p class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateComentario.success']}</p>` : nothing}<div class="flex gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-2 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId || !this.cmdUpdateComentarioConteudo || this.cmdUpdateComentarioState === 'loading'} title=${!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId ? msg['common.noSelection'] : ''} @click=${this.handleCmdUpdateComentarioClick}>${this.cmdUpdateComentarioState === 'loading' ? msg['common.saving'] : msg['common.save']}</button><button class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-4 py-2 text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('detail')}>${msg['common.cancel']}</button></div></div></section>`;
}
}
