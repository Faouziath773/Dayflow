import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Menu, X as XIcon } from 'lucide-react';
import { useScheduler } from '../hooks/useScheduler';
import { useDayLearning } from '../hooks/useDayLearning';
import { useTranslation } from '../contexts/TranslationContext';
import { useAuth } from '../contexts/AuthContext';
import { useTaskNotifications } from '../hooks/useTaskNotifications';
import { TaskInput } from '../components/TaskInput';
import { TaskCard } from '../components/TaskCard';
import { Timeline } from '../components/Timeline';
import { DayFeedback } from '../components/DayFeedback';
import { Sidebar } from '../components/Sidebar';
import { LanguageSelector } from '../components/LanguageSelector';
import { useScheduleSettings } from '../hooks/useScheduleSettings';
import type { Task } from '../types/task';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface PlannerProps {
  onNavigateToHome: () => void;
}

export function Planner({ onNavigateToHome }: PlannerProps) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const {
    tasks,
    scheduledTasks,
    isScheduled,
    loadingTasks,
    addTask,
    removeTask,
    toggleTaskCompletion,
    resetSchedule,
    carryIncompleteTasksToTomorrow,
  } = useScheduler();

  const { saveFeedback } = useDayLearning();
  const [showFeedback, setShowFeedback] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDaySummary, setShowDaySummary] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const { settings } = useScheduleSettings();

  const today = new Date().toISOString().split('T')[0];
  const [summaryValidated, setSummaryValidated] = useLocalStorage<boolean>(
    `dayflow-day-summary-${today}`,
    false
  );

  // Notifications locales pour les tâches avec heure cible
  useTaskNotifications(tasks);

  // Affichage automatique du bilan à l'heure de fin de journée
  useEffect(() => {
    const endHour = settings.endHour;
    const endMinute = settings.endMinute ?? 0;
    const now = new Date();
    const target = new Date();
    target.setHours(endHour, endMinute, 0, 0);

    const delay = target.getTime() - now.getTime();

    // Si le bilan a déjà été validé pour aujourd'hui, ne rien afficher
    if (summaryValidated) {
      return;
    }

    // Si on ouvre l'app après l'heure de fin, on affiche le bilan tout de suite
    if (delay <= 0) {
      if (!showDaySummary && tasks.length > 0) {
        setShowDaySummary(true);
      }
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (tasks.length > 0 && !summaryValidated) {
        setShowDaySummary(true);
      }
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    settings.endHour,
    settings.endMinute,
    tasks.length,
    showDaySummary,
    summaryValidated,
  ]);

  const handleReset = () => {
    resetSchedule();
    setShowFeedback(false);
  };

  const handleValidateDaySummary = () => {
    const incompleteTasks = tasks.filter((t) => !t.completed);
    const incompleteCount = incompleteTasks.length;

    setShowDaySummary(false);
    setSummaryValidated(true);

    if (incompleteCount === 0) {
      return;
    }

    const shouldCarry = window.confirm(
      incompleteCount === 1
        ? "Une tâche n'est pas terminée. Voulez-vous la reporter à demain ?"
        : `${incompleteCount} tâches ne sont pas terminées. Voulez-vous les reporter à demain ?`
    );

    if (shouldCarry) {
      const ids = incompleteTasks.map((t) => t.id);
      carryIncompleteTasksToTomorrow(ids);
    }
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
    addTask(task);
    setShowTaskInput(false);
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #e9d5ff 50%, #fce7f3 100%)',
      }}
    >
      {/* Sidebar - cachée sur mobile, visible sur desktop */}
      <div className={`hidden lg:block ${sidebarOpen ? 'lg:block' : ''}`}>
        <Sidebar
          tasks={tasks}
          scheduledTasks={scheduledTasks}
          isScheduled={isScheduled}
          onNavigateToHome={onNavigateToHome}
          onSettingsChange={resetSchedule}
        />
      </div>
      
      {/* Sidebar mobile - overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
            <Sidebar
              tasks={tasks}
              scheduledTasks={scheduledTasks}
              isScheduled={isScheduled}
              onNavigateToHome={onNavigateToHome}
              onSettingsChange={resetSchedule}
            />
          </div>
        </>
      )}
      
      <div className="flex-1 overflow-y-auto w-full lg:w-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <XIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{t.planner.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => {
                void signOut();
                onNavigateToHome();
              }}
              className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Section d'ajout de tâches */}
          {showTaskInput && (
            <div className="mb-8">
              <TaskInput onAddTask={handleAddTask} />
            </div>
          )}

          {/* Indicateur de chargement Supabase */}
          {loadingTasks && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-sm text-gray-500 bg-white/80 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <span>Chargement de vos tâches depuis le cloud...</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </motion.div>
          )}

          {/* Liste des tâches */}
          {tasks.length > 0 && !loadingTasks && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t.planner.yourTasks} <span className="text-blue-600">({tasks.length})</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowTaskInput(true)}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all"
                  >
                    Ajouter une tâche
                  </button>
                  {isScheduled && (
                  <motion.button
                    onClick={handleReset}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all durée-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.planner.reset}
                  </motion.button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 mb-8">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onRemove={removeTask}
                      onToggleComplete={toggleTaskCompletion}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Timeline */}
          {isScheduled && scheduledTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 mb-8"
            >
              <Timeline 
                tasks={scheduledTasks} 
                onToggleComplete={toggleTaskCompletion}
              />
            </motion.div>
          )}

          {/* Message si aucune tâche */}
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100"
            >
              <p className="text-gray-500 text-lg font-medium">
                {t.planner.noTasks}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {t.planner.noTasksDescription}
              </p>
              {!showTaskInput && (
                <button
                  type="button"
                  onClick={() => setShowTaskInput(true)}
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all"
                >
                  Ajouter ma première tâche
                </button>
              )}
            </motion.div>
          )}

          {/* Feedback */}
          {isScheduled && scheduledTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {!showFeedback && (
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full py-3 text-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  {t.planner.feedbackButton}
                </button>
              )}
              {showFeedback && (
                <DayFeedback
                  onSave={(feedback) => {
                    saveFeedback(feedback);
                    setShowFeedback(false);
                  }}
                />
              )}
            </motion.div>
          )}

          {/* Bilan de fin de journée */}
          {showDaySummary && tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bilan de votre journée
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Cochez les tâches que vous avez réellement terminées, puis
                validez le bilan.
              </p>

              <div className="max-h-80 overflow-y-auto border border-gray-100 rounded-xl mb-4">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                        Terminée
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                        Tâche
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                        Durée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="border-t border-gray-100">
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={!!task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                          />
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {task.name}
                        </td>
                        <td className="px-4 py-2 text-gray-500">
                          {task.duration} min
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDaySummary(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Plus tard
                </button>
                <motion.button
                  type="button"
                  onClick={handleValidateDaySummary}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all"
                >
                  Valider le bilan de la journée
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;

