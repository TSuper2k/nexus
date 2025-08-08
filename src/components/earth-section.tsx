import React from "react";

export function EarthSection({
  showGlobe,
  children,
}: {
  showGlobe: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      id="earth-section"
      className="min-h-screen flex items-center justify-center relative bg-black"
    >
      <div className="w-full h-full flex items-center justify-center">
        {showGlobe && (
          <div className="w-[500px] h-[500px] flex items-center justify-center">
            {children}
          </div>
        )}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white text-xl">
          Bạn có thể tương tác với Trái Đất tại đây!
        </div>
      </div>
    </section>
  );
}
