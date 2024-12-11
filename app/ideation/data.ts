import { Storyboard, JourneyStage, MindMapBranch } from './types';

interface Technique {
  title: string;
  storyboards?: Storyboard[];
  journeyStages?: JourneyStage[];
  branches?: MindMapBranch[];
}

interface Techniques {
  [key: string]: Technique;
}

export const techniques: Techniques = {
  brainstorm: {
    title: "Brainstorming"
  },
  storyboard: {
    title: "Storyboards",
    storyboards: [
      {
        title: "First-Time Data Import",
        description: "A patient importing their medical history for the first time",
        scenario: "Sarah receives her medical records and uses the platform to digitize and organize them automatically"
      },
      {
        title: "Emergency Room Visit",
        description: "Quick access to medical history in emergency",
        scenario: "John shares his complete medical history with ER doctors through secure quick access"
      },
      {
        title: "Regular Health Monitoring",
        description: "Daily health data integration",
        scenario: "Maria's wearable device data automatically syncs with her medical records"
      }
    ]
  },
  journey: {
    title: "Customer Journey",
    journeyStages: [
      {
        stage: "Discovery",
        actions: ["Research health data platforms", "Read reviews", "Compare features"],
        emotions: "Hopeful but cautious",
        painPoints: ["Overwhelmed by options", "Concerned about privacy"],
        opportunities: ["Clear security explanations", "Free trial option"]
      },
      {
        stage: "Onboarding",
        actions: ["Upload documents", "Connect devices", "Set up profile"],
        emotions: "Excited but anxious",
        painPoints: ["Time-consuming setup", "Technical challenges"],
        opportunities: ["Guided setup wizard", "24/7 support"]
      },
      {
        stage: "Daily Usage",
        actions: ["Search records", "Monitor health metrics", "Share with providers"],
        emotions: "Confident and relieved",
        painPoints: ["Learning new features", "Integration issues"],
        opportunities: ["Tutorial videos", "AI assistance"]
      }
    ]
  },
  mindmap: {
    title: "Mind Map",
    branches: [
      {
        title: "Security",
        items: ["Encryption", "Access Control", "Audit Logs", "HIPAA Compliance"]
      },
      {
        title: "Data Processing",
        items: ["OCR", "NLP", "Machine Learning", "Real-time Analytics"]
      },
      {
        title: "User Interface",
        items: ["Voice Search", "Visual Timeline", "Mobile App", "Web Portal"]
      },
      {
        title: "Integration",
        items: ["EHR Systems", "IoT Devices", "Lab Systems", "Pharmacy Data"]
      }
    ]
  }
}; 