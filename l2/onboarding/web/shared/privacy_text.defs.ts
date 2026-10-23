/// <mls fileReference="_102039_/l2/onboarding/web/shared/privacy_text.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "requests": {
    "getPrivacyTextPage": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "current",
        "draft",
        "versions"
      ]
    },
    "createPrivacyVersion": {
      "kind": "cmd",
      "trigger": "createVersion",
      "returns": [
        "version"
      ],
      "writes": "PrivacyTextVersion.create"
    },
    "publishPrivacyVersion": {
      "kind": "cmd",
      "trigger": "publishVersion",
      "returns": [
        "version"
      ],
      "writes": "PrivacyTextVersion.publishPrivacyVersion"
    }
  },
  "states": {
    "current": {
      "source": "getPrivacyTextPage.current",
      "description": "A version of the privacy text people accept, with its code, status, publication moment and content.",
      "organisms": [
        "currentPrivacyText"
      ]
    },
    "versions": {
      "source": "getPrivacyTextPage.versions",
      "description": "the list of A version of the privacy text people accept, with its code, status, publication moment and content.",
      "organisms": [
        "privacyVersionList"
      ]
    },
    "draft": {
      "source": "getPrivacyTextPage.draft",
      "description": "A version of the privacy text people accept, with its code, status, publication moment and content.",
      "organisms": [
        "versionActions"
      ]
    }
  },
  "journeys": [
    {
      "step": "publishPrivacyText/viewCurrentVersion",
      "organisms": [
        "currentPrivacyText",
        "privacyVersionList"
      ]
    },
    {
      "step": "publishPrivacyText/createVersion",
      "organisms": [
        "newVersionForm",
        "versionActions"
      ]
    },
    {
      "step": "publishPrivacyText/publishVersion",
      "organisms": [
        "versionActions"
      ]
    }
  ],
  "rules": [
    "currentVersionIsLatestPublished",
    "initialProvisionalPrivacyText",
    "newCurrentVersionRequiresReacceptance",
    "onlyOwnerMaintainsPrivacyText",
    "privacyVersionCodeFromSequence",
    "publishedVersionImmutable",
    "reacceptOnNewPrivacyVersion"
  ],
  "access": {
    "actors": [
      "companyOwner"
    ],
    "grants": [
      "ownerPublishPrivacyText"
    ]
  }
} as const;
