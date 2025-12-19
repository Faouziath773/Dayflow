import type { ScheduledTask } from './task';

/**
 * Représente une journée planifiée
 */
export interface DayPlan {
  date: string; // format YYYY-MM-DD
  tasks: ScheduledTask[];
  totalDuration: number; // en minutes
  startTime: string; // heure de début de la journée
  endTime: string; // heure de fin de la journée
}

/**
 * Feedback sur une journée
 */
export interface DayFeedback {
  date: string;
  rating: number; // 1-5
  notes?: string;
  completedTasks: string[]; // IDs des tâches complétées
}

/**
 * Statistiques d'une journée
 */
export interface DayStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number; // 0-100
  totalDuration: number;
  averageEnergyLevel: 'low' | 'medium' | 'high';
}

