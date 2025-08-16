import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlobeContextType {
  isGlobeMounted: boolean;
  isGlobeVisible: boolean;
  mountGlobe: () => void;
  unmountGlobe: () => void;
  setGlobeVisible: (visible: boolean) => void;
}

const GlobeContext = createContext<GlobeContextType | undefined>(undefined);

interface GlobeProviderProps {
  children: ReactNode;
}

export const GlobeProvider: React.FC<GlobeProviderProps> = ({ children }) => {
  const [isGlobeMounted, setIsGlobeMounted] = useState(false);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const [mountTimeout, setMountTimeout] = useState<NodeJS.Timeout | null>(null);
  const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);

  const mountGlobe = () => {
    if (mountTimeout) {
      clearTimeout(mountTimeout);
    }
    
    const timer = setTimeout(() => {
      setIsGlobeMounted(true);
      // Delay visibility để đảm bảo component đã mount hoàn toàn
      const visibilityTimer = setTimeout(() => {
        setIsGlobeVisible(true);
      }, 100);
      setVisibilityTimeout(visibilityTimer);
    }, 200);
    
    setMountTimeout(timer);
  };

  const unmountGlobe = () => {
    setIsGlobeVisible(false);
    
    if (visibilityTimeout) {
      clearTimeout(visibilityTimeout);
    }
    
    // Delay unmount để animation có thể hoàn thành
    const timer = setTimeout(() => {
      setIsGlobeMounted(false);
    }, 300);
    
    setMountTimeout(timer);
  };

  const setGlobeVisible = (visible: boolean) => {
    setIsGlobeVisible(visible);
  };

  useEffect(() => {
    // Auto mount globe khi provider được khởi tạo
    mountGlobe();

    return () => {
      if (mountTimeout) {
        clearTimeout(mountTimeout);
      }
      if (visibilityTimeout) {
        clearTimeout(visibilityTimeout);
      }
    };
  }, []);

  const value: GlobeContextType = {
    isGlobeMounted,
    isGlobeVisible,
    mountGlobe,
    unmountGlobe,
    setGlobeVisible,
  };

  return (
    <GlobeContext.Provider value={value}>
      {children}
    </GlobeContext.Provider>
  );
};

export const useGlobe = (): GlobeContextType => {
  const context = useContext(GlobeContext);
  if (context === undefined) {
    throw new Error('useGlobe must be used within a GlobeProvider');
  }
  return context;
};
