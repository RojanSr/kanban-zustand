import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  // threshold means how many task it takes to reach another level
  progress: {
    level: 1,
    incr: 10,
    prevThreshold: 0, // lower bound for percentage
    threshold: 10, // upper bound for percentage
    range: 10,
    percentage: 0,
    taskCompletedInRange: 0,
  },
  setLevel: () =>
    set((prev) => ({
      progress: { ...prev.progress, level: prev.progress.level + 1 },
    })),

  incrementThreshold: () =>
    set((prev) => ({
      progress: {
        ...prev.progress,
        prevThreshold: prev.progress.threshold,
        threshold: prev.progress.threshold + prev.progress.incr,
      },
    })),

  incrementIncr: () =>
    set((prev) => ({
      progress: { ...prev.progress, incr: prev.progress.incr + 10 },
    })),
  incrementPercentage: (per) =>
    set((prev) => ({
      progress: { ...prev.progress, percentage: per },
    })),
  setTasksCompletedInRange: (n) =>
    set((prev) => ({
      progress: {
        ...prev.progress,
        taskCompletedInRange: n,
      },
    })),
  setRange: (n) =>
    set((prev) => ({
      progress: {
        ...prev.progress,
        range: n,
      },
    })),
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
