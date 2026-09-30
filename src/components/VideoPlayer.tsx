import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  url: string;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    setLoading(true);
    setError("");

    // SAFARI / iOS (native HLS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.onloadedmetadata = () => setLoading(false);
      video.onerror = () =>
        setError("Unable to load video stream");
      return;
    }

    // CHROME / EDGE / FIREFOX
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError("Video playback error");
          hls.destroy();
        }
      });
    } else {
      setError("Your browser does not support video playback");
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden">
      {/* LOADING OVERLAY */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm z-10">
          Loading video…
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-red-400 text-sm z-10">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        playsInline
        onContextMenu={(e) => e.preventDefault()}
        className="w-full aspect-video bg-black"
      />
    </div>
  );
}
