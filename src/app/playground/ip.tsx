"use client";

import { useQuery } from "@tanstack/react-query";

export default function IPChecker() {
  // 1. Use `useQuery` to fetch data from /api/ip
  const { data, isLoading, error } = useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const res = await fetch("/api/ip");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json(); // should return { ip, geoData } or similar
    },
  });

  if (isLoading) return <div>Loading IP info...</div>;
  if (error) return <div>Failed to fetch IP info</div>;

  // 2. If successful, data might look like { ip: "...", geoData: { ... } }
  return (
    <div>
      <p>IP: {data.ip}</p>
      <pre>{JSON.stringify(data.geoData, null, 2)}</pre>
    </div>
  );
}
