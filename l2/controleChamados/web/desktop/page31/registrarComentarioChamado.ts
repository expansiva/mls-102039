/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page31/registrarComentarioChamado.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosRegistrarComentarioChamadoBase } from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryLocateChamadoOutput,
QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.locateChamado.title': 'Chamado selecionado',
'organism.qryLocateChamado.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryLocateChamado.list.column.chamadoId.label': 'Chamado',
'intent.qryLocateChamado.list.column.titulo.label': 'Título',
'intent.qryLocateChamado.list.column.descricao.label': 'Descrição',
'intent.qryLocateChamado.list.column.status.label': 'Status',
'section.registerComentario.title': 'Registrar comentário',
'organism.cmdRegisterComentario.title': 'Registrar comentário',
'intent.cmdRegisterComentario.form.title': 'Registrar comentário',
'intent.cmdRegisterComentario.form.action.cmdRegisterComentario': 'Registrar comentário',
'intent.cmdRegisterComentario.form.field.conteudo.label': 'Comentário',
'organism.qryAtendentePicker.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.empty': 'Nenhum registro encontrado',
'intent.qryAtendentePicker.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryAtendentePicker.list.column.platformUserId.label': 'Usuário da plataforma',
'action.cmdRegisterComentario.success': 'Registrar comentário: OK',
'action.cmdRegisterComentario.error': 'Registrar comentário: falhou',
'status.open': 'Aberto',
'status.closed': 'Fechado',
'scenary.base': 'Localizar o chamado aberto',
'scenary.registerComentario': 'Registrar comentário',
'process.opening': 'Escolha o chamado e o atendente para registrar o acompanhamento.',
'process.chooseAttendant': 'Atendente responsável',
'process.chooseAttendantHint': 'Selecione quem está registrando o comentário.',
'process.continue': 'Continuar',
'process.chooseCall': 'Escolha o chamado que receberá o comentário.',
'process.selectedCall': 'Chamado escolhido',
'process.selectedAttendant': 'Atendente escolhido',
'process.change': 'Alterar',
'process.commentHint': 'Escreva o próximo registro do acompanhamento.',
'process.required': 'Obrigatório',
'process.discard': 'Voltar',
'process.success': 'Comentário registrado com sucesso.',
'process.loading': 'Carregando...',
'process.saving': 'Registrando...',
'process.noCall': 'Nenhum chamado aberto disponível.',
'process.noAttendant': 'Nenhum atendente disponível.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--registrar-comentario-chamado-102039')
export class ControleChamadosDesktopPage31RegistrarComentarioChamadoPage extends ControleChamadosRegistrarComentarioChamadoBase {
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
@change=${this.handleUiScenaryChange}>
<Scene value="base" title=${msg['scenary.base']}>
${this.renderScenaryBase()}
</Scene>
<Scene value="registerComentario" title=${msg['scenary.registerComentario']}>
${this.renderScenaryRegisterComentario()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const selectedCall: QryLocateChamadoOutput | undefined = this.qryLocateChamadoData.find(
(item: QryLocateChamadoOutput): boolean => item.chamadoId === this.cmdRegisterComentarioChamadoId,
);
const selectedAttendant: QryAtendentePickerOutput | undefined = this.qryAtendentePickerData.find(
(item: QryAtendentePickerOutput): boolean => item.atendenteId === this.cmdRegisterComentarioAtendenteId,
);
const canContinue: boolean = Boolean(selectedCall && selectedAttendant);
return html`
<section class="mx-auto flex max-w-5xl flex-col gap-6 p-6 text-[var(--text-default,#0f172a)]">
<div class="flex flex-col gap-2">
<h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['organism.qryLocateChamado.title']}</h1>
<p class="text-[var(--text-muted,#64748b)]">${msg['process.opening']}</p>
</div>
${this.cmdRegisterComentarioState === 'success' ? html`
<p class="rounded-lg bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]" role="status">${msg['action.cmdRegisterComentario.success']}</p>
` : nothing}
${this.qryLocateChamadoState === 'loading' ? html`<p class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4">${msg['process.loading']}</p>` : nothing}
<div class="grid gap-6 md:grid-cols-2">
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<h2 class="mb-3 text-lg font-bold">${msg['process.chooseCall']}</h2>
${this.qryLocateChamadoState !== 'loading' && this.qryLocateChamadoData.length === 0 ? html`<p class="text-[var(--text-muted,#64748b)]">${msg['process.noCall']}</p>` : nothing}
<div class="flex flex-col gap-2">
${this.qryLocateChamadoData.map((item: QryLocateChamadoOutput) => html`
<button type="button"
class="rounded-lg border p-4 text-left ${item.chamadoId === this.cmdRegisterComentarioChamadoId ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)]' : 'border-[var(--border-subtle,#e2e8f0)]'}"
@click=${(): void => {
this.setCmdRegisterComentarioChamadoId(item.chamadoId);
if (this.cmdRegisterComentarioAtendenteId) this.setUiScenary('registerComentario');
}}>
<strong class="block">${item.titulo}</strong>
<span class="block text-sm text-[var(--text-muted,#64748b)]">${item.descricao}</span>
<span class="mt-2 inline-block text-sm text-[var(--status-info-text,#1d4ed8)]">${msg['intent.qryLocateChamado.list.column.status.label']}: ${item.status === 'open' ? msg['status.open'] : item.status === 'closed' ? msg['status.closed'] : item.status}</span>
</button>`)}
</div>
</section>
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<h2 class="mb-3 text-lg font-bold">${msg['process.chooseAttendant']}</h2>
<p class="mb-3 text-sm text-[var(--text-muted,#64748b)]">${msg['process.chooseAttendantHint']}</p>
<select class="w-full rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3"
.value=${this.cmdRegisterComentarioAtendenteId}
@change=${this.handleCmdRegisterComentarioAtendenteIdChange}>
<option value="">${msg['process.chooseAttendant']}</option>
${this.qryAtendentePickerData.map((item: QryAtendentePickerOutput) => html`<option value=${item.atendenteId}>${item.platformUserId}</option>`)}
</select>
${this.qryAtendentePickerState !== 'loading' && this.qryAtendentePickerData.length === 0 ? html`<p class="mt-3 text-sm text-[var(--text-muted,#64748b)]">${msg['process.noAttendant']}</p>` : nothing}
${selectedCall ? html`<p class="mt-5 text-sm text-[var(--text-muted,#64748b)]"><span class="font-bold">${msg['process.selectedCall']}:</span> ${selectedCall.titulo}</p>` : nothing}
${selectedAttendant ? html`<p class="mt-2 text-sm text-[var(--text-muted,#64748b)]"><span class="font-bold">${msg['process.selectedAttendant']}:</span> ${selectedAttendant.platformUserId}</p>` : nothing}
<button type="button" class="mt-5 rounded-lg bg-[var(--button-primary-bg,#2563eb)] px-5 py-3 font-bold text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${!canContinue} @click=${(): void => this.setUiScenary('registerComentario')}>${msg['process.continue']}</button>
</section>
</div>
</section>
`;
}
renderScenaryRegisterComentario() {
const msg = this.msg;
const selectedCall: QryLocateChamadoOutput | undefined = this.qryLocateChamadoData.find(
(item: QryLocateChamadoOutput): boolean => item.chamadoId === this.cmdRegisterComentarioChamadoId,
);
const selectedAttendant: QryAtendentePickerOutput | undefined = this.qryAtendentePickerData.find(
(item: QryAtendentePickerOutput): boolean => item.atendenteId === this.cmdRegisterComentarioAtendenteId,
);
const canSubmit: boolean = Boolean(this.cmdRegisterComentarioConteudo.trim() && selectedCall && selectedAttendant);
const missingPrecondition: string = !this.cmdRegisterComentarioAtendenteId
? msg['process.chooseAttendantHint']
: !this.cmdRegisterComentarioChamadoId
? msg['process.chooseCall']
: '';
return html`
<section class="mx-auto flex max-w-3xl flex-col gap-6 p-6 text-[var(--text-default,#0f172a)]">
<div class="flex flex-col gap-2">
<h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['organism.cmdRegisterComentario.title']}</h1>
<p class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4 text-[var(--text-muted,#64748b)]">${msg['process.selectedCall']}: ${selectedCall?.titulo ?? ''} · ${msg['process.selectedAttendant']}: ${selectedAttendant?.platformUserId ?? ''}</p>
</div>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<label class="mb-2 block font-bold" for="comentario">${msg['intent.cmdRegisterComentario.form.field.conteudo.label']} <span class="font-normal text-[var(--text-muted,#64748b)]">(${msg['process.required']})</span></label>
<textarea id="comentario" class="min-h-40 w-full rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdRegisterComentarioConteudo} @input=${this.handleCmdRegisterComentarioConteudoChange} aria-label=${msg['intent.cmdRegisterComentario.form.field.conteudo.label']}></textarea>
<p class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['process.commentHint']}</p>
${this.cmdRegisterComentarioState === 'error' ? html`<p class="mt-4 rounded-lg bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#991b1b)]" role="alert">${this.cmdRegisterComentarioError || msg['action.cmdRegisterComentario.error']}</p>` : nothing}
<div class="mt-5 flex flex-wrap gap-3">
<button type="button" class="rounded-lg border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-5 py-3 text-[var(--button-secondary-text,#334155)]" @click=${(): void => this.setUiScenary('base')}>${msg['process.discard']}</button>
<button type="button" class="rounded-lg bg-[var(--button-primary-bg,#2563eb)] px-5 py-3 font-bold text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${!this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioChamadoId || !canSubmit || this.cmdRegisterComentarioState === 'loading'} title=${missingPrecondition} @click=${this.handleCmdRegisterComentarioClick}>${this.cmdRegisterComentarioState === 'loading' ? msg['process.saving'] : msg['intent.cmdRegisterComentario.form.action.cmdRegisterComentario']}</button>
</div>
</div>
</section>
`;
}
}
