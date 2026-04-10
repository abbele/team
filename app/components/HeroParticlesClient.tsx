'use client';

import dynamic from 'next/dynamic';

const HeroParticles = dynamic(() => import('./HeroParticles'), { ssr: false });

export default function HeroParticlesClient() {
  return <HeroParticles />;
}
