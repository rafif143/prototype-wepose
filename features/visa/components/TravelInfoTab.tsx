"use client";

import { 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  PhoneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import type { VisaData } from "@/features/visa/lib/data";

interface TravelInfoTabProps {
  visa: VisaData;
}

export function TravelInfoTab({ visa }: TravelInfoTabProps) {
  // Generate travel tips based on country
  const getTravelTips = (country: string) => {
    const commonTips = [
      {
        icon: MapPinIcon,
        title: "Dokumen Perjalanan",
        description: "Selalu bawa paspor asli, visa, dan fotokopi dokumen penting. Simpan di tempat terpisah sebagai backup."
      },
      {
        icon: ClockIcon,
        title: "Waktu Kedatangan",
        description: "Datang minimal 3 jam sebelum penerbangan internasional. Pastikan visa sudah terbit sebelum berangkat."
      },
      {
        icon: CurrencyDollarIcon,
        title: "Mata Uang & Keuangan",
        description: "Siapkan mata uang lokal atau kartu kredit internasional. Informasikan bank tentang rencana perjalanan."
      },
      {
        icon: PhoneIcon,
        title: "Komunikasi",
        description: "Aktifkan roaming atau beli SIM card lokal. Simpan nomor darurat kedutaan Indonesia di negara tujuan."
      }
    ];

    // Add country-specific tips
    const countrySpecific = {
      "Prancis": [
        {
          icon: ExclamationTriangleIcon,
          title: "Area Schengen",
          description: "Dengan visa Schengen, kamu bisa mengunjungi 27 negara. Pastikan tidak melebihi batas 90 hari dalam 180 hari."
        },
        {
          icon: InformationCircleIcon,
          title: "Asuransi Wajib",
          description: "Asuransi perjalanan minimal €30.000 wajib untuk visa Schengen. Pastikan coverage mencakup medical emergency."
        }
      ],
      "Jepang": [
        {
          icon: ExclamationTriangleIcon,
          title: "Budaya Lokal",
          description: "Hormati budaya Jepang dengan tidak makan sambil berjalan dan selalu bungkuk saat bertemu orang."
        },
        {
          icon: InformationCircleIcon,
          title: "JR Pass",
          description: "Pertimbangkan membeli JR Pass untuk transportasi kereta yang lebih hemat jika bepergian antar kota."
        }
      ],
      "Korea Selatan": [
        {
          icon: ExclamationTriangleIcon,
          title: "K-ETA",
          description: "Meskipun punya visa, pastikan juga apply K-ETA (Korea Electronic Travel Authorization) sebelum berangkat."
        },
        {
          icon: InformationCircleIcon,
          title: "T-money Card",
          description: "Beli T-money card untuk transportasi umum di Seoul. Lebih praktis dan hemat daripada tiket satuan."
        }
      ],
      "Australia": [
        {
          icon: ExclamationTriangleIcon,
          title: "Karantina Ketat",
          description: "Australia memiliki aturan karantina sangat ketat. Jangan bawa makanan, tanaman, atau produk hewani."
        },
        {
          icon: InformationCircleIcon,
          title: "Musim Terbalik",
          description: "Musim di Australia terbalik dengan Indonesia. Desember-Februari adalah musim panas."
        }
      ],
      "Amerika Serikat": [
        {
          icon: ExclamationTriangleIcon,
          title: "ESTA & Visa",
          description: "Pastikan visa B1/B2 masih berlaku. Jika transit di negara lain, cek apakah perlu visa transit."
        },
        {
          icon: InformationCircleIcon,
          title: "Tip Culture",
          description: "Budaya tip sangat umum di AS. Berikan tip 15-20% di restoran dan 10-15% untuk layanan lainnya."
        }
      ],
      "Inggris": [
        {
          icon: ExclamationTriangleIcon,
          title: "Brexit Impact",
          description: "Setelah Brexit, UK tidak lagi bagian dari EU. Visa UK terpisah dari visa Schengen."
        },
        {
          icon: InformationCircleIcon,
          title: "Oyster Card",
          description: "Gunakan Oyster Card atau contactless payment untuk transportasi umum di London."
        }
      ]
    };

    return [...commonTips, ...(countrySpecific[country] || [])];
  };

  const travelTips = getTravelTips(visa.country);

  return (
    <div id="travel-info" className="space-y-6">
      <h3 className="font-poppins font-semibold text-2xl text-navy mb-6">Lengkapi Perjalananmu</h3>

      <div className="grid gap-4 md:gap-6">
        {travelTips.map((tip, index) => {
          const IconComponent = tip.icon;
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-orange" />
                </div>
                <div className="flex-1">
                  <h4 className="font-poppins font-semibold text-base text-navy mb-2">{tip.title}</h4>
                  <p className="font-dm-sans text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <PhoneIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-base text-navy mb-2">Kontak Darurat</h4>
            <div className="space-y-1 text-sm text-gray-600 font-dm-sans">
              <p><span className="font-medium">Kedutaan Indonesia:</span> Cari nomor kedutaan RI di negara tujuan</p>
              <p><span className="font-medium">Wepose Support:</span> +62 812-3456-7890 (24/7)</p>
              <p><span className="font-medium">Emergency:</span> 112 (Eropa) | 911 (AS) | 000 (Australia)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}