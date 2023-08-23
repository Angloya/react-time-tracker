import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteWrapper from './components/RouteWrapper';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteWrapper />
    </Provider>
  </React.StrictMode>,
);
