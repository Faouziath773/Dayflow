import type { Task, ScheduledTask, EnergyLevel } from '../types/task';
import { getEnergyCompatibilityScore } from './energyRules';
import {
  timeToMinutes,
  minutesToTime,
  addMinutes,
  timeRangesOverlap,
} from './timeBlocks';

/**
 * Configuration du planificateur
 */
interface SchedulerConfig {
  startHour?: number; // heure de début (défaut: 8)
  endHour?: number; // heure de fin (défaut: 20)
  breakDuration?: number; // durée des pauses entre tâches en minutes (défaut: 15)
}

/**
 * Planifie les tâches de manière optimale selon leur niveau d'énergie
 */
export function scheduleTasks(
  tasks: Task[],
  config: SchedulerConfig = {}
): ScheduledTask[] {
  const {
    startHour = 8,
    endHour = 20,
    breakDuration = 15,
  } = config;

  // Trier les tâches par priorité : haute énergie d'abord, puis durée
  const sortedTasks = [...tasks].sort((a, b) => {
    const energyPriority: Record<EnergyLevel, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };
    
    const priorityDiff = energyPriority[b.energyLevel] - energyPriority[a.energyLevel];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Si même priorité, les plus longues d'abord
    return b.duration - a.duration;
  });

  const scheduled: ScheduledTask[] = [];
  let currentTime = minutesToTime(startHour * 60);
  const endTimeMinutes = endHour * 60;

  for (const task of sortedTasks) {
    // Trouver le meilleur créneau pour cette tâche
    const bestSlot = findBestTimeSlot(
      task,
      currentTime,
      endTimeMinutes,
      scheduled
    );

    if (!bestSlot) {
      // Si on ne peut pas placer la tâche, on essaie de la placer quand même
      // à la fin de la journée si possible
      const taskEndTime = addMinutes(currentTime, task.duration);
      const taskEndMinutes = timeToMinutes(taskEndTime);
      
      if (taskEndMinutes <= endTimeMinutes) {
        const scheduledTask: ScheduledTask = {
          ...task,
          scheduledStartTime: currentTime,
          scheduledEndTime: taskEndTime,
          timeBlock: `${currentTime}-${taskEndTime}`,
        };
        scheduled.push(scheduledTask);
        currentTime = addMinutes(taskEndTime, breakDuration);
      }
      continue;
    }

    const scheduledTask: ScheduledTask = {
      ...task,
      scheduledStartTime: bestSlot.startTime,
      scheduledEndTime: bestSlot.endTime,
      timeBlock: `${bestSlot.startTime}-${bestSlot.endTime}`,
    };

    scheduled.push(scheduledTask);
    
    // Mettre à jour l'heure courante
    const nextStart = addMinutes(bestSlot.endTime, breakDuration);
    if (timeToMinutes(nextStart) > timeToMinutes(currentTime)) {
      currentTime = nextStart;
    }
  }

  // Trier par heure de début
  return scheduled.sort(
    (a, b) => timeToMinutes(a.scheduledStartTime!) - timeToMinutes(b.scheduledStartTime!)
  );
}

/**
 * Trouve le meilleur créneau pour une tâche
 */
function findBestTimeSlot(
  task: Task,
  minStartTime: string,
  maxEndMinutes: number,
  existingTasks: ScheduledTask[]
): { startTime: string; endTime: string; score: number } | null {
  const taskDuration = task.duration;
  const minStartMinutes = timeToMinutes(minStartTime);
  const maxStartMinutes = maxEndMinutes - taskDuration;

  if (minStartMinutes >= maxStartMinutes) {
    return null;
  }

  let bestSlot: { startTime: string; endTime: string; score: number } | null = null;
  let bestScore = -1;

  // Essayer chaque créneau possible (par pas de 30 minutes)
  for (let minutes = minStartMinutes; minutes <= maxStartMinutes; minutes += 30) {
    const startTime = minutesToTime(minutes);
    const endTime = addMinutes(startTime, taskDuration);
    const hour = Math.floor(minutes / 60);

    // Vérifier les chevauchements
    const hasOverlap = existingTasks.some(
      (existing) =>
        existing.scheduledStartTime &&
        existing.scheduledEndTime &&
        timeRangesOverlap(
          startTime,
          endTime,
          existing.scheduledStartTime,
          existing.scheduledEndTime
        )
    );

    if (hasOverlap) continue;

    // Calculer le score de compatibilité
    const energyScore = getEnergyCompatibilityScore(task.energyLevel, hour);
    
    // Bonus si c'est tôt dans la journée (pour les tâches difficiles)
    const earlyBonus = task.energyLevel === 'high' && hour < 12 ? 2 : 0;
    
    const totalScore = energyScore + earlyBonus;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestSlot = { startTime, endTime, score: totalScore };
    }
  }

  return bestSlot;
}

/**
 * Génère un ID unique pour une tâche
 */
export function generateTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

