"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setWidth(30);
    const t1 = setTimeout(() => setWidth(70), 200);
    const t2 = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setLoading(false);
        setWidth(0);
      }, 300);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, searchParams]);

  if (!loading && width === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[99999] pointer-events-none">
      <div
        className="h-full bg-[#2563eb] transition-all duration-300 ease-out shadow-[0_0_10px_#2563eb]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}