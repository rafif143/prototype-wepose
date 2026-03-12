import Navbar from "@/shared/layout/Navbar"
import Footer from "@/shared/layout/Footer"
import BlogListClient from "@/features/blog/components/BlogListClient"

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <BlogListClient />
      <Footer />
    </>
  )
}