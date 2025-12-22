import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { AppFooter } from '../components/AppFooter';

export function AuthPage() {
  // Google: décommenter `signInWithGoogle` quand tu voudras réactiver le SSO
  const { signIn, signUp, /* signInWithGoogle, */ loading } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    const action = mode === 'login' ? signIn : signUp;
    const { error } = await action(email, password);

    if (error) {
      setError(error);
      setSubmitting(false);
      return;
    }

    // Succès
    if (mode === 'register') {
      setInfo("Compte créé. Vous pouvez maintenant vous connecter.");
      // On bascule sur l'onglet connexion
      setMode('login');
    }

    // On vide les champs après une soumission réussie
    setEmail('');
    setPassword('');

    setSubmitting(false);
  };

  const isDisabled = loading || submitting;

  // Google: handler à réactiver plus tard
  // const handleGoogleSignIn = async () => {
  //   setError(null);
  //   setInfo(null);
  //   await signInWithGoogle();
  // };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          'linear-gradient(135deg, #e0f2fe 0%, #e9d5ff 50%, #fce7f3 100%)',
      }}
    >
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dayflow</h1>
              <p className="text-sm text-gray-500">
                Planifiez votre journée, partout, sur tous vos appareils.
              </p>
            </div>
          </div>

          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="vous@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Au moins 6 caractères"
              />
             
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {info && !error && (
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                {info}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isDisabled}
              whileHover={isDisabled ? undefined : { scale: 1.02 }}
              whileTap={isDisabled ? undefined : { scale: 0.97 }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
                isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl'
              }`}
            >
              {mode === 'login' ? 'Se connecter' : "Créer un compte"}
            </motion.button>

         
          </form>

          {/*
          Google: bloc de connexion sociale à réactiver plus tard
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                ou
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#4285F4] text-white text-xs font-bold">
                G
              </span>
              <span>Continuer avec Google</span>
            </button>
          </div>
          */}
        </motion.div>
      </div>

      <AppFooter />
    </div>
  );
}


