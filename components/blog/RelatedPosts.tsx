import Link from "next/link"
import { ArrowRight, Globe } from "lucide-react"

interface Blog {
  id: string
  slug: string
  title: string
  categoryId?: string
  coverImage?: string | null
}

export function RelatedPosts({
  posts,
  categories = [],
}: {
  posts: Blog[]
  categories?: any[]
}) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-xs font-black text-[#0C3D4F] uppercase tracking-[0.2em] mb-8">
        Panduan Lainnya
      </h3>

      <div className="space-y-8">
        {posts.map((post) => {
          const catName =
            categories.find((c) => c.id === post.categoryId)?.name || "Article"
          return (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="flex gap-4 group items-start"
            >
              <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-2xl shadow-md bg-slate-100">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Globe size={20} />
                  </div>
                )}
              </div>

              <div className="flex flex-col pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black text-[#FC8039] uppercase tracking-widest">
                    {catName}
                  </span>
                </div>
                <h4 className="text-[13px] font-bold text-[#0C3D4F] group-hover:text-[#FC8039] line-clamp-2 transition-colors">
                  {post.title}
                </h4>
                <div className="mt-2 flex items-center text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  LIHAT DETAIL <ArrowRight size={10} className="ml-1" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
