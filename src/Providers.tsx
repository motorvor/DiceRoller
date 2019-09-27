import React from 'react';
import { useThemeContext } from './contexts/ThemeContext';
import { useSessionContext } from './contexts/SessionContext';

export default function Providers(props: any) {
  return (
    <useThemeContext.Provider>
      <useSessionContext.Provider>
        {props.children}
      </useSessionContext.Provider>
    </useThemeContext.Provider>
  );
}