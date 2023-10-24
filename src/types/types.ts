export interface Todos {
  id: number;
  title: string;
  description: string;
  status: CaseType;
  dateCreated: string;
  //priority: PriorityType
  dateOfDone: string;
}

export type CaseType = 'queue' | 'development' | 'completed';
export type PriorityType = 'low' | 'medium' | 'high';
