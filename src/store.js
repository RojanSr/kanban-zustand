import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, status, progress, id) =>
    set(
      produce((prev) => {
        prev.tasks.push({ title, status, progress, id });
      }),
      // (prevState) => ({ tasks: [...prevState.tasks, { title, status }] }),
      false,
      "addTask"
    ),
  deleteTask: (id) =>
    set((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    })),
  setDraggedTask: (title, id) => set({ draggedTask: { title, id } }),
  moveTask: (title, status, progress, id) =>
    set((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { title, status, progress, id } : task
      ),
    })),
  completedTasks: [],
  setCompletedTasks: (title, id) =>
    set(
      produce((prev) => {
        prev.completedTasks.push({ title, id });
      }),
      false,
      "completedTask"
    ),
  removeCompletedTask: (id) =>
    set((prevState) => ({
      completedTasks: prevState.completedTasks.filter((task) => task.id !== id),
    })),
});

export const useStore = create(persist(devtools(store), { name: "store" }));
