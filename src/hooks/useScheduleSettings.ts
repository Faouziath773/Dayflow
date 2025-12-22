import { useLocalStorage } from './useLocalStorage';

export interface ScheduleSettings {
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  breakDuration: number; // en minutes
}

const defaultSettings: ScheduleSettings = {
  startHour: 8,
  endHour: 20,
  startMinute: 0,
  endMinute: 0,
  breakDuration: 15,
};

export function useScheduleSettings() {
  const [settings, setSettings] = useLocalStorage<ScheduleSettings>(
    'dayflow-schedule-settings',
    defaultSettings
  );

  const updateSettings = (updates: Partial<ScheduleSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}

