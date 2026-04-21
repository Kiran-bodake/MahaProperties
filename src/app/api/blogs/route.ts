import blogs from "@/moc-data/blogs.json";  

export async function GET() {
  return Response.json(blogs);
}