import './case-study.css';

// Stored image paths are relative (e.g. "pic/1.png"). On sub-routes like
// /case/:slug a relative src would resolve against the route (→ /case/pic/...),
// so normalize to a root-absolute path.
function toAbsolute(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//.test(src) || src.startsWith('/')) return src;
  return `/${src}`;
}

export function MediaBlock({ src, alt }: { src: string; alt: string }) {
  const url = toAbsolute(src);
  return (
    <div className="media-block">
      {url ? <img src={url} alt={alt} loading="lazy" /> : <div className="ph">[ media ]</div>}
    </div>
  );
}
