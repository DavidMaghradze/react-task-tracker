import { SelectOption, TaskStatus } from "./TasksFilters.types";

export const TASK_STATUS_OPTIONS: SelectOption[] = Object.values(TaskStatus).map((status) => ({
  value: status,
  label: `${status[0].toUpperCase()}${status.slice(1)}`
}))