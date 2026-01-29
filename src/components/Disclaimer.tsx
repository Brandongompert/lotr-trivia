/**
 * Legal disclaimer component for unofficial fan site
 */
export function Disclaimer() {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <h3 className="text-sm font-semibold text-slate-300 mb-2">
        ⚠️ Fan-Made Content
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        This is an unofficial fan-made trivia website. The Lord of the Rings and
        all related characters, locations, and lore are the property of the
        Tolkien Estate and/or their respective copyright holders. This site is
        created purely for educational and entertainment purposes and is not
        affiliated with, endorsed by, or connected to J.R.R. Tolkien, the
        Tolkien Estate, Middle-earth Enterprises, or any official Lord of the
        Rings entities.
      </p>
    </div>
  );
}
