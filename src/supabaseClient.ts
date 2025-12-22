import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // On logge seulement en dev pour éviter les surprises silencieuses
  console.warn(
    '[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant. Vérifiez votre configuration.'
  );
}

// On fournit des valeurs par défaut pour éviter le crash si les variables sont manquantes
// L'app ne fonctionnera pas mais au moins elle ne plantera pas
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);


