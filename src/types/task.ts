/**
 * Niveau d'énergie requis pour une tâche
 */
export type EnergyLevel = 'low' | 'medium' | 'high';

/**
 * Représente une tâche dans le planificateur
 */
export interface Task {
  id: string;
  name: string;
  duration: number; // en minutes
  energyLevel: EnergyLevel;
  completed?: boolean;
  scheduledStartTime?: string; // format HH:mm
  scheduledEndTime?: string; // format HH:mm
}

/**
 * Tâche planifiée avec ses horaires
 */
export interface ScheduledTask extends Task {
  scheduledStartTime: string;
  scheduledEndTime: string;
  timeBlock: string; // ex: "09:00-10:30"
}

