import { motion } from 'framer-motion';
import { Trash2, Clock, Check } from 'lucide-react';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onRemove: (id: string) => void;
  onToggleComplete?: (id: string) => void;
}

const energyColors: Record<string, string> = {
  high: 'bg-red-50 border-red-200',
  medium: 'bg-yellow-50 border-yellow-200',
  low: 'bg-green-50 border-green-200',
};

const energyLabels: Record<string, string> = {
  high: 'Élevé',
  medium: 'Moyen',
  low: 'Faible',
};

export function TaskCard({ task, onRemove, onToggleComplete }: TaskCardProps) {
  const isCompleted = task.completed || false;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-5 rounded-xl border-2 ${energyColors[task.energyLevel]} shadow-md hover:shadow-lg transition-all duration-200 ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {onToggleComplete && (
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
              isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
            aria-label={isCompleted ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
          >
            {isCompleted && <Check className="w-4 h-4" />}
          </button>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-3 text-lg ${
            isCompleted 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
          }`}>
            {task.name}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <span className={`flex items-center gap-1.5 font-medium ${
              isCompleted ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Clock className="w-4 h-4" />
              {task.duration} min
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              isCompleted ? 'bg-gray-200 text-gray-500' : 'bg-white'
            }`}>
              {energyLabels[task.energyLevel]}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onRemove(task.id)}
          className="ml-2 p-2.5 text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
          aria-label="Supprimer la tâche"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

