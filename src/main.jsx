import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const root = document.getElementById('root');
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/* Every route is prerendered to static HTML, so the usual path is a hydrate.
   `vite dev` serves the raw shell instead, whose only child is the
   `<!--app-html-->` comment — which is a child node, so the test has to be for
   an *element* or dev hydrates against nothing and React throws. */
if (root.firstElementChild) hydrateRoot(root, tree);
else createRoot(root).render(tree);
