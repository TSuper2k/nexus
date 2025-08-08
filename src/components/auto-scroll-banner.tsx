import React, { useRef, useEffect, useState } from "react";

interface BannerItem {
  text: string;
  url?: string;
}

interface AutoScrollBannerProps {
  items: BannerItem[];
  speed?: number; // px per second
  hoverSpeed?: number; // px per second khi hover
}

export const AutoScrollBanner: React.FC<AutoScrollBannerProps> = ({
  items,
  speed = 60,
  hoverSpeed = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  // Lưu lại vị trí và thời điểm khi đổi tốc độ
  const lastState = useRef<{
    timestamp: number;
    offset: number;
    speed: number;
  }>({ timestamp: 0, offset: 0, speed });

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let animationFrame: number;
    const contentWidth = content.scrollWidth;

    function step(timestamp: number) {
      if (!lastState.current.timestamp) {
        lastState.current.timestamp = timestamp;
        lastState.current.offset = 0;
        lastState.current.speed = isHover ? hoverSpeed : speed;
      }
      // Nếu tốc độ thay đổi, cập nhật lại offset và timestamp
      const currentSpeed = isHover ? hoverSpeed : speed;
      if (currentSpeed !== lastState.current.speed) {
        lastState.current.offset = getCurrentOffset(timestamp);
        lastState.current.timestamp = timestamp;
        lastState.current.speed = currentSpeed;
      }
      const elapsed = (timestamp - lastState.current.timestamp) / 1000;
      const translateX =
        -(lastState.current.offset + elapsed * currentSpeed) % contentWidth;
      if (content) {
        content.style.transform = `translateX(${translateX}px)`;
      }
      animationFrame = requestAnimationFrame(step);
    }

    function getCurrentOffset(timestamp: number) {
      const elapsed = (timestamp - lastState.current.timestamp) / 1000;
      return lastState.current.offset + elapsed * lastState.current.speed;
    }

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [items, speed, hoverSpeed, isHover]);

  // Xử lý hover cho từng item
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-gradient-to-r from-cyan-500/30 to-purple-500/30 py-3"
      style={{ position: "relative" }}
    >
      <div
        ref={contentRef}
        className="flex whitespace-nowrap gap-8 text-lg font-semibold text-white px-4"
        style={{ willChange: "transform" }}
      >
        {items.concat(items).map((item, idx) =>
          item.url ? (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="hover:underline cursor-pointer"
            >
              {item.text}
            </a>
          ) : (
            <span
              key={idx}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "default" }}
            >
              {item.text}
            </span>
          )
        )}
      </div>
    </div>
  );
};
