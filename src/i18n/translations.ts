export type Language = 'fr' | 'en';

export interface Translations {
  hero: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    cta: string;
  };
  howItWorks: {
    title: string;
    description: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
  };
  planner: {
    title: string;
    addTask: string;
    taskName: string;
    duration: string;
    energyLevel: string;
    energyLow: string;
    energyMedium: string;
    energyHigh: string;
    addTaskButton: string;
    yourTasks: string;
    generateDay: string;
    reset: string;
    clearAll: string;
    back: string;
    noTasks: string;
    noTasksDescription: string;
    yourDay: string;
    noScheduledTasks: string;
    feedback: string;
    feedbackButton: string;
    feedbackTitle: string;
    feedbackRating: string;
    feedbackNotes: string;
    feedbackNotesPlaceholder: string;
    feedbackSave: string;
  };
  sidebar: {
    overview: string;
    statistics: string;
    totalTasks: string;
    completed: string;
    totalDuration: string;
    scheduled: string;
    energyLevel: string;
    planning: string;
    start: string;
    end: string;
    scheduledTasks: string;
    settings: string;
    startHour: string;
    endHour: string;
    breakDuration: string;
    noTasksMessage: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    planner: string;
    howItWorks: string;
    followMe: string;
    madeWith: string;
    by: string;
    copyright: string;
  };
  preview: {
    title: string;
    description: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    hero: {
      title: 'Dayflow',
      subtitle1: 'Planifiez votre journée.',
      subtitle2: 'Traversez-la.',
      cta: 'Planifier ma journée',
    },
    howItWorks: {
      title: 'Comment ça marche',
      description: 'Une approche simple et intelligente pour organiser votre journée',
      step1: {
        title: 'Ajoutez des tâches',
        description: 'Ajoutez vos tâches avec leur durée estimée et votre niveau d\'énergie requis.',
      },
      step2: {
        title: 'Nous organisons votre journée',
        description: 'Notre algorithme intelligent organise vos tâches selon votre niveau d\'énergie naturel.',
      },
      step3: {
        title: 'Restez concentré',
        description: 'Suivez votre timeline visuelle et restez concentré sur une tâche à la fois.',
      },
    },
    planner: {
      title: 'Planificateur',
      addTask: 'Ajouter une nouvelle tâche',
      taskName: 'Nom de la tâche',
      duration: 'Durée (minutes)',
      energyLevel: 'Niveau d\'énergie requis',
      energyLow: 'Faible',
      energyMedium: 'Moyen',
      energyHigh: 'Élevé',
      addTaskButton: 'Ajouter la tâche',
      yourTasks: 'Vos tâches',
      generateDay: 'Générer ma journée',
      reset: 'Réinitialiser',
      clearAll: 'Tout effacer',
      back: 'Retour',
      noTasks: 'Commencez par ajouter une tâche ci-dessus',
      noTasksDescription: 'Vos tâches seront organisées automatiquement selon votre niveau d\'énergie',
      yourDay: 'Votre journée',
      noScheduledTasks: 'Aucune tâche planifiée. Ajoutez des tâches et générez votre planning.',
      feedback: 'Donner un feedback sur cette journée',
      feedbackButton: 'Donner un feedback sur cette journée',
      feedbackTitle: 'Comment s\'est passée votre journée ?',
      feedbackRating: 'Notez votre journée',
      feedbackNotes: 'Notes (optionnel)',
      feedbackNotesPlaceholder: 'Comment s\'est passée votre journée ? Qu\'avez-vous appris ?',
      feedbackSave: 'Enregistrer le feedback',
    },
    sidebar: {
      overview: 'Vue d\'ensemble',
      statistics: 'Statistiques',
      totalTasks: 'Total tâches',
      completed: 'Complétées',
      totalDuration: 'Durée totale',
      scheduled: 'Planifiée',
      energyLevel: 'Niveau d\'énergie',
      planning: 'Planning',
      start: 'Début',
      end: 'Fin',
      scheduledTasks: 'Tâches planifiées',
      settings: 'Paramètres',
      startHour: 'Heure de début',
      endHour: 'Heure de fin',
      breakDuration: 'Pause entre tâches (min)',
      noTasksMessage: 'Ajoutez des tâches pour voir les statistiques',
    },
    footer: {
      description: 'Planifiez votre journée intelligemment. Organisez vos tâches selon votre niveau d\'énergie.',
      quickLinks: 'Liens rapides',
      planner: 'Planificateur',
      howItWorks: 'Comment ça marche',
      followMe: 'Suivez-moi',
      madeWith: 'Made with',
      by: 'par',
      copyright: 'Dayflow. Tous droits réservés.',
    },
    preview: {
      title: 'Visualisez votre journée',
      description: 'Une timeline claire et colorée pour suivre vos tâches',
    },
  },
  en: {
    hero: {
      title: 'Dayflow',
      subtitle1: 'Plan your day.',
      subtitle2: 'Flow through it.',
      cta: 'Plan my day',
    },
    howItWorks: {
      title: 'How it works',
      description: 'A simple and intelligent approach to organize your day',
      step1: {
        title: 'Add tasks',
        description: 'Add your tasks with their estimated duration and required energy level.',
      },
      step2: {
        title: 'We organize your day',
        description: 'Our intelligent algorithm organizes your tasks according to your natural energy level.',
      },
      step3: {
        title: 'Stay focused',
        description: 'Follow your visual timeline and stay focused on one task at a time.',
      },
    },
    planner: {
      title: 'Planner',
      addTask: 'Add a new task',
      taskName: 'Task name',
      duration: 'Duration (minutes)',
      energyLevel: 'Required energy level',
      energyLow: 'Low',
      energyMedium: 'Medium',
      energyHigh: 'High',
      addTaskButton: 'Add task',
      yourTasks: 'Your tasks',
      generateDay: 'Generate my day',
      reset: 'Reset',
      clearAll: 'Clear all',
      back: 'Back',
      noTasks: 'Start by adding a task above',
      noTasksDescription: 'Your tasks will be automatically organized according to your energy level',
      yourDay: 'Your day',
      noScheduledTasks: 'No scheduled tasks. Add tasks and generate your schedule.',
      feedback: 'Give feedback on this day',
      feedbackButton: 'Give feedback on this day',
      feedbackTitle: 'How was your day?',
      feedbackRating: 'Rate your day',
      feedbackNotes: 'Notes (optional)',
      feedbackNotesPlaceholder: 'How was your day? What did you learn?',
      feedbackSave: 'Save feedback',
    },
    sidebar: {
      overview: 'Overview',
      statistics: 'Statistics',
      totalTasks: 'Total tasks',
      completed: 'Completed',
      totalDuration: 'Total duration',
      scheduled: 'Scheduled',
      energyLevel: 'Energy level',
      planning: 'Planning',
      start: 'Start',
      end: 'End',
      scheduledTasks: 'Scheduled tasks',
      settings: 'Settings',
      startHour: 'Start hour',
      endHour: 'End hour',
      breakDuration: 'Break between tasks (min)',
      noTasksMessage: 'Add tasks to see statistics',
    },
    footer: {
      description: 'Plan your day intelligently. Organize your tasks according to your energy level.',
      quickLinks: 'Quick links',
      planner: 'Planner',
      howItWorks: 'How it works',
      followMe: 'Follow me',
      madeWith: 'Made with',
      by: 'by',
      copyright: 'Dayflow. All rights reserved.',
    },
    preview: {
      title: 'Visualize your day',
      description: 'A clear and colorful timeline to track your tasks',
    },
  },
};

