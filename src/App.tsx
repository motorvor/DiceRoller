import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { useThemeContext } from './contexts/ThemeContext';
import { useSessionContext } from './contexts/SessionContext';

import MainGrid from './components/MainGrid';
import NavBar from './components/NavBar';
import Login from './components/Login';
import DiceCanvas from './components/DiceCanvas';

import { Box } from 'grommet';
import SideBar from './components/SideBar';


const App: React.FC = () => {
  const { theme } = useThemeContext();
  const { session } = useSessionContext();

  return (
    <div className={`App ${theme === 'dark' && 'bp3-dark'}`}>
      {!session.loggedIn
        ? <Login /> 
        : <MainGrid>
            <NavBar name='navBar'/>
            <SideBar name="sideBar"/>
            <DiceCanvas />
          </MainGrid>
      }
      
    </div>
  );
}

export default App;
