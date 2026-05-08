import Sidebar from '../components/Sidebar';

const TasksPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 p-6">Tasks Page</div>
    </div>
  );
};

export default TasksPage;
