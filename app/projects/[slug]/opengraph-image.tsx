import { ImageResponse } from "next/og";
import { portfolioProjects } from "@/lib/content";

export const alt = "Metadox Projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background:
            "linear-gradient(135deg, #03153b 0%, #173d8b 52%, #015ee8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="66" height="66" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="15" fill="rgba(255,255,255,0.10)" />
            <path
              d="M16 46 L16 20 L32 40 L48 20 L48 46"
              stroke="#9ec2ff"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ color: "#fff", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}
            >
              METADOX
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 15,
                letterSpacing: 4,
              }}
            >
              {(project?.category ?? "PROJECTS").toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", maxWidth: 940 }}>
          <span
            style={{
              color: "#fff",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            {project?.name ?? "Projects"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", maxWidth: 980 }}>
          <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 26 }}>
            {project?.description ?? "Real problems, solved for real clients."}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
