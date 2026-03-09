import Link from "next/link"
import { Globe, ArrowRight } from "lucide-react"

interface VisaDestination {
  id: string
  negaraTujuan: string
  coverImage?: string | null
  flag?: string | null
  hargaDasar?: string | null
  masaBerlaku?: number | null
}

function formatRupiah(value: string | null | undefined): string {
  if (!value) return "-"
  const num = parseFloat(value)
  if (isNaN(num)) return value
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

export function RelatedVisaDestinations({
  destinations,
}: {
  destinations: VisaDestination[]
}) {
  if (!destinations || destinations.length === 0) return null

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-xs font-black text-[#0C3D4F] uppercase tracking-[0.2em] mb-8">
        Visa Terkait
      </h3>

      <div className="space-y-6">
        {destinations.map((dest) => (
          <Link
            href={`/?openVisa=${encodeURIComponent(dest.negaraTujuan)}#visa-solutions`}
            key={dest.id}
            className="flex gap-4 group items-start"
          >
            <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-2xl shadow-md bg-slate-100">
              {dest.flag ? (
                <img
                  src={dest.flag}
                  alt={dest.negaraTujuan}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300">
                  <Globe size={20} />
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black text-[#FC8039] uppercase tracking-widest mb-1">
                Visa
              </span>
              <h4 className="text-base font-bold text-[#0C3D4F] group-hover:text-[#FC8039] transition-colors line-clamp-2">
                {dest.negaraTujuan}
              </h4>
              <div className="flex flex-col gap-1 mt-2">
                {dest.masaBerlaku && (
                  <span className="text-xs font-bold text-slate-400">
                    Berlaku hingga {dest.masaBerlaku} Tahun
                  </span>
                )}
                {dest.hargaDasar && (
                  <span className="text-sm font-extrabold text-[#FC8039]">
                    {formatRupiah(dest.hargaDasar)}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                LIHAT DETAIL <ArrowRight size={10} className="ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
