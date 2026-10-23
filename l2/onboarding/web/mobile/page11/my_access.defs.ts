/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/my_access.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "On a narrow screen (around 390px, still usable at 360px and 430px), guide the signed-in person from top to bottom: see what is missing, fill in only the missing name and country, accept the current privacy text when the country requires it, and save to reach their modules.",
  "sections": [
    {
      "id": "accessStatusSection",
      "priority": "primary",
      "purpose": "A compact status at the top with the login e-mail, whether access is complete and what is still missing.",
      "organisms": [
        "accessStatusSummary"
      ]
    },
    {
      "id": "completeDataSection",
      "priority": "main",
      "purpose": "The missing data fields come first, followed by the privacy text and its acceptance box. Everything flows in a single column, and the long privacy text can be expanded to read in full.",
      "organisms": [
        "missingDataForm",
        "privacyConsentDetail"
      ]
    },
    {
      "id": "saveSection",
      "priority": "secondary",
      "purpose": "A full-width save action after the content, easy to reach with a thumb.",
      "organisms": [
        "saveAccessActions"
      ]
    }
  ],
  "organisms": {
    "accessStatusSummary": {
      "kind": "summary",
      "text": "See your login e-mail (read-only), whether your access is complete and the list of what is still missing. Each missing item says whether you complete it or the owner must release your access.",
      "intents": []
    },
    "missingDataForm": {
      "kind": "form",
      "text": "Fill in only the missing name and choose your country from the active country list, shown in your language. An unknown country is never filled in for you.",
      "intents": []
    },
    "privacyConsentDetail": {
      "kind": "detail",
      "text": "When your country requires it, read the current privacy text with its version code and publication date, then tick the box to accept it. The box always starts unchecked.",
      "intents": []
    },
    "saveAccessActions": {
      "kind": "actions",
      "text": "Save your access. The page then shows what was saved, what is still pending and whether you can go on to your modules.",
      "intents": [
        {
          "id": "saveMyAccess",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "accessStatusSummary": [
      {
        "role": "identity and access status",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "pending items notice",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "missingDataForm": [
      {
        "role": "missing name",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "country picker",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "privacyConsentDetail": [
      {
        "role": "privacy text reading",
        "preferred": "groupexpandcontent--ml-readmore-expand",
        "alternative": "groupexpandcontent--ml-single-expand-content"
      },
      {
        "role": "explicit acceptance",
        "preferred": "groupenterboolean--ml-checkbox-preference"
      }
    ],
    "saveAccessActions": [
      {
        "role": "save access",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
