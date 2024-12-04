import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComp from './components/RootComponent';
import RootExcersiseComp from './excersise9/RootExcersiseComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootComp />
    {/* <RootExcersiseComp /> */}
  </React.StrictMode>
);

