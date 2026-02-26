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

  function handleEnded() {
    if (!playlist.length) return;

    if (index < playlist.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    const reshuffled = shuffle(radioTracks);
    setPlaylist(reshuffled);
    setIndex(0);
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

      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleToggle}
          className="cursor-pointer inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-[#10141b]/85 text-white shadow-xl backdrop-blur-md"
          title={enabled ? "Radio on" : "Radio off"}
          aria-label={enabled ? "Turn radio off" : "Turn radio on"}
        >
          {enabled ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M14 3.23v2.06a7 7 0 0 1 0 13.42v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.55 2.62l1.51 1.51A8.9 8.9 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.73 4.73c-.75.58-1.66 1.02-2.73 1.26v2.06a8.95 8.95 0 0 0 4.31-1.98L19.73 21 21 19.73 12 10.73 4.27 3z" />
            </svg>
          )}
        </button>

        <div className="w-24 rounded-md border border-white/25 bg-[#10141b]/85 px-2 py-1 text-white shadow-xl backdrop-blur-md">
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
