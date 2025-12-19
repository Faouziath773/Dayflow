import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { DayFeedback, DayStats } from '../types/day';
import type { Task } from '../types/task';

/**
 * Hook pour apprendre des patterns de la journée
 */
export function useDayLearning() {
  const [feedbacks, setFeedbacks] = useLocalStorage<DayFeedback[]>(
    'dayflow-feedbacks',
    []
  );

  /**
   * Enregistre un feedback sur une journée
   */
  const saveFeedback = useCallback(
    (feedback: DayFeedback) => {
      setFeedbacks((prev) => {
        // Remplacer le feedback existant pour cette date ou l'ajouter
        const existingIndex = prev.findIndex((f) => f.date === feedback.date);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = feedback;
          return updated;
        }
        return [...prev, feedback];
      });
    },
    [setFeedbacks]
  );

  /**
   * Calcule les statistiques d'une journée
   */
  const calculateDayStats = useCallback(
    (tasks: Task[]): DayStats => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((t) => t.completed).length;
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0);

      // Calculer le niveau d'énergie moyen
      const energyCounts = tasks.reduce(
        (acc, t) => {
          acc[t.energyLevel] = (acc[t.energyLevel] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      let averageEnergyLevel: 'low' | 'medium' | 'high' = 'medium';
      const highCount = energyCounts.high || 0;
      const mediumCount = energyCounts.medium || 0;
      const lowCount = energyCounts.low || 0;

      if (highCount > mediumCount && highCount > lowCount) {
        averageEnergyLevel = 'high';
      } else if (lowCount > mediumCount && lowCount > highCount) {
        averageEnergyLevel = 'low';
      }

      return {
        totalTasks,
        completedTasks,
        completionRate,
        totalDuration,
        averageEnergyLevel,
      };
    },
    []
  );

  /**
   * Récupère le feedback pour une date donnée
   */
  const getFeedbackForDate = useCallback(
    (date: string): DayFeedback | undefined => {
      return feedbacks.find((f) => f.date === date);
    },
    [feedbacks]
  );

  /**
   * Récupère les statistiques moyennes sur toutes les journées
   */
  const getAverageStats = useCallback((): Partial<DayStats> => {
    if (feedbacks.length === 0) {
      return {};
    }

    // On peut étendre cela avec plus de statistiques
    return {};
  }, [feedbacks]);

  return {
    feedbacks,
    saveFeedback,
    calculateDayStats,
    getFeedbackForDate,
    getAverageStats,
  };
}

