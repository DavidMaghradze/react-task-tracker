export interface SelectOption {
  value: string
  label: string
}

export enum TaskStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete'
}

export interface TaskFilters {
  status: {
    value: TaskStatus | null
    label: string
  }
}