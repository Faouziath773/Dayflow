import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Zap, 
  Settings, 
  Calendar,
  TrendingUp,
  Home,
  Edit2,
  Check,
  X
} from 'lucide-react';
import type { Task, ScheduledTask } from '../types/task';
import { useDayLearning } from '../hooks/useDayLearning';
import { useScheduleSettings } from '../hooks/useScheduleSettings';
import { useTranslation } from '../contexts/TranslationContext';

interface SidebarProps {
  tasks: Task[];
  scheduledTasks: ScheduledTask[];
  isScheduled: boolean;
  onNavigateToHome: () => void;
  onSettingsChange?: () => void;
}

export function Sidebar({ tasks, scheduledTasks, isScheduled, onNavigateToHome, onSettingsChange }: SidebarProps) {
  const { t } = useTranslation();
  const { calculateDayStats } = useDayLearning();
  const { settings, updateSettings } = useScheduleSettings();
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  
  const stats = calculateDayStats(tasks);
  
  // Calculer la durée totale planifiée
  const totalScheduledDuration = scheduledTasks.reduce(
    (sum, task) => sum + task.duration,
    0
  );
  
  // Répartition par niveau d'énergie
  const energyDistribution = tasks.reduce(
    (acc, task) => {
      acc[task.energyLevel] = (acc[task.energyLevel] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Convertir minutes en heures et minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h${mins}min`;
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-72 sm:w-80 bg-white border-r-2 border-purple-200 h-screen sticky top-0 overflow-y-auto shadow-xl"
    >
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t.sidebar.overview}</h2>
          <button
            onClick={onNavigateToHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Statistiques principales */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">{t.sidebar.statistics}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t.sidebar.totalTasks}</span>
              <span className="font-bold text-gray-900">{stats.totalTasks}</span>
            </div>
            
            {stats.totalTasks > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.sidebar.completed}</span>
                <span className="font-bold text-green-600">
                  {stats.completedTasks} / {stats.totalTasks}
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t.sidebar.totalDuration}</span>
              <span className="font-bold text-gray-900">
                {formatDuration(stats.totalDuration)}
              </span>
            </div>
            
            {isScheduled && scheduledTasks.length > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                <span className="text-sm text-gray-600">{t.sidebar.scheduled}</span>
                <span className="font-bold text-blue-600">
                  {formatDuration(totalScheduledDuration)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Répartition par énergie */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">{t.sidebar.energyLevel}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">{t.planner.energyHigh}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {energyDistribution.high || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600">{t.planner.energyMedium}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {energyDistribution.medium || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">{t.planner.energyLow}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {energyDistribution.low || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Informations de planning */}
        {isScheduled && scheduledTasks.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">{t.sidebar.planning}</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t.sidebar.start}</span>
                <span className="font-semibold text-gray-900">
                  {scheduledTasks[0]?.scheduledStartTime || 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t.sidebar.end}</span>
                <span className="font-semibold text-gray-900">
                  {scheduledTasks[scheduledTasks.length - 1]?.scheduledEndTime || 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-green-200">
                <span className="text-gray-600">{t.sidebar.scheduledTasks}</span>
                <span className="font-bold text-green-600">
                  {scheduledTasks.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Paramètres rapides */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">{t.sidebar.settings}</h3>
            </div>
            {!isEditingSettings ? (
              <button
                onClick={() => {
                  setTempSettings(settings);
                  setIsEditingSettings(true);
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Modifier les paramètres"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    updateSettings(tempSettings);
                    setIsEditingSettings(false);
                    // Réinitialiser le planning si les paramètres changent
                    if (onSettingsChange) {
                      onSettingsChange();
                    }
                  }}
                  className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                  aria-label="Valider"
                >
                  <Check className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => {
                    setTempSettings(settings);
                    setIsEditingSettings(false);
                  }}
                  className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                  aria-label="Annuler"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-600 mb-1.5">{t.sidebar.startHour}</label>
              {isEditingSettings ? (
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={tempSettings.startHour}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setTempSettings({ ...tempSettings, startHour: Math.max(0, Math.min(23, value)) });
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              ) : (
                <span className="font-semibold text-gray-900 block">
                  {settings.startHour.toString().padStart(2, '0')}:00
                </span>
              )}
            </div>
            
            <div>
              <label className="block text-gray-600 mb-1.5">{t.sidebar.endHour}</label>
              {isEditingSettings ? (
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={tempSettings.endHour}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 20;
                    setTempSettings({ ...tempSettings, endHour: Math.max(1, Math.min(24, value)) });
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              ) : (
                <span className="font-semibold text-gray-900 block">
                  {settings.endHour.toString().padStart(2, '0')}:00
                </span>
              )}
            </div>
            
            <div>
              <label className="block text-gray-600 mb-1.5">{t.sidebar.breakDuration}</label>
              {isEditingSettings ? (
                <input
                  type="number"
                  min="0"
                  max="60"
                  step="5"
                  value={tempSettings.breakDuration}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 15;
                    setTempSettings({ ...tempSettings, breakDuration: Math.max(0, Math.min(60, value)) });
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              ) : (
                <span className="font-semibold text-gray-900 block">
                  {settings.breakDuration} min
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Message si aucune tâche */}
        {tasks.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-center">
            <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {t.sidebar.noTasksMessage}
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

