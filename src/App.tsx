import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import { ThemeContext } from './context/theme'
import { useContext } from "react";
import { MatchesProvider } from './context/matches/context';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <MatchesProvider>
        <RouterProvider router={router}/>
      </MatchesProvider>
    </div>
  )
}

export default App