'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
}

export default function HeartParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []
    const particleCount = 8

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 60 - 30,
        delay: i * 0.1,
        duration: 1 + Math.random() * 0.5,
        size: 12 + Math.random() * 8
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="heart-particle"
            style={{
              '--x-offset': `${particle.x}px`,
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            } as React.CSSProperties}
          >
            <svg
              width={particle.size}
              height={particle.size}
              viewBox="0 0 24 24"
              fill="var(--g360-accent)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
      ))}

      <style jsx>{`
        .heart-particle {
          position: absolute;
          opacity: 0;
          animation: floatUp var(--duration) ease-out forwards;
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0);
          }
          15% {
            opacity: 1;
            transform: translateY(-20px) translateX(calc(var(--x-offset) * 0.2)) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) translateX(var(--x-offset)) scale(0.3);
          }
        }
      `}</style>
    </div>
  )
}
