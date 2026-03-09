"use client"

import { Globe2, User2, Eye } from "lucide-react"
import { useMemo } from "react"

interface BlogWithAuthor {
  id: string
  title: string
  categoryId?: string
  views?: number
  author?: {
    name?: string
    username?: string
  }
}

export function BlogSidebar({
  post,
  categories = [],
}: {
  post: BlogWithAuthor
  categories?: any[]
}) {
  if (!post) return null

  const categoryName = useMemo(() => {
    const found = categories.find((c) => c.id === post.categoryId)
    return found ? found.name : "Umum"
  }, [post.categoryId, categories])

  const authorDisplay =
    post.author?.name || post.author?.username || "admin_wepose"

  const infoItems = [
    {
      icon: <User2 size={16} />,
      label: "Penulis",
      value: authorDisplay,
    },
    {
      icon: <Globe2 size={16} />,
      label: "Kategori",
      value: categoryName,
    },
    {
      icon: <Eye size={16} />,
      label: "Dilihat",
      value: `${(post.views || 31).toLocaleString("id-ID")} kali`,
    },
  ]

  return (
    <aside className="space-y-8">
      <div className="bg-[#0C3D4F] p-10 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Globe2 size={160} className="text-white" />
        </div>

        <h3 className="text-xs font-black text-[#FC8039] uppercase tracking-[0.3em] mb-6 relative z-10">
          Detail Panduan
        </h3>

        <div className="space-y-6 relative z-10">
          {infoItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group/item">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#FC8039] group-hover/item:bg-[#FC8039] group-hover/item:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
