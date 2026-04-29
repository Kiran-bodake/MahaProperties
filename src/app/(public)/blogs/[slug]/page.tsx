import blogs from "@/moc-data/blogs.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer";

type Blog = {
  s: string;
  t: string;
  excerpt: string;
  content: string;
  cat: string;
  d: string;
  r: string;
  img: string;
  feat: boolean;
};

export function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.s,
  }));
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.s === slug);
  if (!blog) return notFound();

  const related = blogs
    .filter((b) => b.cat === blog.cat && b.s !== blog.s)
    .slice(0, 3);

  return (
    <>
      <MegaNavbar />
      <main>
        <div style={{ background: "#f9fafb" }}>
          {/* HERO */}
          <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
            {/* BREADCRUMB */}
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "10px",
              }}
            >
              <Link href="/">Home</Link> {" > "}
              <Link href="/blogs">Blogs</Link> {" > "}
              <span style={{ fontWeight: 600 }}>{blog.t}</span>
            </div>

            {/* CATEGORY */}
            <span
              style={{
                background: "#fef3c7",
                color: "#b45309",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              {blog.cat}
            </span>

            {/* TITLE */}
            <h1
              style={{
                fontFamily: "var(--font-syne,Syne,serif)",
                fontSize: "clamp(1.6rem, 5vw, 2.4rem)", // ✅ responsive
                fontWeight: 900,
                margin: "10px 0",
                lineHeight: 1.3,
                color: "#111827",
              }}
            >
              {blog.t}
            </h1>

            {/* META */}
            <p
              style={{
                color: "#9ca3af",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {blog.d} • {blog.r}
            </p>

            {/* IMAGE */}
            <div style={{ borderRadius: "16px", overflow: "hidden" }}>
              <img
                src={blog.img}
                alt={blog.t}
                style={{
                  width: "100%",
                  height: "clamp(220px, 40vw, 420px)", // ✅ responsive height
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* CONTENT */}
          <div
            style={{
              maxWidth: "720px",
              margin: "auto",
              padding: "30px 20px 50px",
              fontSize: "clamp(14px, 1.2vw, 17px)", // ✅ responsive text
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            {blog.excerpt.split(". ").map((p, i) => (
              <p key={i} style={{ marginBottom: "16px" }}>
                {p}.
              </p>
            ))}
          </div>

          {/* RELATED BLOGS */}
          {related.length > 0 && (
            <div
              style={{
                maxWidth: "1100px",
                margin: "auto",
                padding: "0 20px 60px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-syne,Syne,serif)",
                  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                  fontWeight: 800,
                  marginBottom: "20px",
                  color: "#111827",
                }}
              >
                Related Articles
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", // ✅ responsive grid
                  gap: "16px",
                }}
              >
                {related.map((b) => (
                  <Link
                    key={b.s}
                    href={`/blogs/${b.s}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: "1px solid #eee",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        transition: "0.3s",
                      }}
                    >
                      <img
                        src={b.img}
                        alt={b.t}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                        }}
                      />

                      <div style={{ padding: "12px" }}>
                        <h3
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            marginBottom: "6px",
                            color: "#111827",
                          }}
                        >
                          {b.t}
                        </h3>

                        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                          {b.d} • {b.r}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
