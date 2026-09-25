// Shared model. Column ids and field names match the artifact prototype exactly.
export const COLS = [
  { id: 'build', name: 'Build First', note: 'Start now' },
  { id: 'in', name: 'In', note: '' },
  { id: 'debate', name: 'Still to Debate', note: 'Contact tools not yet tested' },
  { id: 'care', name: 'Use With Care', note: '' },
  { id: 'out', name: 'Out', note: '' },
  { id: 'parking', name: 'Parking Lot', note: 'New cards land here' },
] as const;
export type ColId = (typeof COLS)[number]['id'];
export const COL_NAME: Record<string, string> = Object.fromEntries(COLS.map(c => [c.id, c.name]));

export const TRACKS = { community: 'Community contact', cover: 'Commissioner cover' } as const;
export type Track = keyof typeof TRACKS;

export type VoteValue = 'keep' | 'kill' | 'unsure';
export const VOTE_LABEL: Record<VoteValue, string> = { keep: 'Keep', kill: 'Kill', unsure: 'Unsure' };

export type Board = { id: string; title: string; subtitle: string | null; framing: string | null };
export type Card = {
  id: string; board_id: string; n: number | null; title: string; col: ColId; ord: number;
  description: string; verdict: string; breaks: string; owner: string;
  effort: 'S' | 'M' | 'L' | null; track: Track | null; survey_tactic: string | null;
  created_by: string | null; created_at: string;
};
export type Vote = { id: string; card_id: string; user_id: string; vote: VoteValue; ts: string };
export type Comment = { id: string; card_id: string; user_id: string; text: string; ts: string };
export type Profile = { id: string; display_name: string };

export type SurveyTactic = {
  tactic: string; exec_avg: number; exec_hi: number; exec_lo: number; exec_n: number;
  impact_avg: number; impact_hi: number; impact_lo: number; impact_n: number;
};
export type Survey = {
  id: string; title: string; respondents: number | null; note: string | null;
  tactics: SurveyTactic[]; responses: { replicate: string | null; never: string | null; decision: string | null }[];
  takeaways: string[];
};

export function ordBetween(cards: Card[], col: string, beforeId: string | null, movingId: string | null) {
  const list = cards.filter(c => c.col === col && c.id !== movingId).sort((a, b) => a.ord - b.ord);
  if (!list.length) return 1000;
  if (!beforeId) return list[list.length - 1].ord + 1000;
  const idx = list.findIndex(c => c.id === beforeId);
  if (idx <= 0) return list[0].ord - 1000;
  return (list[idx - 1].ord + list[idx].ord) / 2;
}

export const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1);
