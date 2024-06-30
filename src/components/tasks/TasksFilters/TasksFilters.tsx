import Select from 'react-select'
import styles from './TasksFilters.module.css'
import Button from 'components/ui/Button'
import { ButtonVariant } from 'components/ui/Button/Button.types'
import useTasksFilters from './useTasksFilters'
import { TASK_STATUS_OPTIONS } from './TasksFilters.consts'


const TasksFilters = () => {
  const { filters, setFilters, handleSubmit } = useTasksFilters()

  return (
    <div className={`flex ${styles.tasksFilters}`}>
      <div className="flex">
        <span>Filters:</span>
        <div>
          <div className={styles.status}>
            <Select
              value={filters.status}
              //@ts-ignore
              onChange={(val) => setFilters({ status: val })}
              //@ts-ignore
              options={TASK_STATUS_OPTIONS}
              styles={{
              control: (styles) => ({
                ...styles,
                cursor: 'pointer'
              }),
              input: (styles) => ({
                ...styles,
                singleValue: 'var(--text-sm)'
              }),
              option: (styles) => ({
                ...styles,
                cursor: 'pointer',
                fontSize: 'var(--text-sm)'
              }),
              placeholder: (styles) => ({
                ...styles,
                fontSize: 'var(--text-base)'
              })
              }}
              placeholder="Select status" 
            />
          </div>
        </div>
      </div>
      <Button 
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      >
        Apply Filters
      </Button>
    </div>
  )
}

export default TasksFilters