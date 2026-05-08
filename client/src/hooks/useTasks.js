import { useState, useEffect } from 'react';
import api from '../api/axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return { tasks, loading, setTasks };
};

export default useTasks;
