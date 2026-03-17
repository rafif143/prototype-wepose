import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const offices = [
  {
    name: "WEPOSE TRAVEL",
    city: "Jakarta",
    address: "Jl. Daan Mogot samping Foxlite Hotel KM 1, No 1, RT.11/RW.4, Jelambar, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470",
    phone: "628787654290",
    email: "weposetravel@gmail.com",
    hours: "Sen-Jum: 09:00 - 17:00"
  },
  {
    name: "WEPOSE TRAVEL",
    city: "Surabaya", 
    address: "Jl. KH Abdul Wahab Siamin Surabaya No.Kav 9-10, Dukuh Pakis, Kec. Dukuhpakis, Kota Surabaya, Jawa Timur 60226",
    phone: "6231555556789",
    email: "surabaya@weposetravel.com",
    hours: "Sen-Jum: 09:00 - 17:00"
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda dengan layanan visa terbaik
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {offices.map((office, index) => (
            <div key={index} className="max-w-lg mx-auto lg:mx-0 flex flex-col h-full">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-t-2xl h-48 mb-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPinIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Peta Lokasi {office.city}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 p-6 flex-1 flex flex-col">
                {/* Company Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{office.name}</h3>
                    <p className="text-sm text-gray-500">{office.city}</p>
                  </div>
                </div>

                {/* Contact Details - Flex grow to fill space */}
                <div className="flex-1 space-y-4 mb-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1">
                      <MapPinIcon className="w-full h-full" />
                    </div>
                    <div className="min-h-[80px] flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ALAMAT</p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1">
                      <PhoneIcon className="w-full h-full" />
                    </div>
                    <div className="min-h-[40px] flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">TELEPON</p>
                      <a 
                        href={`tel:${office.phone}`} 
                        className="text-navy font-semibold hover:text-orange transition-colors text-sm"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1">
                      <EnvelopeIcon className="w-full h-full" />
                    </div>
                    <div className="min-h-[40px] flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">EMAIL</p>
                      <a 
                        href={`mailto:${office.email}`} 
                        className="text-navy font-semibold hover:text-orange transition-colors text-sm break-words"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1">
                      <ClockIcon className="w-full h-full" />
                    </div>
                    <div className="min-h-[40px] flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">JAM OPERASIONAL</p>
                      <p className="text-navy font-semibold text-sm">{office.hours}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button - Always at bottom */}
                <div className="mt-auto">
                  <a
                    href={`https://wa.me/${office.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    CHAT WHATSAPP
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}