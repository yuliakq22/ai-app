import { Briefcase, Hand, HeartHandshake, ReceiptText, Scale, ShieldAlert, Users } from "lucide-react";

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  context: string;
  role: string;
  difficulty: "Gentle" | "Moderate" | "Challenging";
  personality: string;
  goals: string[];
  iconName: "Briefcase" | "Hand" | "HeartHandshake" | "ReceiptText" | "Scale" | "ShieldAlert" | "Users";
};

export const scenarioIcons = {
  Briefcase,
  Hand,
  HeartHandshake,
  ReceiptText,
  Scale,
  ShieldAlert,
  Users
};

export const assertivenessScenarios: Scenario[] = [
  {
    id: "extra-work",
    title: "Saying no to extra work",
    summary: "Practice declining a last-minute request without overexplaining.",
    context:
      "A manager asks you to take on another urgent task even though your plate is already full.",
    role: "Your manager, Priya",
    difficulty: "Moderate",
    personality: "Warm but pressured, likely to push once for a yes.",
    goals: ["Name capacity clearly", "Offer a practical alternative", "Avoid apologizing excessively"],
    iconName: "Briefcase"
  },
  {
    id: "friend-boundaries",
    title: "Setting boundaries with friends",
    summary: "Hold a kind boundary when a friend expects instant availability.",
    context:
      "A close friend keeps sending late-night messages and becomes hurt when you do not respond.",
    role: "Your friend, Marco",
    difficulty: "Gentle",
    personality: "Sensitive, affectionate, and quick to interpret boundaries as rejection.",
    goals: ["Validate care", "State the boundary", "Keep the tone warm and firm"],
    iconName: "Users"
  },
  {
    id: "passive-aggressive-coworker",
    title: "Passive-aggressive coworker",
    summary: "Respond to indirect criticism without getting pulled into defensiveness.",
    context:
      "A coworker makes pointed comments in a meeting about you not being responsive enough.",
    role: "Your coworker, Dana",
    difficulty: "Challenging",
    personality: "Dry, indirect, and image-conscious in front of others.",
    goals: ["Name the pattern neutrally", "Ask for specifics", "Redirect to a useful next step"],
    iconName: "ShieldAlert"
  },
  {
    id: "relationship-respect",
    title: "Asking for respect in a relationship",
    summary: "Ask for a change in tone during disagreement.",
    context:
      "Your partner interrupts and uses sarcasm when conversations become tense.",
    role: "Your partner, Avery",
    difficulty: "Challenging",
    personality: "Defensive at first, but able to soften when approached clearly.",
    goals: ["Describe the behavior", "Share impact without blame", "Request a specific change"],
    iconName: "HeartHandshake"
  },
  {
    id: "restaurant-return",
    title: "Returning incorrect food",
    summary: "Make a simple request without shrinking or snapping.",
    context:
      "Your food arrives with an ingredient you clearly asked to remove.",
    role: "A busy server, Lena",
    difficulty: "Gentle",
    personality: "Rushed but reasonable once the issue is clear.",
    goals: ["Be concise", "Stay respectful", "Ask directly for correction"],
    iconName: "ReceiptText"
  },
  {
    id: "salary-negotiation",
    title: "Negotiating salary",
    summary: "Make a confident compensation request grounded in value.",
    context:
      "You received an offer that is exciting, but the salary is below your target range.",
    role: "A recruiter, Sam",
    difficulty: "Moderate",
    personality: "Professional, budget-aware, and open to a well-framed case.",
    goals: ["Anchor clearly", "Reference value", "Invite collaboration"],
    iconName: "Scale"
  },
  {
    id: "manipulative-communication",
    title: "Manipulative communication",
    summary: "Stay steady when someone uses guilt to change your decision.",
    context:
      "A family member implies you are selfish for not agreeing to their request.",
    role: "Your relative, Nina",
    difficulty: "Challenging",
    personality: "Emotionally intense, guilt-inducing, and resistant to the first boundary.",
    goals: ["Do not debate the guilt frame", "Repeat the boundary", "Use calm, grounded language"],
    iconName: "Hand"
  }
];

export function getScenario(id: string) {
  return assertivenessScenarios.find((scenario) => scenario.id === id);
}
