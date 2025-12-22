import { useState, useCallback, useEffect } from 'react';
import type { Task, ScheduledTask } from '../types/task';
import { scheduleTasks, generateTaskId } from '../utils/scheduler';
import { useLocalStorage } from './useLocalStorage';
import { useScheduleSettings } from './useScheduleSettings';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

/**
 * Hook pour gérer la planification des tâches
 */
export function useScheduler() {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const [localTasks, setLocalTasks] = useLocalStorage<Task[]>(
    'dayflow-tasks',
    []
  );
  const [tasks, setTasks] = useState<Task[]>(
    localTasks.filter((t) => (t.dayDate ?? today) === today)
  );
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const { settings } = useScheduleSettings();

  // Charger les tâches depuis Supabase pour l'utilisateur connecté
  useEffect(() => {
    if (!user) {
      // Utilisateur non connecté : on reste sur le localStorage
      setTasks(localTasks.filter((t) => (t.dayDate ?? today) === today));
      return;
    }

    const fetchTasks = async () => {
      setLoadingTasks(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Erreur lors du chargement des tâches Supabase:', error);
        setLoadingTasks(false);
        return;
      }

      const mapped: Task[] =
        data?.map((row: any) => ({
          id: row.id,
          name: row.name,
          duration: row.duration,
          energyLevel: row.energy_level,
          completed: row.completed,
          dayDate: row.day_date ?? today,
          targetTime: row.planned_time ?? undefined,
          remindBeforeMinutes: row.remind_before_minutes ?? undefined,
        })) ?? [];

      setTasks(mapped.filter((t) => (t.dayDate ?? today) === today));
      setLoadingTasks(false);
    };

    void fetchTasks();
  }, [user, localTasks]);

  /**
   * Ajoute une nouvelle tâche
   */
  const addTask = useCallback(
    (task: Omit<Task, 'id'>) => {
      const newTask: Task = {
        ...task,
        id: generateTaskId(),
        completed: false,
        dayDate: task.dayDate ?? today,
      };
      // Mettre à jour l'état local
      setTasks((prev) => [...prev, newTask]);

      if (!user) {
        // Mode hors-ligne : on persiste seulement dans le localStorage
        setLocalTasks([...localTasks, newTask]);
      } else {
        // Mode connecté : on enregistre dans Supabase (hors du setState pour éviter le double appel en StrictMode)
        void (async () => {
          const { error } = await supabase.from('tasks').insert({
            id: newTask.id,
            user_id: user.id,
            name: newTask.name,
            duration: newTask.duration,
            energy_level: newTask.energyLevel,
            completed: newTask.completed,
            day_date: newTask.dayDate ?? today,
            planned_time: newTask.targetTime ?? null,
            remind_before_minutes: newTask.remindBeforeMinutes ?? null,
          });
          if (error) {
            console.error(
              'Supabase insert task error:',
              error.message,
              error.details,
              error.hint
            );
          }
        })();
      }
      setIsScheduled(false);
    },
    [localTasks, setLocalTasks, user, today]
  );

  /**
   * Supprime une tâche
   */
  const removeTask = useCallback(
    (taskId: string) => {
      setTasks((prev) => {
        const next = prev.filter((t) => t.id !== taskId);

        if (!user) {
          setLocalTasks(next);
        } else {
          void (async () => {
            const { error } = await supabase
              .from('tasks')
              .delete()
              .eq('user_id', user.id)
              .eq('id', taskId);
            if (error) {
              console.error('Supabase delete task error:', error);
            }
          })();
        }

        return next;
      });
      setIsScheduled(false);
    },
    [setLocalTasks, user]
  );

  /**
   * Met à jour une tâche
   */
  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) => {
        const next = prev.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        );

        if (!user) {
          setLocalTasks(
            localTasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
          );
        } else {
          const dbUpdates: Record<string, unknown> = {};
          if (updates.name !== undefined) dbUpdates.name = updates.name;
          if (updates.duration !== undefined) dbUpdates.duration = updates.duration;
          if (updates.energyLevel !== undefined)
            dbUpdates.energy_level = updates.energyLevel;
          if (typeof updates.completed === 'boolean')
            dbUpdates.completed = updates.completed;
          if (updates.targetTime !== undefined)
            dbUpdates.planned_time = updates.targetTime;
          if (updates.remindBeforeMinutes !== undefined)
            dbUpdates.remind_before_minutes = updates.remindBeforeMinutes;
          if (updates.dayDate !== undefined) dbUpdates.day_date = updates.dayDate;

          if (Object.keys(dbUpdates).length > 0) {
            void (async () => {
              const { error } = await supabase
                .from('tasks')
                .update(dbUpdates)
                .eq('user_id', user?.id ?? '')
                .eq('id', taskId);
              if (error) {
                console.error('Supabase update task error:', error);
              }
            })();
          }
        }

        return next;
      });
      setIsScheduled(false);
    },
    [localTasks, setLocalTasks, user]
  );

  /**
   * Marque une tâche comme complétée
   */
  const toggleTaskCompletion = useCallback(
    (taskId: string) => {
      setTasks((prev) => {
        let newCompleted = false;
        const next = prev.map((t) => {
          if (t.id === taskId) {
            const updated = { ...t, completed: !t.completed };
            newCompleted = updated.completed ?? false;
            return updated;
          }
          return t;
        });

        if (!user) {
          setLocalTasks(next);
        } else {
          void (async () => {
            const { error } = await supabase
              .from('tasks')
              .update({ completed: newCompleted })
              .eq('user_id', user.id)
              .eq('id', taskId);
            if (error) {
              console.error('Supabase toggle complete error:', error);
            }
          })();
        }

        return next;
      });
      // Synchroniser avec les tâches planifiées
      setScheduledTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    },
    [setLocalTasks, user]
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
      startMinute: settings.startMinute ?? 0,
      endMinute: settings.endMinute ?? 0,
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

    if (!user) {
      setLocalTasks([]);
    } else {
      void (async () => {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('user_id', user.id);
        if (error) {
          console.error('Supabase clear all tasks error:', error);
        }
      })();
    }
  }, [setLocalTasks, user]);

  /**
   * Reporte les tâches non terminées vers le lendemain
   */
  const carryIncompleteTasksToTomorrow = useCallback(
    (taskIds: string[]) => {
      if (taskIds.length === 0) return;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0];

      setTasks((prev) =>
        prev
          .map((t) =>
            taskIds.includes(t.id) ? { ...t, dayDate: tomorrowDate } : t
          )
          .filter((t) => (t.dayDate ?? today) === today)
      );

      if (!user) {
        setLocalTasks((prev) =>
          prev.map((t) =>
            taskIds.includes(t.id) ? { ...t, dayDate: tomorrowDate } : t
          )
        );
      } else {
        void (async () => {
          const { error } = await supabase
            .from('tasks')
            .update({ day_date: tomorrowDate })
            .in('id', taskIds)
            .eq('user_id', user.id);
          if (error) {
            console.error('Supabase carry tasks error:', error);
          }
        })();
      }
    },
    [setLocalTasks, today, user]
  );

  return {
    tasks,
    scheduledTasks,
    isScheduled,
    loadingTasks,
    addTask,
    removeTask,
    updateTask,
    toggleTaskCompletion,
    generateSchedule,
    resetSchedule,
    clearAllTasks,
    carryIncompleteTasksToTomorrow,
  };
}

