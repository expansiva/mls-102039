/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page21/comentarioCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosComentarioCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/comentarioCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
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
'base.intro': 'Escolha o chamado e o atendente para registrar um novo comentário.',
'field.required': 'Obrigatório',
'field.chooseChamado': 'Selecione um chamado',
'field.chooseAtendente': 'Selecione um atendente',
'field.comment': 'Comentário',
'button.continue': 'Continuar',
'button.cancel': 'Cancelar',
'button.save': 'Salvar comentário',
'button.delete': 'Excluir comentário',
'button.edit': 'Editar comentário',
'button.retry': 'Tentar novamente',
'loading.content': 'Carregando informações…',
'feedback.missingSelection': 'Selecione o chamado e o atendente antes de continuar.',
'feedback.deleteConfirm': 'Confirma a exclusão deste comentário?',
'feedback.updateMissing': 'Não foi possível identificar o comentário para edição.',
'feedback.deleteMissing': 'Não foi possível identificar o comentário para exclusão.',
'new.comment': 'Novo comentário',
'current.comment': 'Comentário atual',
'current.status': 'Registrado',
'detail.reference': 'Detalhes do registro',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--comentario-catalogue-102039')
export class ControleChamadosDesktopPage21ComentarioCataloguePage extends ControleChamadosComentarioCatalogueBase {
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
const canContinue = Boolean(this.cmdCreateComentarioChamadoId && this.cmdCreateComentarioAtendenteId);
return html`
<section class="mx-auto flex max-w-2xl flex-col gap-6 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0 1px 2px rgba(0,0,0,.08))]">
<div class="flex flex-col gap-2">
<h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.comentarioWorkbench.title']}</h1>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['base.intro']}</p>
</div>
${this.qryListComentarioState === 'loading' || this.qryChamadoPickerState === 'loading' || this.qryAtendentePickerState === 'loading'
? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['loading.content']}</p>`
: nothing}
${this.qryListComentarioState === 'success' && this.qryListComentarioData.length > 0 ? html`
<div class="flex flex-col gap-2">
<h2 class="text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['intent.qryListComentario.list.title']}</h2>
<div class="overflow-x-auto rounded-md border border-[var(--border-subtle,#e2e8f0)]">
<table class="w-full text-left text-sm"><thead><tr class="border-b border-[var(--border-subtle,#e2e8f0)]"><th class="p-3">${msg['intent.qryListComentario.list.column.chamadoId.label']}</th><th class="p-3">${msg['intent.qryListComentario.list.column.atendenteId.label']}</th><th class="p-3">${msg['intent.qryListComentario.list.column.conteudo.label']}</th></tr></thead><tbody>
${this.qryListComentarioData.map((item) => html`<tr class="cursor-pointer border-b border-[var(--border-subtle,#e2e8f0)] ${String(item.comentarioId) === this.qryGetComentarioComentarioId ? 'bg-[var(--selected-bg,#e2e8f0)]' : ''}" @click=${() => { this.setQryGetComentarioComentarioId(String(item.comentarioId)); void this.loadQryGetComentario(); }}><td class="p-3">${String(item.chamadoId)}</td><td class="p-3">${String(item.atendenteId)}</td><td class="p-3">${String(item.conteudo)}</td></tr>`)}
</tbody></table></div></div>` : nothing}
<div class="flex flex-col gap-2">
<label class="text-sm font-medium text-[var(--text-default,#0f172a)]" for="create-chamado">${msg['intent.qryChamadoPicker.list.column.chamadoId.label']} <span aria-hidden="true">*</span><span class="sr-only">${msg['field.required']}</span></label>
<select id="create-chamado" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateComentarioChamadoId} @change=${this.handleCmdCreateComentarioChamadoIdChange}>
<option value="">${msg['field.chooseChamado']}</option>
${this.qryChamadoPickerData.map((item) => html`<option value=${String(item.chamadoId)}>${String(item.titulo ?? item.chamadoId)}</option>`)}
</select>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-medium text-[var(--text-default,#0f172a)]" for="create-atendente">${msg['intent.qryAtendentePicker.list.column.atendenteId.label']} <span aria-hidden="true">*</span><span class="sr-only">${msg['field.required']}</span></label>
<select id="create-atendente" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateComentarioAtendenteId} @change=${this.handleCmdCreateComentarioAtendenteIdChange}>
<option value="">${msg['field.chooseAtendente']}</option>
${this.qryAtendentePickerData.map((item) => html`<option value=${String(item.atendenteId)}>${String(item.platformUserId ?? item.atendenteId)}</option>`)}
</select>
</div>
${!canContinue && (this.cmdCreateComentarioChamadoId || this.cmdCreateComentarioAtendenteId) ? html`<p class="text-sm text-[var(--status-warning-text,#92400e)]">${msg['feedback.missingSelection']}</p>` : nothing}
<button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId} title=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId ? msg['feedback.missingSelection'] : ''} @click=${() => this.setUiScenary('createComentario')}>${msg['button.continue']}</button>
${this.cmdCreateComentarioState === 'success' ? html`<p role="status" class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateComentario.success']}</p>` : nothing}
${this.cmdCreateComentarioState === 'error' ? html`<p role="alert" class="text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdCreateComentarioError || msg['action.cmdCreateComentario.error']}</p>` : nothing}
</section>
`;
}
renderScenaryDetail() {
const msg = this.msg;
const record = this.qryGetComentarioData;
if (this.qryGetComentarioState === 'loading') return html`<p class="p-6 text-sm text-[var(--text-muted,#64748b)]">${msg['loading.content']}</p>`;
if (!record) return html`<p class="p-6 text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetComentario.list.empty']}</p>`;
const recordId = String(record.comentarioId);
return html`
<section class="mx-auto flex max-w-2xl flex-col gap-5 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6">
<div class="flex items-start justify-between gap-4"><div><h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['detail.reference']}</h1><p class="text-sm text-[var(--text-muted,#64748b)]">${msg['current.status']}</p></div><span class="rounded-full bg-[var(--status-neutral-bg,#e2e8f0)] px-3 py-1 text-sm text-[var(--status-neutral-text,#334155)]">${msg['current.status']}</span></div>
<dl class="grid gap-4 sm:grid-cols-2"><div><dt class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetComentario.list.column.chamadoId.label']}</dt><dd class="text-[var(--text-default,#0f172a)]">${String(record.chamadoId)}</dd></div><div><dt class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetComentario.list.column.atendenteId.label']}</dt><dd class="text-[var(--text-default,#0f172a)]">${String(record.atendenteId)}</dd></div></dl>
<div><dt class="text-sm text-[var(--text-muted,#64748b)]">${msg['intent.qryGetComentario.list.column.conteudo.label']}</dt><dd class="mt-1 whitespace-pre-wrap text-[var(--text-default,#0f172a)]">${String(record.conteudo)}</dd></div>
<div class="flex flex-wrap gap-3"><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" @click=${() => { this.setCmdUpdateComentarioComentarioId(recordId); this.setCmdUpdateComentarioChamadoId(String(record.chamadoId)); this.setCmdUpdateComentarioAtendenteId(String(record.atendenteId)); this.setCmdUpdateComentarioConteudo(String(record.conteudo)); this.setUiScenary('updateComentario'); }}>${msg['button.edit']}</button><button class="rounded-md bg-[var(--button-danger-bg,#b91c1c)] px-4 py-3 text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteComentarioComentarioId || this.cmdDeleteComentarioState === 'loading'} title=${!this.cmdDeleteComentarioComentarioId ? msg['feedback.deleteMissing'] : ''} @click=${() => { this.setCmdDeleteComentarioComentarioId(recordId); if (window.confirm(msg['feedback.deleteConfirm'])) this.handleCmdDeleteComentarioClick(); }}>${this.cmdDeleteComentarioState === 'loading' ? msg['loading.content'] : msg['button.delete']}</button></div>
${this.cmdDeleteComentarioState === 'success' ? html`<p role="status" class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteComentario.success']}</p>` : nothing}
${this.cmdDeleteComentarioState === 'error' ? html`<p role="alert" class="text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdDeleteComentarioError || msg['action.cmdDeleteComentario.error']}</p>` : nothing}
</section>`;
}
renderScenaryCreateComentario() {
const msg = this.msg;
const ready = Boolean(this.cmdCreateComentarioChamadoId && this.cmdCreateComentarioAtendenteId);
return html`<section class="mx-auto flex max-w-2xl flex-col gap-6 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.comentarioCreation.title']}</h1><div class="flex flex-col gap-2"><label for="create-conteudo" class="text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['field.comment']}</label><textarea id="create-conteudo" rows="6" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdCreateComentarioConteudo} @input=${this.handleCmdCreateComentarioConteudoChange}></textarea></div>${this.cmdCreateComentarioState === 'error' ? html`<p role="alert" class="text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdCreateComentarioError || msg['action.cmdCreateComentario.error']}</p>` : nothing}${this.cmdCreateComentarioState === 'success' ? html`<p role="status" class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateComentario.success']}</p>` : nothing}<div class="flex gap-3"><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('base')}>${msg['button.cancel']}</button><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId || this.cmdCreateComentarioState === 'loading'} title=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId ? msg['feedback.missingSelection'] : ''} @click=${this.handleCmdCreateComentarioClick}>${this.cmdCreateComentarioState === 'loading' ? msg['loading.content'] : msg['button.save']}</button></div></section>`;
}
renderScenaryUpdateComentario() {
const msg = this.msg;
const ready = Boolean(this.cmdUpdateComentarioComentarioId && this.cmdUpdateComentarioChamadoId && this.cmdUpdateComentarioAtendenteId);
return html`<section class="mx-auto flex max-w-2xl flex-col gap-6 rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6"><h1 class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${msg['current.comment']}</h1><div class="flex flex-col gap-2"><label for="update-conteudo" class="text-sm font-medium text-[var(--text-default,#0f172a)]">${msg['field.comment']}</label><textarea id="update-conteudo" rows="6" class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdUpdateComentarioConteudo} @input=${this.handleCmdUpdateComentarioConteudoChange}></textarea></div>${this.cmdUpdateComentarioState === 'error' ? html`<p role="alert" class="text-sm text-[var(--status-error-text,#991b1b)]">${this.cmdUpdateComentarioError || msg['action.cmdUpdateComentario.error']}</p>` : nothing}${this.cmdUpdateComentarioState === 'success' ? html`<p role="status" class="text-sm text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateComentario.success']}</p>` : nothing}<div class="flex gap-3"><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#0f172a)]" @click=${() => this.setUiScenary('detail')}>${msg['button.cancel']}</button><button class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 text-[var(--button-primary-text,#ffffff)]" ?disabled=${!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId || this.cmdUpdateComentarioState === 'loading'} title=${!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId ? msg['feedback.updateMissing'] : ''} @click=${this.handleCmdUpdateComentarioClick}>${this.cmdUpdateComentarioState === 'loading' ? msg['loading.content'] : msg['button.save']}</button></div></section>`;
}
}
