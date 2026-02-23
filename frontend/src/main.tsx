import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Header from './Header';
import App from './App';
import Footer from './Footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header></Header>
    <App></App>
    <Footer></Footer>
  </StrictMode>
);