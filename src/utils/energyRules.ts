import type { EnergyLevel } from '../types/task';

/**
 * Règles d'énergie par heure de la journée
 * Retourne le niveau d'énergie optimal pour une heure donnée
 */
export function getOptimalEnergyLevel(hour: number): EnergyLevel {
  // Matin (6h-10h) : énergie élevée
  if (hour >= 6 && hour < 10) {
    return 'high';
  }
  // Milieu de matinée (10h-12h) : énergie moyenne
  if (hour >= 10 && hour < 12) {
    return 'medium';
  }
  // Après-midi (12h-15h) : énergie moyenne
  if (hour >= 12 && hour < 15) {
    return 'medium';
  }
  // Fin d'après-midi (15h-18h) : énergie faible à moyenne
  if (hour >= 15 && hour < 18) {
    return 'low';
  }
  // Soirée (18h-22h) : énergie faible
  if (hour >= 18 && hour < 22) {
    return 'low';
  }
  // Nuit : énergie faible
  return 'low';
}

/**
 * Vérifie si une tâche peut être placée à une heure donnée
 * selon son niveau d'énergie requis
 */
export function canPlaceTaskAtHour(
  taskEnergy: EnergyLevel,
  hour: number
): boolean {
  const optimalEnergy = getOptimalEnergyLevel(hour);
  
  // Les tâches à haute énergie doivent être placées quand l'énergie est haute
  if (taskEnergy === 'high') {
    return optimalEnergy === 'high';
  }
  
  // Les tâches à énergie moyenne peuvent être placées quand l'énergie est moyenne ou haute
  if (taskEnergy === 'medium') {
    return optimalEnergy === 'medium' || optimalEnergy === 'high';
  }
  
  // Les tâches à faible énergie peuvent être placées n'importe quand
  return true;
}

/**
 * Score de compatibilité entre une tâche et une heure
 * Plus le score est élevé, mieux c'est
 */
export function getEnergyCompatibilityScore(
  taskEnergy: EnergyLevel,
  hour: number
): number {
  const optimalEnergy = getOptimalEnergyLevel(hour);
  
  if (taskEnergy === 'high' && optimalEnergy === 'high') return 10;
  if (taskEnergy === 'high' && optimalEnergy === 'medium') return 5;
  if (taskEnergy === 'high' && optimalEnergy === 'low') return 1;
  
  if (taskEnergy === 'medium' && optimalEnergy === 'high') return 8;
  if (taskEnergy === 'medium' && optimalEnergy === 'medium') return 10;
  if (taskEnergy === 'medium' && optimalEnergy === 'low') return 5;
  
  if (taskEnergy === 'low' && optimalEnergy === 'high') return 6;
  if (taskEnergy === 'low' && optimalEnergy === 'medium') return 8;
  if (taskEnergy === 'low' && optimalEnergy === 'low') return 10;
  
  return 0;
}

