/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/company_setup.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/entityRecordManagement/page21.md",
    "experience": "focusedRecordForm"
  },
  "intent": "Help the company owner see whether the company is prepared, fill in only the company data that is still missing, save it, and then follow the guidance to create the first module in Studio.",
  "sections": [
    {
      "id": "readinessSection",
      "priority": "primary",
      "purpose": "Show at a glance whether the company is prepared and which required data (name, legal name, country, document, address or contact) is still missing.",
      "organisms": [
        "companyReadiness"
      ]
    },
    {
      "id": "companyDataSection",
      "priority": "main",
      "purpose": "Let the owner complete the missing company data, choose the company country from the active countries, and save.",
      "organisms": [
        "companyDataForm",
        "saveCompanyActions"
      ]
    },
    {
      "id": "guidanceSection",
      "priority": "secondary",
      "purpose": "Once the company is prepared, show the fixed guidance with the link to create the first module in Studio.",
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
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "studioLink",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
