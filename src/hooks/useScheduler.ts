import { useState, useCallback } from 'react';
import type { Task, ScheduledTask } from '../types/task';
import { scheduleTasks, generateTaskId } from '../utils/scheduler';
import { useLocalStorage } from './useLocalStorage';
import { useScheduleSettings } from './useScheduleSettings';

/**
 * Hook pour gérer la planification des tâches
 */
export function useScheduler() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('dayflow-tasks', []);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const { settings } = useScheduleSettings();

  /**
   * Ajoute une nouvelle tâche
   */
  const addTask = useCallback(
    (task: Omit<Task, 'id'>) => {
      const newTask: Task = {
        ...task,
        id: generateTaskId(),
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setIsScheduled(false);
    },
    [setTasks]
  );

  /**
   * Supprime une tâche
   */
  const removeTask = useCallback(
    (taskId: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setIsScheduled(false);
    },
    [setTasks]
  );

  /**
   * Met à jour une tâche
   */
  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
      );
      setIsScheduled(false);
    },
    [setTasks]
  );

  /**
   * Marque une tâche comme complétée
   */
  const toggleTaskCompletion = useCallback(
    (taskId: string) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
      // Synchroniser avec les tâches planifiées
      setScheduledTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    },
    [setTasks]
  );

  /**
   * Génère le planning de la journée
   */
  const generateSchedule = useCallback(() => {
    if (tasks.length === 0) {
      setScheduledTasks([]);
      setIsScheduled(false);
      return;
    }

    const scheduled = scheduleTasks(tasks, {
      startHour: settings.startHour,
      endHour: settings.endHour,
      breakDuration: settings.breakDuration,
    });

    setScheduledTasks(scheduled);
    setIsScheduled(true);
  }, [tasks, settings]);

  /**
   * Réinitialise le planning
   */
  const resetSchedule = useCallback(() => {
    setScheduledTasks([]);
    setIsScheduled(false);
  }, []);

  /**
   * Réinitialise toutes les tâches
   */
  const clearAllTasks = useCallback(() => {
    setTasks([]);
    setScheduledTasks([]);
    setIsScheduled(false);
  }, [setTasks]);

  return {
    tasks,
    scheduledTasks,
    isScheduled,
    addTask,
    removeTask,
    updateTask,
    toggleTaskCompletion,
    generateSchedule,
    resetSchedule,
    clearAllTasks,
  };
}

