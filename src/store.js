import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, status) =>
    set(
      produce((prev) => {
        prev.tasks.push({ title, status });
      }),
      // (prevState) => ({ tasks: [...prevState.tasks, { title, status }] }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, status) =>
    set((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.title === title ? { title, status } : task
      ),
    })),
});

export const useStore = create(persist(devtools(store), { name: "store" }));
