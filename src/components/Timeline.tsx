import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ScheduledTask } from '../types/task';
import { formatTimeRange } from '../utils/timeBlocks';
import { useTranslation } from '../contexts/TranslationContext';

interface TimelineProps {
  tasks: ScheduledTask[];
  onToggleComplete?: (id: string) => void;
}

const energyColors: Record<string, string> = {
  high: 'bg-red-100 border-red-300 text-red-900',
  medium: 'bg-yellow-100 border-yellow-300 text-yellow-900',
  low: 'bg-green-100 border-green-300 text-green-900',
};

const energyLabels: Record<string, string> = {
  high: 'Élevé',
  medium: 'Moyen',
  low: 'Faible',
};

export function Timeline({ tasks, onToggleComplete }: TimelineProps) {
  const { t } = useTranslation();
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{t.planner.noScheduledTasks}</p>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t.planner.yourDay}</h2>
      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

        <div className="space-y-4 sm:space-y-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-12 sm:pl-20"
            >
              {/* Point sur la timeline */}
              <div className="absolute left-2 sm:left-6 top-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-2 sm:border-4 border-white shadow-lg"></div>

              {/* Carte de tâche */}
              <div
                className={`p-4 sm:p-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-shadow duration-300 ${energyColors[task.energyLevel]} ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                    {onToggleComplete && (
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                          task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                        }`}
                        aria-label={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                      >
                        {task.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                    )}
                    <h3 className={`text-lg sm:text-xl font-bold truncate ${
                      task.completed 
                        ? 'text-gray-500 line-through' 
                        : ''
                    }`}>
                      {task.name}
                    </h3>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    task.completed ? 'bg-gray-200/50 text-gray-500' : 'bg-white/50'
                  }`}>
                    {energyLabels[task.energyLevel]}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span className={`font-semibold ${
                    task.completed ? 'text-gray-400' : ''
                  }`}>
                    {formatTimeRange(
                      task.scheduledStartTime,
                      task.scheduledEndTime
                    )}
                  </span>
                  <span className={task.completed ? 'text-gray-400' : 'text-gray-600'}>
                    {task.duration} min
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

