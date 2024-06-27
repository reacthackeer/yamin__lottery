import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import appComponentMainRouter from './App';
import AppCover from './AppCover';
import { store } from './Store/store';
import './index.scss';


ReactDOM.createRoot(document.getElementById('root')).render( 
  <ChakraProvider>
      <Provider store={store}>
        <AppCover>
          <RouterProvider router={appComponentMainRouter}/> 
        </AppCover>
      </Provider>
  </ChakraProvider>,
)
