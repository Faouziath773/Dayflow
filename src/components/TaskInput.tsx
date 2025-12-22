import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Task, EnergyLevel } from '../types/task';
import { useTranslation } from '../contexts/TranslationContext';

interface TaskInputProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(30);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('medium');
  const [targetTime, setTargetTime] = useState<string>('');
  const [remindBeforeMinutes, setRemindBeforeMinutes] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddTask({
        name: name.trim(),
        duration,
        energyLevel,
        targetTime: targetTime || undefined,
        remindBeforeMinutes: targetTime ? remindBeforeMinutes : undefined,
      });
      setName('');
      setDuration(30);
      setEnergyLevel('medium');
      setTargetTime('');
      setRemindBeforeMinutes(10);
    }
  };

  const energyOptions: { value: EnergyLevel; label: string; color: string }[] = [
    { value: 'low', label: t.planner.energyLow, color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: t.planner.energyMedium, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: t.planner.energyHigh, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t.planner.addTask}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="task-name" className="block text-sm font-semibold text-gray-700 mb-2.5">
            {t.planner.taskName}
          </label>
          <input
            id="task-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Réviser le rapport"
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="task-duration" className="block text-sm font-semibold text-gray-700 mb-2.5">
            {t.planner.duration}
          </label>
          <input
            id="task-duration"
            type="number"
            min="15"
            max="480"
            step="15"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-time" className="block text-sm font-semibold text-gray-700 mb-2.5">
              Heure souhaitée (optionnel)
            </label>
            <input
              id="task-time"
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="task-reminder"
              className="block text-sm font-semibold text-gray-700 mb-2.5"
            >
              Rappel avant (min)
            </label>
            <select
              id="task-reminder"
              value={remindBeforeMinutes}
              onChange={(e) => setRemindBeforeMinutes(Number(e.target.value))}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 bg-white"
              disabled={!targetTime}
            >
              <option value={0}>À l&apos;heure exacte</option>
              <option value={5}>5 minutes avant</option>
              <option value={10}>10 minutes avant</option>
              <option value={15}>15 minutes avant</option>
              <option value={30}>30 minutes avant</option>
              <option value={60}>1 heure avant</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
            {t.planner.energyLevel}
          </label>
          <div className="flex gap-3">
            {energyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setEnergyLevel(option.value)}
                className={`flex-1 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                  energyLevel === option.value
                    ? `${option.color} ring-2 ring-offset-2 ring-offset-white ring-blue-500 shadow-md scale-105`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          {t.planner.addTaskButton}
        </motion.button>
      </form>
    </div>
  );
}

