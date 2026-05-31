export interface ChecklistStep {
  id: string;
  title: string;
  notes?: string;
  completed?: boolean;
  children: ChecklistStep[];
  order: number;
}

export interface Checklist {
  id: string;
  title: string;
  description?: string;
  steps: ChecklistStep[];
  createdAt: number;
  updatedAt: number;
  userId: string;
}

export interface ChecklistExport {
  version: 1;
  title: string;
  description?: string;
  steps: ChecklistStep[];
  exportedAt: string;
}
