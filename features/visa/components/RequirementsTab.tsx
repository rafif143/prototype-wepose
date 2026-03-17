"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ExclamationTriangleIcon, FolderIcon, UserIcon, BriefcaseIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import type { VisaData } from "@/features/visa/lib/data";

interface RequirementsTabProps {
  visa: VisaData;
}

type ProfileType = 'employee' | 'entrepreneur' | 'student';

interface ApplicantCriteria {
  maritalStatus: string;
  ageRange: string;
  sponsorStatus: string;
  invitationStatus: string;
}

export function RequirementsTab({ visa }: RequirementsTabProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>('employee');
  const [openCategories, setOpenCategories] = useState<string[]>(['Dokumen Pribadi']);
  const [criteria, setCriteria] = useState<ApplicantCriteria>({
    maritalStatus: '',
    ageRange: '',
    sponsorStatus: '',
    invitationStatus: ''
  });

  const profiles = [
    { id: 'employee' as ProfileType, icon: UserIcon, label: 'Karyawan' },
    { id: 'entrepreneur' as ProfileType, icon: BriefcaseIcon, label: 'Wiraswasta' },
    { id: 'student' as ProfileType, icon: AcademicCapIcon, label: 'Pelajar/Mahasiswa' },
  ];

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const updateCriteria = (field: keyof ApplicantCriteria, value: string) => {
    setCriteria(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="requirements" className="space-y-8">
      <div>
        <h3 className="font-poppins font-semibold text-2xl text-navy mb-4">Persyaratan Dokumen</h3>

        {/* Alert */}
        <div className="bg-orange-50 border-l-4 border-orange rounded-r-xl p-4 mb-6">
          <div className="flex gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="font-dm-sans text-sm text-gray-700">
              Persyaratan dapat berbeda tergantung status pernikahan, pekerjaan, dan usia pemohon. Pilih profilmu di bawah untuk persyaratan yang relevan.
            </p>
          </div>
        </div>

        {/* Kriteria Pemohon */}
        <div className="mb-8">
          <h4 className="font-poppins font-semibold text-lg text-navy mb-4">Kriteria Pemohon</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Pernikahan */}
            <div className="space-y-3">
              <label className="block font-dm-sans font-medium text-sm text-gray-700">Status Pernikahan</label>
              <select 
                value={criteria.maritalStatus}
                onChange={(e) => updateCriteria('maritalStatus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-sm text-navy focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
              >
                <option value="">Pilih status pernikahan</option>
                <option value="single">Belum Menikah</option>
                <option value="married">Menikah</option>
                <option value="divorced">Cerai</option>
                <option value="widowed">Janda/Duda</option>
              </select>
            </div>

            {/* Status Umur */}
            <div className="space-y-3">
              <label className="block font-dm-sans font-medium text-sm text-gray-700">Rentang Umur</label>
              <select 
                value={criteria.ageRange}
                onChange={(e) => updateCriteria('ageRange', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-sm text-navy focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
              >
                <option value="">Pilih rentang umur</option>
                <option value="under-18">Di bawah 18 tahun</option>
                <option value="18-25">18-25 tahun</option>
                <option value="26-35">26-35 tahun</option>
                <option value="36-50">36-50 tahun</option>
                <option value="over-50">Di atas 50 tahun</option>
              </select>
            </div>

            {/* Status Sponsor */}
            <div className="space-y-3">
              <label className="block font-dm-sans font-medium text-sm text-gray-700">Status Sponsor</label>
              <select 
                value={criteria.sponsorStatus}
                onChange={(e) => updateCriteria('sponsorStatus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-sm text-navy focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
              >
                <option value="">Pilih status sponsor</option>
                <option value="self-funded">Biaya Sendiri</option>
                <option value="family-sponsor">Sponsor Keluarga</option>
                <option value="company-sponsor">Sponsor Perusahaan</option>
                <option value="government-sponsor">Sponsor Pemerintah</option>
                <option value="scholarship">Beasiswa</option>
              </select>
            </div>

            {/* Status Undangan */}
            <div className="space-y-3">
              <label className="block font-dm-sans font-medium text-sm text-gray-700">Status Undangan</label>
              <select 
                value={criteria.invitationStatus}
                onChange={(e) => updateCriteria('invitationStatus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-sm text-navy focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
              >
                <option value="">Pilih status undangan</option>
                <option value="no-invitation">Tidak Ada Undangan</option>
                <option value="family-invitation">Undangan Keluarga</option>
                <option value="friend-invitation">Undangan Teman</option>
                <option value="business-invitation">Undangan Bisnis</option>
                <option value="event-invitation">Undangan Acara</option>
                <option value="official-invitation">Undangan Resmi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Profile Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <motion.button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedProfile === profile.id
                    ? 'border-orange bg-orange-50 scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  selectedProfile === profile.id ? 'text-orange' : 'text-gray-400'
                }`} />
                <p className="font-poppins font-semibold text-base text-navy">{profile.label}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Requirements Accordion */}
        <div className="space-y-3">
          {Object.entries(visa.requirements).map(([category, docs]) => {
            const isOpen = openCategories.includes(category);
            
            return (
              <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FolderIcon className="w-5 h-5 text-orange" />
                    <span className="font-poppins font-semibold text-base text-navy">{category}</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-dm-sans">
                      {docs.length} dokumen
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-3">
                        {docs.map((doc, index) => {
                          const StatusIcon = doc.required ? CheckCircleIcon : XCircleIcon;
                          const iconColor = doc.required ? 'text-green-500' : 'text-gray-300';
                          
                          return (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <StatusIcon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-dm-sans text-sm text-navy">{doc.name}</p>
                                  <span className={`px-2 py-0.5 text-xs rounded-full font-dm-sans ${
                                    doc.required
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    {doc.required ? 'Wajib' : 'Opsional'}
                                  </span>
                                </div>
                                {doc.description && (
                                  <p className="font-dm-sans text-xs text-gray-500">{doc.description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-navy-light border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-poppins font-medium text-base text-navy">
            Mau kami cek dokumenmu dulu?
          </p>
          <button className="px-6 py-2.5 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-full transition-colors whitespace-nowrap">
            Analisis Dokumen Gratis →
          </button>
        </div>
      </div>
    </div>
  );
}
