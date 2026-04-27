import blogs from "@/moc-data/blogs.json";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const blog = blogs.find((b) => b.s === slug);
  if (!blog) return notFound();

  // 🔥 RELATED BLOGS (same category, exclude current)
  const related = blogs
    .filter((b) => b.cat === blog.cat && b.s !== blog.s)
    .slice(0, 3);

  return (
    <div style={{ background: "#f9fafb", padding: "60px 0" }}>
      <div style={{ maxWidth: "900px", margin: "auto", padding: "0 20px" }}>
        {/* 🧭 BREADCRUMB */}
        <div
          style={{ fontSize: "14px", marginBottom: "20px", color: "#6b7280" }}
        >
          <Link href="/" style={{ color: "#6b7280" }}>
            Home
          </Link>{" "}
          {" > "}
          <Link href="/blogs" style={{ color: "#6b7280" }}>
            Blogs
          </Link>{" "}
          {" > "}
          <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{blog.t}</span>
        </div>

        {/* CATEGORY */}
        <span
          style={{
            background: "#fef3c7",
            color: "#d97706",
            padding: "5px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {blog.cat}
        </span>

        {/* TITLE */}
        <h1
          style={{
            fontFamily: "var(--font-syne,Syne,serif)",
            fontSize: "2.2rem",
            fontWeight: 900,
            margin: "15px 0",
            color: "#1a1a2e",
          }}
        >
          {blog.t}
        </h1>

        {/* META */}
        <p style={{ color: "#9ca3af", marginBottom: "20px" }}>
          {blog.d} • {blog.r}
        </p>

        {/* IMAGE */}
        <img
          src={blog.img}
          alt={blog.t}
          style={{
            width: "100%",
            borderRadius: "16px",
            marginBottom: "25px",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#374151",
            marginBottom: "50px",
          }}
        >
          {blog.excerpt}
        </div>

        {/* 🔥 RELATED BLOGS */}
        {related.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-syne,Syne,serif)",
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "20px",
                color: "#1a1a2e",
              }}
            >
              Related Articles
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
                gap: "20px",
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
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 10px rgba(0,0,0,0.05)";
                    }}
                  >
                    <img
                      src={b.img}
                      alt={b.t}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ padding: "12px" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: 700 }}>
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
    </div>
  );
}
