"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { radioTracks } from "@/data/radioTracks";

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function RadioPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [showPrompt, setShowPrompt] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const currentTrack = useMemo(() => playlist[index], [playlist, index]);
  const currentTrackName = useMemo(() => {
    if (!currentTrack) return "No track";
    const raw = currentTrack.split("/").pop() ?? currentTrack;
    return decodeURIComponent(raw).replace(/\.mp3$/i, "");
  }, [currentTrack]);

  useEffect(() => {
    const savedEnabled = localStorage.getItem("saylez-radio-enabled");
    const savedVolume = localStorage.getItem("saylez-radio-volume");

    if (savedVolume !== null) {
      const parsed = Number(savedVolume);
      if (!Number.isNaN(parsed)) setVolume(Math.min(1, Math.max(0, parsed)));
    } else {
      setVolume(0.5);
      localStorage.setItem("saylez-radio-volume", "0.5");
    }

    if (savedEnabled === null) {
      if (pathname === "/") setShowPrompt(true);
      return;
    }

    setEnabled(savedEnabled === "true");
  }, [pathname]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    localStorage.setItem("saylez-radio-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    if (!radioTracks.length) return;
    setPlaylist(shuffle(radioTracks));
    setIndex(0);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack;
    audio.load();

    if (enabled) {
      audio.play().catch(() => {
        // Browser may block until direct user interaction
      });
    } else {
      audio.pause();
    }
  }, [enabled, currentTrack]);

  function handleChoice(next: boolean) {
    setShowPrompt(false);
    setEnabled(next);
    localStorage.setItem("saylez-radio-enabled", String(next));
  }

  function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("saylez-radio-enabled", String(next));
  }

  function handleNext() {
    if (!playlist.length) return;

    if (index < playlist.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    const reshuffled = shuffle(radioTracks);
    setPlaylist(reshuffled);
    setIndex(0);
  }

  function handlePrev() {
    if (!playlist.length) return;
    if (index > 0) {
      setIndex((prev) => prev - 1);
      return;
    }
    setIndex(playlist.length - 1);
  }

  function handleEnded() {
    handleNext();
  }

  return (
    <>
      {showPrompt && pathname === "/" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/25 bg-[#11151b]/95 p-6 text-white shadow-2xl">
            <p className="font-[var(--font-bebas)] text-4xl tracking-wide">Say Lez Radio</p>
            <p className="mt-2 font-[var(--font-inter)] text-lg">View site with audio?</p>

            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => handleChoice(true)} className="cursor-pointer rounded-lg border border-white/40 px-5 py-2 font-[var(--font-inter)] font-semibold">
                Yes
              </button>
              <button type="button" onClick={() => handleChoice(false)} className="cursor-pointer rounded-lg border border-white/25 px-5 py-2 font-[var(--font-inter)]">
                No
              </button>
            </div>

            <p className="mt-4 text-sm italic text-white/75">
              You can view the site with or without sound. Depending on your choice, the main page will load with radio on or off.
            </p>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-[70] w-72 rounded-xl border border-white/20 bg-gradient-to-b from-[#111a29]/95 to-[#090e16]/95 p-3 text-white shadow-xl backdrop-blur-md">
        <p className="font-[var(--font-bebas)] text-2xl tracking-wider text-white">SAY LEZ RADIO</p>
        <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70">Now playing</p>
        <p className="truncate text-sm text-white/95">{currentTrackName}</p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/95 text-[#101a2a] shadow"
            aria-label="Previous track"
            title="Previous"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M11 18V6l-8 6 8 6zm1-6 8 6V6l-8 6z"/></svg>
          </button>

          <button
            type="button"
            onClick={handleToggle}
            className="cursor-pointer inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white text-[#101a2a] shadow-lg"
            title={enabled ? "Pause radio" : "Play radio"}
            aria-label={enabled ? "Pause radio" : "Play radio"}
          >
            {enabled ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/95 text-[#101a2a] shadow"
            aria-label="Next track"
            title="Next"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M13 6v12l8-6-8-6zm-1 6-8-6v12l8-6z"/></svg>
          </button>
        </div>

        <div className="mt-3 rounded-md border border-white/20 bg-black/20 px-2 py-2">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-white"
            aria-label="Radio volume"
          />
        </div>
      </div>

      <audio ref={audioRef} onEnded={handleEnded} preload="none" />
    </>
  );
}
