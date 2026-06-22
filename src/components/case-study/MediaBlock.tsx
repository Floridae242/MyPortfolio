import './case-study.css';
export function MediaBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="media-block">
      {src ? <img src={src} alt={alt} loading="lazy" /> : <div className="ph">[ media ]</div>}
    </div>
  );
}
