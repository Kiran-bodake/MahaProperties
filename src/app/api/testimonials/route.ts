import testimonials from "@/moc-data/testimonials.json";

export async function GET() {
  return Response.json(testimonials);
}
