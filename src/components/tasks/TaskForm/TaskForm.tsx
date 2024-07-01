import Input from 'components/ui/Input'
import Label from 'components/ui/Label'
import styles from './TaskForm.module.css'
import TextArea from 'components/ui/TextArea'
import Button from 'components/ui/Button'
import { ButtonVariant } from 'components/ui/Button/Button.types'
import { useState } from 'react'
import { useTasks } from 'providers/TasksProvider'
import { Modal } from 'providers/TasksProvider.types'

interface TaskFormProps {
  initialValues?: { title: string; description: string }
}

const TaskForm = ({ initialValues }: TaskFormProps) => {
  const isEditMode = initialValues !== undefined

  const { handleAddTaskClick, handleEditTaskClick, closeModal, currentTaskId } =
    useTasks()

  const [values, setValues] = useState(
    initialValues || { title: '', description: '' },
  )

  const handleValueChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault()
    closeModal(isEditMode ? Modal.EDIT_TASK : Modal.ADD_TASK)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    isEditMode
      ? handleEditTaskClick(values, currentTaskId)
      : handleAddTaskClick(values)
    closeModal(isEditMode ? Modal.EDIT_TASK : Modal.ADD_TASK)
  }

  return (
    <form className={styles.taskForm}>
      <div>
        <Label text="Title" />
        <Input
          name="title"
          placeholder="Type title..."
          defaultValue={values.title}
          onChange={handleValueChange}
        />
      </div>
      <div>
        <Label text="Description" />
        <TextArea
          name="description"
          placeholder="Type desciption..."
          defaultValue={values.description}
          onChange={handleValueChange}
        />
      </div>
      <footer className={styles.footer}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant={ButtonVariant.PRIMARY} onClick={handleSubmit}>
          {isEditMode ? 'Save' : 'Create'}
        </Button>
      </footer>
    </form>
  )
}

export default TaskForm
