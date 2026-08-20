import { useRef, useState } from 'react'

const SF = '#00FFA3'

// Main VSL lives at public/vsl.mp4 — drop the file in and it appears automatically.
// Source video must be H.264 8-bit MP4 with faststart; HEVC/10-bit will not play in Chrome or Firefox.
// Vertical (selfie-style) VSLs pass their own `src` and `vertical`.
// Poster defaults to the video's name + "-poster.jpg" (/vsl.mp4 -> /vsl-poster.jpg).
// A poster that doesn't exist yet is ignored by the browser, so this is safe to leave.
export default function VSL({ src = '/vsl.mp4', poster = src.replace(/\.mp4$/, '-poster.jpg'), vertical = false }) {
  const videoRef = useRef(null)
  const [unmuted, setUnmuted] = useState(false)
  const [videoMissing, setVideoMissing] = useState(false)

  function handleUnmute() {
    const v = videoRef.current
    if (!v) return
    // First unmute restarts the video from the beginning, with sound on
    v.currentTime = 0
    v.muted = false
    v.play()
    setUnmuted(true)
  }

  const wrapperClass = vertical ? 'relative mx-auto shrink-0' : 'relative w-full max-w-4xl mx-auto'
  const wrapperStyle = vertical
    ? { aspectRatio: '9/16', height: 'min(64vh, 600px)' }
    : { aspectRatio: '16/9' }

  return (
    <div
      className={wrapperClass}
      style={{
        ...wrapperStyle,
        background: '#000',
        border: '1px solid rgba(0,255,163,0.25)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(0,255,163,0.10)',
      }}
    >
      {videoMissing ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,163,0.07) 0%, rgba(5,5,8,0.96) 70%)' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(0,255,163,0.14)',
              border: '1.5px solid rgba(0,255,163,0.45)',
            }}
          >
            <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '18px solid #00FFA3', marginLeft: 4 }} />
          </div>
          <p className="font-barlow-condensed font-700 text-bone tracking-[0.12em] uppercase text-center" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.35rem)' }}>
            Video Coming Soon
          </p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={unmuted}
            onError={() => setVideoMissing(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {!unmuted && (
            <button
              onClick={handleUnmute}
              className="absolute inset-0 flex items-center justify-center cursor-pointer px-3"
              style={{ background: 'rgba(0,0,0,0.25)' }}
              aria-label="Unmute video"
            >
              <span
                className={`flash-box flex items-center gap-2 font-barlow-condensed font-700 tracking-[0.12em] uppercase text-center ${vertical ? 'px-4 py-3' : 'px-8 py-5'}`}
                style={{
                  background: 'rgba(5,5,8,0.85)',
                  border: `2px solid ${SF}`,
                  borderRadius: 12,
                  color: '#f7f7f8',
                  fontSize: vertical ? 'clamp(0.75rem, 1.6vw, 1rem)' : 'clamp(1rem, 2vw, 1.4rem)',
                }}
              >
                <span style={{ fontSize: '1.4em' }}>🔊</span>
                Click To Unmute &amp; Hear The Video
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}
