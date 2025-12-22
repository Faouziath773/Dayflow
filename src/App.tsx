import { useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import Planner from './pages/Planner';
import { AuthPage } from './pages/AuthPage';

type Page = 'home' | 'planner';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-gray-500 text-sm">Chargement de votre session...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home onNavigateToPlanner={() => setCurrentPage('planner')} />
      )}
      {currentPage === 'planner' && (
        <Planner onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </AuthProvider>
  );
}

export default App;
