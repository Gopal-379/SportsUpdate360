import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import { ThemeContext } from './context/theme'
import { useContext } from "react";
import { MatchesProvider } from './context/matches/context';
import { ArticlesProvider } from './context/articles/context';
import { SportsProvider } from './context/sports/context';
import { TeamsProvider } from './context/teams/context';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <MatchesProvider>
        <ArticlesProvider>
          <SportsProvider>
            <TeamsProvider>
              <RouterProvider router={router} />
            </TeamsProvider>
          </SportsProvider>
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  );
}

export default App