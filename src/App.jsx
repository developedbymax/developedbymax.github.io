import { Routes, Route } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import Outrush from './pages/Outrush.jsx';
import OutrushLegal from './pages/OutrushLegal.jsx';
import Huecomb from './pages/Huecomb.jsx';
import HuecombLegal from './pages/HuecombLegal.jsx';
import Scrapglow from './pages/Scrapglow.jsx';
import ScrapglowLegal from './pages/ScrapglowLegal.jsx';
import Starshell from './pages/Starshell.jsx';
import StarshellLegal from './pages/StarshellLegal.jsx';
import Pearlbound from './pages/Pearlbound.jsx';
import PearlboundLegal from './pages/PearlboundLegal.jsx';
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
        <Route path="/scrapglow/privacy" element={<ScrapglowLegal />} />

        <Route path="/starshell" element={<Starshell />} />
        <Route path="/starshell/privacy" element={<StarshellLegal />} />
        <Route path="/starshell/terms" element={<StarshellLegal focus="terms" />} />

        <Route path="/pearlbound" element={<Pearlbound />} />
        <Route path="/pearlbound/privacy" element={<PearlboundLegal />} />
        <Route path="/pearlbound/terms" element={<PearlboundLegal focus="terms" />} />

        {/* The .html spelling of each game's legal page. Outrush's privacy URL is
            baked into the shipped app and into two store listings, so that one has
            to keep resolving; the others follow the same pattern so the
            store-facing URLs are uniform. All are emitted as real files by the
            prerenderer, and matched here too for a client-side navigation. */}
        <Route path="/outrush/index.html" element={<Outrush />} />
        <Route path="/outrush/privacy.html" element={<OutrushLegal />} />
        <Route path="/huecomb/index.html" element={<Huecomb />} />
        <Route path="/huecomb/privacy.html" element={<HuecombLegal />} />
        <Route path="/scrapglow/privacy.html" element={<ScrapglowLegal />} />
        <Route path="/starshell/privacy.html" element={<StarshellLegal />} />
        <Route path="/starshell/terms.html" element={<StarshellLegal focus="terms" />} />
        <Route path="/pearlbound/privacy.html" element={<PearlboundLegal />} />
        <Route path="/pearlbound/terms.html" element={<PearlboundLegal focus="terms" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
