type Zone = {
  id: string;
  name: string;
  area: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: "flow-ops" | "tcm";
  zoneId: string;
  phone: string;
};

export const zones: Zone[] = [
  { id: "z1", name: "Koramangala Zone", area: "Koramangala" },
  { id: "z2", name: "HSR Zone", area: "HSR Layout" },
  { id: "z3", name: "Indiranagar Zone", area: "Indiranagar" },
  { id: "z4", name: "Whitefield Zone", area: "Whitefield" },
  { id: "z5", name: "Electronic City Zone", area: "Electronic City" },
];

export const teamMembers: TeamMember[] = [
  { id: "fo-1", name: "Flow Ops 1", role: "flow-ops", zoneId: "z1", phone: "+91 9000000001" },
  { id: "fo-2", name: "Flow Ops 2", role: "flow-ops", zoneId: "z2", phone: "+91 9000000002" },
  { id: "fo-3", name: "Flow Ops 3", role: "flow-ops", zoneId: "z3", phone: "+91 9000000003" },
  { id: "tcm-1", name: "TCM Arjun", role: "tcm", zoneId: "z1", phone: "+91 9100000001" },
  { id: "tcm-2", name: "TCM Nisha", role: "tcm", zoneId: "z2", phone: "+91 9100000002" },
  { id: "tcm-3", name: "TCM Kavya", role: "tcm", zoneId: "z3", phone: "+91 9100000003" },
  { id: "tcm-4", name: "TCM Rohan", role: "tcm", zoneId: "z4", phone: "+91 9100000004" },
  { id: "tcm-5", name: "TCM Noor", role: "tcm", zoneId: "z5", phone: "+91 9100000005" },
];
