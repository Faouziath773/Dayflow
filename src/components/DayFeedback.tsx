import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { DayFeedback as DayFeedbackType } from '../types/day';
import { useTranslation } from '../contexts/TranslationContext';

interface DayFeedbackProps {
  onSave: (feedback: DayFeedbackType) => void;
  existingFeedback?: DayFeedbackType;
}

export function DayFeedback({ onSave, existingFeedback }: DayFeedbackProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(existingFeedback?.rating || 0);
  const [notes, setNotes] = useState(existingFeedback?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedback: DayFeedbackType = {
      date: new Date().toISOString().split('T')[0],
      rating,
      notes: notes.trim() || undefined,
      completedTasks: [],
    };
    onSave(feedback);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mt-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {t.planner.feedbackTitle}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t.planner.feedbackRating}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`p-2 rounded-lg transition-all ${
                  rating >= value
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              >
                <Star
                  className={`w-8 h-8 ${
                    rating >= value ? 'fill-current' : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.planner.feedbackNotes}
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder={t.planner.feedbackNotesPlaceholder}
          />
        </div>

        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.planner.feedbackSave}
        </motion.button>
      </form>
    </motion.div>
  );
}

