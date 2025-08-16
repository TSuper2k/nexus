import React, { Suspense, lazy } from 'react';
import { useGlobe } from './globe-context';

// Lazy load GlobeScene component
const GlobeScene = lazy(() => import('./globe-scene'));

interface LazyGlobeSceneProps {
  className?: string;
}

const LazyGlobeScene: React.FC<LazyGlobeSceneProps> = ({ className }) => {
  const { isGlobeMounted, isGlobeVisible } = useGlobe();

  if (!isGlobeMounted) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="animate-pulse bg-gray-800 rounded-full w-64 h-64 opacity-50" />
      </div>
    );
  }

  return (
    <div 
      className={`${className} transition-opacity duration-700 ${
        isGlobeVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400"></div>
        </div>
      }>
        <GlobeScene />
      </Suspense>
    </div>
  );
};

export default LazyGlobeScene;
