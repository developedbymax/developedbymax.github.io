import { Routes, Route } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import Outrush from './pages/Outrush.jsx';
import OutrushLegal from './pages/OutrushLegal.jsx';
import Huecomb from './pages/Huecomb.jsx';
import HuecombLegal from './pages/HuecombLegal.jsx';
import Scrapglow from './pages/Scrapglow.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/base.css';
import './styles/home.css';
import './styles/art.css';
import './styles/game.css';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/outrush" element={<Outrush />} />
        <Route path="/outrush/privacy" element={<OutrushLegal />} />

        <Route path="/huecomb" element={<Huecomb />} />
        <Route path="/huecomb/privacy" element={<HuecombLegal />} />

        <Route path="/scrapglow" element={<Scrapglow />} />

        {/* The addresses the previous per-game sites used. Outrush's privacy URL
            is baked into the shipped app and into two store listings, so these
            have to keep resolving — they are emitted as real files by the
            prerenderer, and matched here too for a client-side navigation. */}
        <Route path="/outrush/index.html" element={<Outrush />} />
        <Route path="/outrush/privacy.html" element={<OutrushLegal />} />
        <Route path="/huecomb/index.html" element={<Huecomb />} />
        <Route path="/huecomb/privacy.html" element={<HuecombLegal />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
