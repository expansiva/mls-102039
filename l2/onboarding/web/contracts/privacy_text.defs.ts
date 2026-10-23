/// <mls fileReference="_102039_/l2/onboarding/web/contracts/privacy_text.defs.ts" enhancement="_blank"/>

/** The content of a privacy text version: its text, provisional flag, change note and whether it is the current version. */
export interface PrivacyTextVersionDetails {
  text: string;
  isProvisional: boolean;
  changeNote?: string;
  readonly isCurrent: boolean;
}

/** A version of the privacy text people accept, with its code, status, publication moment and content. */
export interface PrivacyTextVersionRecord {
  id: string;
  version: number;
  readonly versionCode: string;
  status: 'draft' | 'published';
  readonly publishedAt?: string;
  details: PrivacyTextVersionDetails;
}

export interface Privacy_textContracts {
  /**
   * Purpose: Loads everything the privacy text page shows when it opens: the current privacy text, the pending draft, if there is one, and the full version history.
   * Input: No input. The organization comes from the session of the company owner.
   * Processing: Reads the organization’s privacy text versions, ordered by publication moment, newest first, with drafts at the top. isCurrent is computed, never stored: by currentVersionIsLatestPublished, the current version is the published version with the latest publishedAt. ’current’ is that version. ’draft’ is the most recent version still in draft status. Following initialProvisionalPrivacyText, the initial version 1 keeps isProvisional true so the owner sees it must be replaced. The version history is small, so it is not paged.
   * Output: current: the current published version with its text, version code, publication moment and provisional flag (absent only if nothing is published). draft: the latest draft version, or absent. versions: every version, drafts and published, with code, status, publication moment, change note and the isCurrent flag.
   */
  'onboarding.privacy_text.getPrivacyTextPage': {
    kind: 'qry';
    input: {};
    output: { current?: PrivacyTextVersionRecord; draft?: PrivacyTextVersionRecord; versions: PrivacyTextVersionRecord[] };
    rules: ['currentVersionIsLatestPublished', 'initialProvisionalPrivacyText'];
    access: { actors: ['companyOwner']; grants: ['ownerPublishPrivacyText']; scope: 'organization' };
  };
  /**
   * Purpose: Creates a new privacy text version as a draft from the text the owner wrote.
   * Input: details.text: the full new privacy details.text (required). details.changeNote: an optional short note on what changed from the previous version.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Gives the new version the next version code from the platform number sequence (privacyVersionCodeFromSequence). Creates it with status draft and isProvisional false, without publishedAt. No published version is touched (publishedVersionImmutable): the change becomes a new version. isCurrent is computed, and it is false for a draft.
   * Output: version: the new draft version with its id, version, issued version code, status draft, text, change note and isCurrent false.
   */
  'onboarding.privacy_text.createPrivacyVersion': {
    kind: 'cmd';
    writes: 'PrivacyTextVersion.create';
    input: { details: { text: string; changeNote?: string } };
    output: { version: PrivacyTextVersionRecord };
    rules: ['onlyOwnerMaintainsPrivacyText', 'privacyVersionCodeFromSequence', 'publishedVersionImmutable'];
    access: { actors: ['companyOwner']; grants: ['ownerPublishPrivacyText']; scope: 'organization' };
  };
  /**
   * Purpose: Publishes a draft privacy text version so that it becomes the current privacy text.
   * Input: id: the draft version to publish. version: its concurrency version, for the optimistic check.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Refuses a version that is not in draft status or whose version does not match. Runs the publishPrivacyVersion transition from draft to published, and the platform sets publishedAt. From then on the version is frozen (publishedVersionImmutable). Because it is now the latest published version, it becomes current (currentVersionIsLatestPublished). isCurrent is computed, never stored. Earlier acceptances stop being valid for completing access (newCurrentVersionRequiresReacceptance, reacceptOnNewPrivacyVersion). This comes from computing consentValid against the current version code, and no person record is written.
   * Output: version: the published version in its new state, with status published, publishedAt set and isCurrent true.
   */
  'onboarding.privacy_text.publishPrivacyVersion': {
    kind: 'cmd';
    writes: 'PrivacyTextVersion.publishPrivacyVersion';
    input: { id: string; version: number };
    output: { version: PrivacyTextVersionRecord };
    rules: ['onlyOwnerMaintainsPrivacyText', 'publishedVersionImmutable', 'currentVersionIsLatestPublished', 'newCurrentVersionRequiresReacceptance', 'reacceptOnNewPrivacyVersion'];
    access: { actors: ['companyOwner']; grants: ['ownerPublishPrivacyText']; scope: 'organization' };
  };
}
