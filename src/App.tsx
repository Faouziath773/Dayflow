import { useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { Home } from './pages/Home';
import Planner from './pages/Planner';

type Page = 'home' | 'planner';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <TranslationProvider>
      <div className="App">
        {currentPage === 'home' && (
          <Home onNavigateToPlanner={() => setCurrentPage('planner')} />
        )}
        {currentPage === 'planner' && (
          <Planner onNavigateToHome={() => setCurrentPage('home')} />
        )}
      </div>
    </TranslationProvider>
  );
}

export default App;
