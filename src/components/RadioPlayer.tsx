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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobileMin, setIsMobileMin] = useState(false);

  const currentTrack = useMemo(() => playlist[index], [playlist, index]);
  const preloadQueue = useMemo(() => {
    if (!playlist.length) return [] as string[];
    const picks: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const nextIdx = (index + i) % playlist.length;
      if (playlist[nextIdx]) picks.push(playlist[nextIdx]);
    }
    return Array.from(new Set(picks));
  }, [playlist, index]);

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
    const onExternalMediaPlay = () => {
      setEnabled(false);
      localStorage.setItem("saylez-radio-enabled", "false");
    };

    window.addEventListener("external-media-play", onExternalMediaPlay as EventListener);
    return () => window.removeEventListener("external-media-play", onExternalMediaPlay as EventListener);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) setIsMobileMin(window.scrollY > 140);
      else setIsMobileMin(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
    setCurrentTime(0);

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
    if (index < playlist.length - 1) return setIndex((prev) => prev + 1);
    setPlaylist(shuffle(radioTracks));
    setIndex(0);
  }

  function handlePrev() {
    if (!playlist.length) return;
    if (index > 0) return setIndex((prev) => prev - 1);
    setIndex(playlist.length - 1);
  }

  function handleSeek(value: number) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration) || duration <= 0) return;
    const nextTime = (value / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function formatTime(sec: number) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <>
      {showPrompt && pathname === "/" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/25 bg-[#11151b]/95 p-6 text-white shadow-2xl">
            <p className="font-[var(--font-bebas)] text-4xl tracking-wide">Say Lez Radio</p>
            <p className="mt-2 font-[var(--font-inter)] text-lg">View site with audio?</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => handleChoice(true)} className="cursor-pointer rounded-lg border border-white/40 px-5 py-2 font-[var(--font-inter)] font-semibold">Yes</button>
              <button type="button" onClick={() => handleChoice(false)} className="cursor-pointer rounded-lg border border-white/25 px-5 py-2 font-[var(--font-inter)]">No</button>
            </div>
            <p className="mt-4 text-sm italic text-white/75">You can view the site with or without sound. Depending on your choice, the main page will load with radio on or off.</p>
          </div>
        </div>
      )}

      <div className={`fixed z-[70] rounded-xl border border-white/20 bg-gradient-to-b from-[#111a29]/95 to-[#090e16]/95 text-white shadow-xl backdrop-blur-md transition-all duration-300 ${isMobileMin ? "bottom-3 right-3 w-44 p-2" : "bottom-3 right-1/2 w-[92vw] max-w-sm translate-x-1/2 p-3 md:bottom-5 md:right-5 md:w-72 md:max-w-none md:translate-x-0"}`}>
        <p className="font-[var(--font-bebas)] text-xl tracking-wider text-white md:text-2xl">SAY LEZ RADIO</p>
        {!isMobileMin && (
          <>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70">Now playing</p>
            <p className="text-sm leading-tight text-white/95 break-words">{currentTrackName}</p>

            <div className="mt-2 rounded-md border border-white/20 bg-black/20 px-2 py-2">
              <input type="range" min={0} max={100} step={0.1} value={duration > 0 ? (currentTime / duration) * 100 : 0} onChange={(e) => handleSeek(Number(e.target.value))} className="h-1.5 w-full cursor-pointer accent-white" aria-label="Track progress" />
              <div className="mt-1 flex justify-between text-[10px] text-white/70"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
            </div>
          </>
        )}

        <div className="mt-2 flex items-center justify-center gap-2 md:gap-3">
          <button type="button" onClick={handlePrev} className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/95 text-[#101a2a] shadow" aria-label="Previous track" title="Previous"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M11 18V6l-8 6 8 6zm1-6 8 6V6l-8 6z"/></svg></button>
          <button type="button" onClick={handleToggle} className="cursor-pointer inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/40 bg-white text-[#101a2a] shadow-lg" title={enabled ? "Pause radio" : "Play radio"} aria-label={enabled ? "Pause radio" : "Play radio"}>{enabled ? <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg> : <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>}</button>
          <button type="button" onClick={handleNext} className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/95 text-[#101a2a] shadow" aria-label="Next track" title="Next"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M13 6v12l8-6-8-6zm-1 6-8-6v12l8-6z"/></svg></button>
        </div>

        {!isMobileMin && (
          <div className="mt-3 rounded-md border border-white/20 bg-black/20 px-2 py-1.5">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-white/85" aria-hidden="true"><path d="M3 10v4h4l5 4V6l-5 4H3z"/><path d="M14.5 9.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-white/85"/></svg>
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-1 w-full cursor-pointer accent-white" aria-label="Radio volume" />
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-white/85" aria-hidden="true"><path d="M3 10v4h4l5 4V6l-5 4H3z"/><path d="M14 8a5 5 0 0 1 0 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-white/85"/><path d="M17 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-white/85"/></svg>
            </div>
          </div>
        )}
      </div>

      {preloadQueue.map((src) => (
        <audio key={src} src={src} preload="auto" className="hidden" aria-hidden="true" />
      ))}

      <audio
        ref={audioRef}
        onEnded={handleNext}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        preload="auto"
      />
    </>
  );
}
