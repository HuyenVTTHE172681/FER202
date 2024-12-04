import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import RootComp from './components/RootComponent';
import RootExcersiseComp from './excersise9/RootExcersiseComponent';
import RootExcersise_12 from './excersise12/RootExcersise12';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RootComp /> */}
    {/* <RootExcersiseComp /> */}
    <RootExcersise_12 />
  </React.StrictMode>
);

