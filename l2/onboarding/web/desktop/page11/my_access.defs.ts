/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/my_access.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "Help the signed-in person finish their own access in one place. They see their read-only login e-mail and what is still missing, fill in only the missing name and country, read and accept the current privacy text when their country requires it, and save to reach the modules they may use.",
  "sections": [
    {
      "id": "accessStatusSection",
      "priority": "primary",
      "purpose": "Show at the top whether access is complete and which minimum data are still missing, so the person knows straight away what to do.",
      "organisms": [
        "accessStatusSummary"
      ]
    },
    {
      "id": "completeDataSection",
      "priority": "main",
      "purpose": "Ask only for the missing data and, when the chosen country requires it, show the current privacy text with an acceptance box that starts unchecked. Both sit side by side in the main reading area.",
      "organisms": [
        "missingDataForm",
        "privacyConsentDetail"
      ]
    },
    {
      "id": "saveSection",
      "priority": "secondary",
      "purpose": "Close the flow with one clear save action that leads to the modules the person may use.",
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
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "pending items notice",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "missingDataForm": [
      {
        "role": "missing name",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "country picker",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
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
