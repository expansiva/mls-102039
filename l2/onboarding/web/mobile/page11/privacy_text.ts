/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/privacy_text.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingPrivacy_textShared } from '/_102039_/l2/onboarding/web/shared/privacy_text.js';
import type { PrivacyTextVersionRecord } from '/_102039_/l2/onboarding/web/shared/privacy_text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
const STATUS_KEY: Record<PrivacyTextVersionRecord['status'], keyof PageMessageType> = {
draft: 'statusDraft',
published: 'statusPublished',
};
function formatDate(value: string | undefined) {
if (!value) return '';
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
dateStyle: 'medium',
timeStyle: 'short',
}).format(new Date(value));
}
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Privacy text',
currentText: 'Current privacy text',
noCurrentText: 'No privacy text has been published yet.',
provisionalNotice: 'This is the provisional starting text. Replace it with your company privacy text when ready.',
versionCode: 'Version code',
publishedAt: 'Published at',
privacyText: 'Privacy text',
privacyTextPlaceholder: 'Write the full privacy text people will read and accept.',
privacyTextHelper: 'This text is shown on the access screen.',
changeNote: 'Change note',
changeNotePlaceholder: 'Briefly describe what changed (optional).',
changeNoteHelper: 'This note helps you recognize the version later.',
createVersion: 'Create new version',
creatingVersion: 'Creating new version',
publishVersion: 'Publish version',
publishingVersion: 'Publishing version',
pendingVersion: 'A draft is ready to publish.',
publishConfirmationTitle: 'Publish this version?',
publishConfirmationMessage: 'This version will become the current privacy text. People who accepted an earlier version will need to accept again.',
confirmPublish: 'Publish version',
cancel: 'Cancel',
history: 'Version history',
historyCaption: 'Privacy text versions',
status: 'Status',
current: 'Current',
yes: 'Yes',
no: 'No',
statusDraft: 'Draft',
statusPublished: 'Published',
noVersions: 'No privacy text versions are available yet.',
loading: 'Loading privacy text…',
loadErrorTitle: 'Privacy text could not be loaded',
createErrorTitle: 'New version could not be created',
publishErrorTitle: 'Version could not be published',
retry: 'Try again',
createSuccessTitle: 'New version created',
createSuccessMessage: 'Your draft is ready to review and publish.',
publishSuccessTitle: 'Version published',
publishSuccessMessage: 'The new version is now the current privacy text.',
requiredPrivacyText: 'Enter the privacy text before creating a version.',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
@customElement('onboarding--web--mobile--page11--privacy_text-102039')
export class OnboardingMobilePage11Privacy_textPage extends OnboardingPrivacy_textShared {
private msg: PageMessageType = pageMessage_en;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const draft = this.createPrivacyVersionDraft;
const isLoading = this.getPrivacyTextPageStatus === 'loading';
const isCreating = this.createPrivacyVersionStatus === 'loading';
const isPublishing = this.publishPrivacyVersionStatus === 'loading';
const textError = this.createPrivacyVersionError?.code === 'client.requiredMissing'
? this.msg.requiredPrivacyText
: '';
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
<header class="mx-auto max-w-xl">
<h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
</header>
<molecules--ml-scenary-102020 class="mx-auto mt-5 block max-w-xl" mode="scenary" .value=${this.scenary || 'library'} backLabel=${this.msg.cancel}
@change=${(e: Event) => { if (e.target === e.currentTarget) this.setScenario('library'); }}>
<Scene value="library" title=${this.msg.pageTitle}>
${this.getPrivacyTextPageError ? html`
<section class="mb-4" aria-live="polite">
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.loadErrorTitle}</Title>
<Message>${this.getPrivacyTextPageError.message}</Message>
<Action>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" .loading=${isLoading} @action=${() => this.getPrivacyTextPage()}>
<Label>${this.msg.retry}</Label>
</grouptriggeraction--ml-button-standard>
</Action>
</groupnotifyuser--ml-contextual-feedback>
</section>
` : ''}
<section data-organism-id="currentPrivacyText" aria-busy=${isLoading ? 'true' : 'false'}>
<groupviewcard--ml-vertical-card .loading=${isLoading}>
<CardHeader>
<CardTitle>${this.msg.currentText}</CardTitle>
${this.current ? html`<CardDescription>${this.current.versionCode}</CardDescription>` : ''}
</CardHeader>
<CardContent>
${this.current ? html`
${this.current.details.isProvisional ? html`
<p class="mb-4 rounded-lg bg-[var(--status-warning-bg,transparent)] px-3 py-2 text-sm text-[var(--status-warning-text,currentColor)]">${this.msg.provisionalNotice}</p>
` : ''}
<p class="whitespace-pre-wrap break-words text-sm leading-6 text-[var(--text-default,currentColor)]">${this.current.details.text}</p>
` : html`
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.noCurrentText}</p>
`}
</CardContent>
${this.current?.publishedAt ? html`
<CardFooter>
<span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.publishedAt}: ${formatDate(this.current.publishedAt)}</span>
</CardFooter>
` : ''}
</groupviewcard--ml-vertical-card>
</section>
<section data-organism-id="newVersionForm" class="mt-7 border-t border-[var(--border-subtle,currentColor)] pt-6">
<groupentertext--ml-multiline-text
.value=${draft.details.text ?? ''}
.error=${textError}
.name=${'privacyText'}
.placeholder=${this.msg.privacyTextPlaceholder}
.rows=${10}
.required=${true}
.disabled=${isCreating || isPublishing}
@input=${(e: CustomEvent<{ value: string }>) => this.setCreatePrivacyVersionDraft({
...draft,
details: { ...draft.details, text: e.detail.value || null },
})}
>
<Label>${this.msg.privacyText}</Label>
<Helper>${this.msg.privacyTextHelper}</Helper>
</groupentertext--ml-multiline-text>
<div class="mt-5">
<groupentertext--ml-multiline-text
.value=${draft.details.changeNote ?? ''}
.error=${''}
.name=${'changeNote'}
.placeholder=${this.msg.changeNotePlaceholder}
.rows=${3}
.disabled=${isCreating || isPublishing}
@input=${(e: CustomEvent<{ value: string }>) => this.setCreatePrivacyVersionDraft({
...draft,
details: { ...draft.details, changeNote: e.detail.value || null },
})}
>
<Label>${this.msg.changeNote}</Label>
<Helper>${this.msg.changeNoteHelper}</Helper>
</groupentertext--ml-multiline-text>
</div>
</section>
<section data-organism-id="versionActions" class="mt-5" aria-live="polite">
${this.createPrivacyVersionError && textError === '' ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.createErrorTitle}</Title>
<Message>${this.createPrivacyVersionError.message}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
${this.publishPrivacyVersionError ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.publishErrorTitle}</Title>
<Message>${this.publishPrivacyVersionError.message}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
${this.draft ? html`<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pendingVersion}</p>` : ''}
<div class="grid grid-cols-1 gap-3">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" .loading=${isCreating} .disabled=${isPublishing} @action=${() => this.createPrivacyVersion()}>
<Label>${isCreating ? this.msg.creatingVersion : this.msg.createVersion}</Label>
</grouptriggeraction--ml-button-standard>
${this.draft ? html`
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .disabled=${isCreating || isPublishing} @action=${() => this.setScenario('confirmPublish')}>
<Label>${this.msg.publishVersion}</Label>
</grouptriggeraction--ml-button-standard>
` : ''}
</div>
<groupnotifyuser--ml-toast-notification type="success" .visible=${this.createPrivacyVersionStatus === 'success'} .dismissible=${true} .duration=${5000} position="bottom">
<Title>${this.msg.createSuccessTitle}</Title>
<Message>${this.msg.createSuccessMessage}</Message>
</groupnotifyuser--ml-toast-notification>
<groupnotifyuser--ml-toast-notification type="success" .visible=${this.publishPrivacyVersionStatus === 'success'} .dismissible=${true} .duration=${5000} position="bottom">
<Title>${this.msg.publishSuccessTitle}</Title>
<Message>${this.msg.publishSuccessMessage}</Message>
</groupnotifyuser--ml-toast-notification>
</section>
<section data-organism-id="privacyVersionList" class="mt-8 border-t border-[var(--border-subtle,currentColor)] pt-6">
<groupviewtable--ml-responsive-table .loading=${isLoading} .page=${1} .pageSize=${0} .totalItems=${0} .value=${''}>
<TableCaption>${this.msg.historyCaption}</TableCaption>
<TableHeader>
<TableRow>
<TableHead key="version">${this.msg.versionCode}</TableHead>
<TableHead key="status">${this.msg.status}</TableHead>
<TableHead key="publishedAt">${this.msg.publishedAt}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${this.versions.map((version) => html`
<TableRow key=${version.id}>
<TableCell>${version.versionCode}${version.details.isCurrent ? html` · ${this.msg.current}` : ''}</TableCell>
<TableCell>${this.msg[STATUS_KEY[version.status]]}</TableCell>
<TableCell>${formatDate(version.publishedAt)}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg.noVersions}</Empty>
<Loading>${this.msg.loading}</Loading>
</groupviewtable--ml-responsive-table>
</section>
</Scene>
<Scene value="confirmPublish" title=${this.msg.publishConfirmationTitle} nav="back">
<groupnotifyuser--ml-alert-modal
type="warning"
.visible=${true}
.dismissible=${true}
.duration=${0}
@dismiss=${() => this.setScenario('library')}
@action=${() => {
this.publishPrivacyVersion();
this.setScenario('library');
}}
>
<Title>${this.msg.publishConfirmationTitle}</Title>
<Message>${this.msg.publishConfirmationMessage}</Message>
<Action>
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .loading=${isPublishing}>
<Label>${isPublishing ? this.msg.publishingVersion : this.msg.confirmPublish}</Label>
</grouptriggeraction--ml-button-standard>
</Action>
</groupnotifyuser--ml-alert-modal>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
