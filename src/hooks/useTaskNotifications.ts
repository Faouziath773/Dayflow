import { useEffect, useRef } from 'react';
import type { Task } from '../types/task';

interface UseTaskNotificationsOptions {
  enabled?: boolean;
}

interface TimeoutRef {
  [taskId: string]: number;
}

export function useTaskNotifications(
  tasks: Task[],
  { enabled = true }: UseTaskNotificationsOptions = {}
) {
  const timeoutsRef = useRef<TimeoutRef>({});

  useEffect(() => {
    if (!enabled) {
      // Nettoyage si désactivé
      Object.values(timeoutsRef.current).forEach((id) => {
        window.clearTimeout(id);
      });
      timeoutsRef.current = {};
      return;
    }

    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) {
      // Navigateur sans support de notifications
      return;
    }

    // Demander la permission si nécessaire (une seule fois)
    if (Notification.permission === 'default') {
      void Notification.requestPermission();
    }

    // Nettoyer les anciens timeouts
    Object.values(timeoutsRef.current).forEach((id) => {
      window.clearTimeout(id);
    });
    timeoutsRef.current = {};

    const now = new Date();

    tasks.forEach((task) => {
      if (!task.targetTime || task.completed) {
        return;
      }

      const [hoursStr, minutesStr] = task.targetTime.split(':');
      const hours = Number(hoursStr);
      const minutes = Number(minutesStr);
      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return;
      }

      const remindBefore = task.remindBeforeMinutes ?? 0;

      const target = new Date();
      target.setHours(hours, minutes, 0, 0);

      const remindAt = new Date(target.getTime() - remindBefore * 60 * 1000);

      const delay = remindAt.getTime() - now.getTime();

      if (delay <= 0) {
        // L'heure de rappel est déjà passée
        return;
      }

      const timeoutId = window.setTimeout(() => {
        if (!enabled) return;
        if (Notification.permission === 'granted') {
          new Notification('Dayflow – Rappel de tâche', {
            body:
              remindBefore > 0
                ? `Votre tâche "${task.name}" commence dans ${remindBefore} minutes.`
                : `C'est le moment de commencer la tâche "${task.name}".`,
          });
        }
      }, delay);

      timeoutsRef.current[task.id] = timeoutId;
    });

    return () => {
      Object.values(timeoutsRef.current).forEach((id) => {
        window.clearTimeout(id);
      });
      timeoutsRef.current = {};
    };
  }, [tasks, enabled]);
}


