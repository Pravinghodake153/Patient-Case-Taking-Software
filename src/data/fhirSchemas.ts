export const SAMPLE_FHIR_BUNDLE = {
  resourceType: "Bundle",
  id: "medikiosk-opd-intake-bundle-2024-001",
  meta: {
    versionId: "1",
    lastUpdated: "2024-10-14T10:45:00.000+05:30",
    profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalArtifactBundle"]
  },
  identifier: {
    system: "https://medikiosk.ayush.gov.in/bundles",
    value: "OPD-AYU-102-BUNDLE"
  },
  type: "document",
  timestamp: "2024-10-14T10:45:00+05:30",
  entry: [
    {
      fullUrl: "urn:uuid:composition-01",
      resource: {
        resourceType: "Composition",
        id: "composition-01",
        status: "preliminary",
        type: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371530004",
              display: "Clinical consultation report"
            },
            {
              system: "https://ayush.gov.in/namaste",
              code: "AYU-OPD-CASE",
              display: "Ayurvedic Dashavidha Pariksha Intake"
            }
          ]
        },
        subject: {
          reference: "urn:uuid:patient-sunita-devi",
          display: "Sunita Devi (ABHA: 91-4412-8877-2341)"
        },
        encounter: {
          reference: "urn:uuid:encounter-opd-102",
          display: "OPD Intake via MediKiosk Kiosk #03"
        },
        date: "2024-10-14T10:45:00+05:30",
        author: [
          {
            reference: "urn:uuid:device-medikiosk-ai",
            display: "MediKiosk AI Intake Engine v2.4 (NAMASTE + SNOMED-CT mapped)"
          }
        ],
        title: "Pre-Consultation Case Sheet & AYUSH Assessment"
      }
    },
    {
      fullUrl: "urn:uuid:condition-amavata",
      resource: {
        resourceType: "Condition",
        id: "condition-amavata",
        clinicalStatus: {
          coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }]
        },
        verificationStatus: {
          coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "provisional" }]
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "https://ayush.gov.in/namaste-portal",
              code: "AYU-NID-AMAVATA-01",
              display: "Amavata (आमवात / Rheumatoid Arthritis equivalent)"
            },
            {
              system: "http://snomed.info/sct",
              code: "69896004",
              display: "Rheumatoid arthritis"
            }
          ],
          text: "Bilateral small joint polyarthralgia with morning stiffness > 1 hour"
        },
        subject: { reference: "urn:uuid:patient-sunita-devi" }
      }
    },
    {
      fullUrl: "urn:uuid:observation-prakriti",
      resource: {
        resourceType: "Observation",
        id: "observation-prakriti",
        status: "final",
        category: [
          {
            coding: [
              {
                system: "https://ayush.gov.in/codes",
                code: "ayush-prakriti-assessment",
                display: "Ayurvedic Constitution & Dosha Balance"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "https://ayush.gov.in/namaste",
              code: "PARIKSHA-PRAKRITI",
              display: "Deha Prakriti Assessment"
            }
          ],
          text: "Primary Prakriti: Vata-Kapha (Vata 50%, Pitta 15%, Kapha 35%)"
        },
        component: [
          {
            code: { text: "Jatharagni (Digestive Fire)" },
            valueString: "Manda Agni (Sluggish/Impaired)"
          },
          {
            code: { text: "Koshtha (Bowel Habit)" },
            valueString: "Krura Koshtha (Hard/Constipated)"
          },
          {
            code: { text: "Nidra (Sleep Quality)" },
            valueString: "Alpa Nidra (Disturbed/Restless)"
          }
        ],
        subject: { reference: "urn:uuid:patient-sunita-devi" }
      }
    }
  ]
};
