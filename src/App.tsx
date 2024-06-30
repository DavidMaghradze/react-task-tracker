import TasksProvider from 'providers/TasksProvider';
import TasksList from 'components/tasks/TasksList';
import './index.css';

function App() {
  return (
    <div>
      <header id="header">
        <h1>Task Tracker</h1>
      </header>
      <main id="main">
        <TasksProvider>
          <TasksList />
        </TasksProvider>
      </main>
    </div>
  );
}

export default App;
