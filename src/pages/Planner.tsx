import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Menu, X as XIcon } from 'lucide-react';
import { useScheduler } from '../hooks/useScheduler';
import { useDayLearning } from '../hooks/useDayLearning';
import { useTranslation } from '../contexts/TranslationContext';
import { TaskInput } from '../components/TaskInput';
import { TaskCard } from '../components/TaskCard';
import { Timeline } from '../components/Timeline';
import { DayFeedback } from '../components/DayFeedback';
import { Sidebar } from '../components/Sidebar';
import { LanguageSelector } from '../components/LanguageSelector';

interface PlannerProps {
  onNavigateToHome: () => void;
}

export function Planner({ onNavigateToHome }: PlannerProps) {
  const { t } = useTranslation();
  const {
    tasks,
    scheduledTasks,
    isScheduled,
    addTask,
    removeTask,
    toggleTaskCompletion,
    generateSchedule,
    resetSchedule,
    clearAllTasks,
  } = useScheduler();

  const { saveFeedback } = useDayLearning();
  const [showFeedback, setShowFeedback] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleGenerateSchedule = () => {
    generateSchedule();
    setShowFeedback(false);
  };

  const handleReset = () => {
    resetSchedule();
    setShowFeedback(false);
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
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="px-3 sm:px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
              >
                {t.planner.clearAll}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Section d'ajout de tâches */}
          <div className="mb-8">
            <TaskInput onAddTask={addTask} />
          </div>

          {/* Liste des tâches */}
          {tasks.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t.planner.yourTasks} <span className="text-blue-600">({tasks.length})</span>
                </h2>
                {!isScheduled && (
                  <motion.button
                    onClick={handleGenerateSchedule}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">{t.planner.generateDay}</span>
                  </motion.button>
                )}
                {isScheduled && (
                  <motion.button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.planner.reset}
                  </motion.button>
                )}
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
        </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;

