import { useEffect, useRef } from "react";
import ambiance from "../assets/sounds/ambiance.mp3";
export default function BackgroundSound() {
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(ambiance);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Volume plus bas pour éviter d'être trop intrusif
    audioRef.current.preload = "auto"; // Précharge l'audio

    // Fonction pour tenter le démarrage automatique
    const attemptAutoplay = async () => {
      if (hasStartedRef.current) return;

      try {
        // Essaie de démarrer l'audio immédiatement
        await audioRef.current.play();
        hasStartedRef.current = true;
        console.log("🎵 Audio démarré automatiquement");
        return true;
      } catch (err) {
        console.log("⏸️ Autoplay bloqué, attente d'interaction utilisateur");

        return false;
      }
    };

    // Fonction pour démarrer après interaction
    const startAudioOnInteraction = async () => {
      if (hasStartedRef.current) return;

      try {
        await audioRef.current.play();
        hasStartedRef.current = true;
        console.log("🎵 Audio démarré après interaction");
        removeAllListeners();
      } catch (err) {
        console.warn("Erreur lecture audio :", err);
      }
    };

    const removeAllListeners = () => {
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("scroll", startAudioOnInteraction);
      document.removeEventListener("keydown", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
      document.removeEventListener("mousemove", startAudioOnInteraction);
      document.removeEventListener("mouseenter", startAudioOnInteraction);
      window.removeEventListener("focus", startAudioOnInteraction);
    };

    // Essaie d'abord l'autoplay
    attemptAutoplay().then((success) => {
      if (!success) {
        // Si l'autoplay échoue, attend la première interaction
        document.addEventListener("click", startAudioOnInteraction, { once: true });
        document.addEventListener("scroll", startAudioOnInteraction, { once: true });
        document.addEventListener("keydown", startAudioOnInteraction, { once: true });
        document.addEventListener("touchstart", startAudioOnInteraction, { once: true });
        document.addEventListener("mousemove", startAudioOnInteraction, { once: true });
        document.addEventListener("mouseenter", startAudioOnInteraction, { once: true });
        window.addEventListener("focus", startAudioOnInteraction, { once: true });
      }
    });

    // Gestion de la visibilité de l'onglet
    const handleVisibilityChange = () => {
      if (!audioRef.current || !hasStartedRef.current) return;

      if (document.hidden) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.warn);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      removeAllListeners();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}