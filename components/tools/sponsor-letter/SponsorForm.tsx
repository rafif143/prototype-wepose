'use client';

import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { TemplateType, SponsorFormData } from '@/lib/tools/sponsor-letter/types';
import { validateSponsorForm, ValidationError } from '@/lib/tools/sponsor-letter/validation';

interface SponsorFormProps {
  template: TemplateType;
  formData: SponsorFormData;
  onUpdateField: (field: keyof SponsorFormData, value: string) => void;
}

export function SponsorForm({ template, formData, onUpdateField }: SponsorFormProps) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<keyof SponsorFormData>>(new Set());

  useEffect(() => {
    const validationErrors = validateSponsorForm(formData, template);
    setErrors(validationErrors);
  }, [formData, template]);

  const handleBlur = (field: keyof SponsorFormData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  };

  const getFieldError = (field: keyof SponsorFormData) => {
    if (!touchedFields.has(field)) return null;
    return errors.find((error) => error.field === field)?.message;
  };

  const getInputClass = (field: keyof SponsorFormData) =>
    `w-full px-4 py-2.5 rounded-input border text-[15px] font-dm-sans transition-all duration-200 focus:outline-none ${
      getFieldError(field)
        ? 'border-error-red focus:border-error-red focus:ring-2 focus:ring-error-red/20'
        : 'border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20'
    }`;

  const inputClass = 'w-full px-4 py-2.5 rounded-input border text-[15px] font-dm-sans transition-all duration-200 focus:outline-none border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20';

  const labelClass = 'block text-[14px] font-dm-sans font-medium text-navy mb-1.5';

  return (
    <div className="space-y-8">
      {/* Ambil dari Profil Button */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-button border border-gray-200 text-[14px] font-dm-sans font-medium text-navy hover:border-orange hover:bg-orange-50 transition-all duration-200">
        <UserIcon className="w-4 h-4" />
        Ambil dari Profil
      </button>

      {/* Data Pemohon Section */}
      <div className="space-y-4">
        <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
          📋 Data Pemohon
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="applicantName" className={labelClass}>
              Nama Lengkap <span className="text-error-red">*</span>
            </label>
            <input
              id="applicantName"
              type="text"
              value={formData.applicantName}
              onChange={(e) => onUpdateField('applicantName', e.target.value)}
              onBlur={() => handleBlur('applicantName')}
              placeholder="Contoh: Budi Santoso"
              className={getInputClass('applicantName')}
              aria-invalid={!!getFieldError('applicantName')}
              aria-describedby={getFieldError('applicantName') ? 'applicantName-error' : undefined}
            />
            {getFieldError('applicantName') && (
              <p id="applicantName-error" className="mt-1 text-[13px] text-error-red">
                {getFieldError('applicantName')}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="passportNumber" className={labelClass}>
              No. Paspor <span className="text-error-red">*</span>
            </label>
            <input
              id="passportNumber"
              type="text"
              value={formData.passportNumber}
              onChange={(e) => onUpdateField('passportNumber', e.target.value)}
              placeholder="Contoh: A1234567"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="birthDate" className={labelClass}>
              Tanggal Lahir <span className="text-error-red">*</span>
            </label>
            <input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => onUpdateField('birthDate', e.target.value)}
              className={inputClass}
            />
          </div>
          {template === 'pribadi' && (
            <>
              <div>
                <label htmlFor="occupation" className={labelClass}>
                  Pekerjaan <span className="text-error-red">*</span>
                </label>
                <input
                  id="occupation"
                  type="text"
                  value={formData.occupation || ''}
                  onChange={(e) => onUpdateField('occupation', e.target.value)}
                  placeholder="Contoh: Software Engineer"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="monthlyIncome" className={labelClass}>
                  Penghasilan per Bulan <span className="text-error-red">*</span>
                </label>
                <input
                  id="monthlyIncome"
                  type="text"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) => onUpdateField('monthlyIncome', e.target.value)}
                  placeholder="Contoh: Rp 15.000.000"
                  className={inputClass}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Sponsor Section (for keluarga and perusahaan) */}
      {template !== 'pribadi' && (
        <div className="space-y-4">
          <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
            {template === 'keluarga' ? '👨‍👩‍👧 Data Sponsor' : '🏢 Data Perusahaan'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {template === 'keluarga' ? (
              <>
                <div>
                  <label htmlFor="sponsorName" className={labelClass}>
                    Nama Sponsor <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sponsorName"
                    type="text"
                    value={formData.sponsorName || ''}
                    onChange={(e) => onUpdateField('sponsorName', e.target.value)}
                    placeholder="Contoh: Ahmad Wijaya"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sponsorIdNumber" className={labelClass}>
                    No. KTP Sponsor <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sponsorIdNumber"
                    type="text"
                    value={formData.sponsorIdNumber || ''}
                    onChange={(e) => onUpdateField('sponsorIdNumber', e.target.value)}
                    placeholder="Contoh: 3201234567890001"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="sponsorAddress" className={labelClass}>
                    Alamat Sponsor <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sponsorAddress"
                    type="text"
                    value={formData.sponsorAddress || ''}
                    onChange={(e) => onUpdateField('sponsorAddress', e.target.value)}
                    placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sponsorPhone" className={labelClass}>
                    No. Telepon Sponsor <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sponsorPhone"
                    type="tel"
                    value={formData.sponsorPhone || ''}
                    onChange={(e) => onUpdateField('sponsorPhone', e.target.value)}
                    placeholder="Contoh: +62 812-3456-7890"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="relationship" className={labelClass}>
                    Hubungan <span className="text-error-red">*</span>
                  </label>
                  <select
                    id="relationship"
                    value={formData.relationship || ''}
                    onChange={(e) => onUpdateField('relationship', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Pilih hubungan</option>
                    <option value="Anak">Anak</option>
                    <option value="Suami/Istri">Suami/Istri</option>
                    <option value="Orang Tua">Orang Tua</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="companyName" className={labelClass}>
                    Nama Perusahaan <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={formData.companyName || ''}
                    onChange={(e) => onUpdateField('companyName', e.target.value)}
                    placeholder="Contoh: PT Teknologi Indonesia"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="position" className={labelClass}>
                    Jabatan Karyawan <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={formData.position || ''}
                    onChange={(e) => onUpdateField('position', e.target.value)}
                    placeholder="Contoh: Senior Developer"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="letterNumber" className={labelClass}>
                    No. Surat <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="letterNumber"
                    type="text"
                    value={formData.letterNumber || ''}
                    onChange={(e) => onUpdateField('letterNumber', e.target.value)}
                    placeholder="Contoh: 001/HR/XII/2024"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="signerName" className={labelClass}>
                    Nama Penandatangan <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="signerName"
                    type="text"
                    value={formData.signerName || ''}
                    onChange={(e) => onUpdateField('signerName', e.target.value)}
                    placeholder="Contoh: Siti Nurhaliza"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="signerPosition" className={labelClass}>
                    Jabatan Penandatangan <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="signerPosition"
                    type="text"
                    value={formData.signerPosition || ''}
                    onChange={(e) => onUpdateField('signerPosition', e.target.value)}
                    placeholder="Contoh: HR Manager"
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Detail Perjalanan Section */}
      <div className="space-y-4">
        <h3 className="text-h4 text-navy pb-2 border-b border-gray-200">
          ✈️ Detail Perjalanan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="destinationCountry" className={labelClass}>
              Negara Tujuan <span className="text-error-red">*</span>
            </label>
            <input
              id="destinationCountry"
              type="text"
              value={formData.destinationCountry}
              onChange={(e) => onUpdateField('destinationCountry', e.target.value)}
              placeholder="Contoh: Jepang"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="destinationCity" className={labelClass}>
              Kota Tujuan <span className="text-error-red">*</span>
            </label>
            <input
              id="destinationCity"
              type="text"
              value={formData.destinationCity}
              onChange={(e) => onUpdateField('destinationCity', e.target.value)}
              placeholder="Contoh: Tokyo"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="departureDate" className={labelClass}>
              Tanggal Berangkat <span className="text-error-red">*</span>
            </label>
            <input
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={(e) => onUpdateField('departureDate', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="returnDate" className={labelClass}>
              Tanggal Kembali <span className="text-error-red">*</span>
            </label>
            <input
              id="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={(e) => onUpdateField('returnDate', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
