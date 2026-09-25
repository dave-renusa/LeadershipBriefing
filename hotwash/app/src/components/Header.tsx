export function Header({ title, subtitle, framing, right }: { title: string; subtitle?: string | null; framing?: string | null; right?: React.ReactNode }) {
  const cut = framing ? framing.indexOf('Grade every tool') : -1;
  return (
    <header className="header">
      <div className="header-top" />
      <div className="header-inner">
        <div className="brand">
          <div className="wordmark">Ren<span>USA</span></div>
          <div className="divider" />
          <div className="title">
            <h1>{title}</h1>
            {subtitle && <div className="sub">{subtitle}</div>}
          </div>
        </div>
        <div className="header-right">{right}</div>
      </div>
      {framing && (
        <p className="framing">
          {cut > 0 ? <>{framing.slice(0, cut)}<strong>{framing.slice(cut)}</strong></> : framing}
        </p>
      )}
      <div className="gold-bar" />
    </header>
  );
}
