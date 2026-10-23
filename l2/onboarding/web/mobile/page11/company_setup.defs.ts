/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/company_setup.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "On a narrow screen (around 390px, still usable at 360px and 430px), help the company owner see whether the company is prepared, complete the missing company data in one fluid column, save it, and then follow the Studio guidance.",
  "sections": [
    {
      "id": "readinessSection",
      "priority": "primary",
      "purpose": "Open with a short status showing whether the company is prepared and which required data is still missing.",
      "organisms": [
        "companyReadiness"
      ]
    },
    {
      "id": "companyDataSection",
      "priority": "main",
      "purpose": "Stack the missing company fields in one fluid column, with the country picker and a save action that is easy to reach.",
      "organisms": [
        "companyDataForm",
        "saveCompanyActions"
      ]
    },
    {
      "id": "guidanceSection",
      "priority": "secondary",
      "purpose": "After the company is prepared, show the Studio guidance below the form.",
      "organisms": [
        "studioGuidance"
      ]
    }
  ],
  "organisms": {
    "companyReadiness": {
      "kind": "summary",
      "text": "See whether your company is prepared and which company data is still missing, so you know exactly what to complete.",
      "intents": []
    },
    "companyDataForm": {
      "kind": "form",
      "text": "Fill in the missing company name, legal name, document type and number, address and company country. You choose the country from the active countries, and an unknown country is never filled in with a default. The contact the company already has is shown so you are not asked for it again.",
      "intents": []
    },
    "saveCompanyActions": {
      "kind": "actions",
      "text": "Save the company data. Saving again does not duplicate the contact. The result is shown right away.",
      "intents": [
        {
          "id": "saveCompany",
          "kind": "submit"
        }
      ]
    },
    "studioGuidance": {
      "kind": "detail",
      "text": "Once the company is prepared, follow the guidance to create your first module in Studio.",
      "intents": []
    }
  },
  "molecules": {
    "companyReadiness": [
      {
        "role": "preparedStatus",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "missingDataProgress",
        "preferred": "groupshowprogress--ml-segmented-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      }
    ],
    "companyDataForm": [
      {
        "role": "companyTextFields",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "companyAddress",
        "preferred": "groupentertext--ml-address-field",
        "alternative": "groupentertext--ml-multiline-text"
      },
      {
        "role": "companyCountryPicker",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "documentTypeChoice",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-select-dropdown"
      }
    ],
    "saveCompanyActions": [
      {
        "role": "saveButton",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "saveResult",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "studioGuidance": [
      {
        "role": "guidanceCard",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "studioLink",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
