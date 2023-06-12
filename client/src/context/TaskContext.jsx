import { createContext, useContext, useState } from "react";
import {createTaskRequest, deleteTasksRequest, getTasksRequest, getTaskRequest, updateTasksRequest} from '../api/tasks'

const Taskcontext = createContext();

export const useTasks = () => {
  const context = useContext(Taskcontext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest()
    try {
    setTasks(res.data)
    } catch (error) {
        console.log(error);
    }
  }

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res);
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id)
            if(res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
await updateTasksRequest(id, task)
        } catch (error) {
            console.log(error);
        }
    }


  return <Taskcontext.Provider value={{
    tasks,
    createTask,
    deleteTask,
    getTasks,
    getTask,
    updateTask
  }}>{children}</Taskcontext.Provider>;
}
