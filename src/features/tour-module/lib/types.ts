export type BookingSource = "ad" | "referral" | "organic" | "whatsapp" | "call" | "walk-in";
export type DecisionMaker = "self" | "parent" | "group";
export type WillBookToday = "yes" | "maybe" | "no";
export type TourType = "physical" | "virtual" | "pre-book-pitch";

export type TourQualification = {
  moveInDate: string;
  decisionMaker: DecisionMaker;
  roomType: string;
  occupation: string;
  workLocation: string;
  willBookToday: WillBookToday;
  readyIn48h: boolean;
  exploring: boolean;
  comparing: boolean;
  needsFamily: boolean;
  keyConcern: string;
};

export type TourIntent = "hard" | "warm" | "soft";
