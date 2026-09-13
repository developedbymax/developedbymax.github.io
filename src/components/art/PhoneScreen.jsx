import GameArt from './GameArt.jsx';

/* A phone with one of the games running in it. The HUD is small on purpose — it
   is there to say "this is a screen, not a diagram", and nothing more. */
export default function PhoneScreen({ game, hud, label }) {
  const t = game.theme;
  return (
    <div className="phone" style={{ '--glow': `${t.accent}44` }}>
      <div className="phone-screen" style={{ '--app-bg': t.ground, color: t.ink }}>
        <span className="phone-notch" aria-hidden="true" />
        <div className="mini-hud" aria-hidden="true">
          <div>
            <div className="l" style={{ color: t.inkFaint }}>{hud?.[0] ?? 'Score'}</div>
            <div className="v">{hud?.[1] ?? '12,480'}</div>
          </div>
          <div className="r">
            <div className="l" style={{ color: t.inkFaint }}>{hud?.[2] ?? 'Best'}</div>
            <div className="v" style={{ color: t.accent }}>{hud?.[3] ?? '18,902'}</div>
          </div>
        </div>
        <div className="mini-body">
          <GameArt slug={game.slug} size="phone" label={label} />
        </div>
        {/* the row of controls every one of these games keeps at the bottom of
            the screen — shape only, so the screen reads as a screen */}
        <div className="mini-bar" aria-hidden="true">
          <i style={{ background: t.accent }} />
          <i />
          <i />
        </div>
      </div>
      <span className="phone-label">{game.name}</span>
    </div>
  );
}
