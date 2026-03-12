"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserIcon,
  PencilIcon,
  CameraIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
}

const mockFamilyMembers: FamilyMember[] = [
  {
    id: "fam-001",
    name: "Sarah Wijaya",
    relationship: "Istri",
    dateOfBirth: "1992-08-15",
    nationality: "Indonesia",
    passportNumber: "A1234567",
    passportExpiry: "2028-05-20"
  },
  {
    id: "fam-002", 
    name: "Name",
    relationship: "Anak",
    dateOfBirth: "2018-03-10",
    nationality: "Indonesia",
    passportNumber: "A7654321",
    passportExpiry: "2026-12-15"
  }
];

export function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassport, setShowPassport] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'family'>('personal');
  const [familyMembers, setFamilyMembers] = useState(mockFamilyMembers);
  const [isAddingFamily, setIsAddingFamily] = useState(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Name",
    email: "Name@example.com",
    phone: "+62 812 3456 7890",
    dateOfBirth: "1990-05-15",
    nationality: "Indonesia",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    passportNumber: "A9876543",
    passportExpiry: "2029-08-20",
    emergencyContact: "Sarah Wijaya",
    emergencyPhone: "+62 811 9876 5432"
  });

  const [newFamilyMember, setNewFamilyMember] = useState({
    name: "",
    relationship: "",
    dateOfBirth: "",
    nationality: "Indonesia",
    passportNumber: "",
    passportExpiry: ""
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleAddFamilyMember = () => {
    if (newFamilyMember.name && newFamilyMember.relationship && newFamilyMember.dateOfBirth) {
      const newMember: FamilyMember = {
        id: `fam-${Date.now()}`,
        ...newFamilyMember
      };
      setFamilyMembers([...familyMembers, newMember]);
      setNewFamilyMember({
        name: "",
        relationship: "",
        dateOfBirth: "",
        nationality: "Indonesia",
        passportNumber: "",
        passportExpiry: ""
      });
      setIsAddingFamily(false);
    }
  };

  const handleDeleteFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-navy mb-2">
          Profil & Keluarga
        </h1>
        <p className="font-dm-sans text-gray-600">
          Kelola informasi profil dan data keluarga
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-md p-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-3 px-4 rounded-xl font-poppins font-semibold text-sm transition-colors ${
              activeTab === 'personal'
                ? 'bg-orange text-white'
                : 'text-gray-600 hover:text-orange'
            }`}
          >
            Data Pribadi
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`flex-1 py-3 px-4 rounded-xl font-poppins font-semibold text-sm transition-colors ${
              activeTab === 'family'
                ? 'bg-orange text-white'
                : 'text-gray-600 hover:text-orange'
            }`}
          >
            Data Keluarga
          </button>
        </div>
      </div>

      {activeTab === 'personal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          {/* Profile Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-orange" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center hover:bg-orange-dark transition-colors">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="font-poppins font-bold text-2xl text-navy mb-1">
                  {profileData.name}
                </h2>
                <p className="font-dm-sans text-gray-600">{profileData.email}</p>
                <p className="font-dm-sans text-sm text-gray-500">
                  Bergabung sejak Januari 2024
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-colors"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Profil
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Kewarganegaraan
              </label>
              <input
                type="text"
                value={profileData.nationality}
                onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Nomor Paspor
              </label>
              <div className="relative">
                <input
                  type={showPassport ? "text" : "password"}
                  value={profileData.passportNumber}
                  onChange={(e) => setProfileData({...profileData, passportNumber: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassport(!showPassport)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange transition-colors"
                >
                  {showPassport ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Alamat
              </label>
              <textarea
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50 resize-none"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Kontak Darurat
              </label>
              <input
                type="text"
                value={profileData.emergencyContact}
                onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                Telepon Darurat
              </label>
              <input
                type="tel"
                value={profileData.emergencyPhone}
                onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors disabled:bg-gray-50"
              />
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'family' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Add Family Member Button */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-poppins font-bold text-lg text-navy mb-1">
                  Anggota Keluarga
                </h3>
                <p className="font-dm-sans text-gray-600">
                  Kelola data keluarga untuk aplikasi visa bersama
                </p>
              </div>
              <button
                onClick={() => setIsAddingFamily(true)}
                className="flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Tambah Anggota
              </button>
            </div>
          </div>

          {/* Add Family Form */}
          {isAddingFamily && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h4 className="font-poppins font-bold text-lg text-navy mb-4">
                Tambah Anggota Keluarga
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={newFamilyMember.name}
                    onChange={(e) => setNewFamilyMember({...newFamilyMember, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                    Hubungan Keluarga
                  </label>
                  <select
                    value={newFamilyMember.relationship}
                    onChange={(e) => setNewFamilyMember({...newFamilyMember, relationship: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                  >
                    <option value="">Pilih hubungan</option>
                    <option value="Suami">Suami</option>
                    <option value="Istri">Istri</option>
                    <option value="Anak">Anak</option>
                    <option value="Orang Tua">Orang Tua</option>
                    <option value="Saudara">Saudara</option>
                  </select>
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={newFamilyMember.dateOfBirth}
                    onChange={(e) => setNewFamilyMember({...newFamilyMember, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                    Nomor Paspor (Opsional)
                  </label>
                  <input
                    type="text"
                    value={newFamilyMember.passportNumber}
                    onChange={(e) => setNewFamilyMember({...newFamilyMember, passportNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                    placeholder="Nomor paspor"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddFamilyMember}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setIsAddingFamily(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          )}

          {/* Family Members Table */}
          {familyMembers.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Nama</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Hubungan</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Umur</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Paspor</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {familyMembers.map((member, index) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-orange" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-navy">{member.name}</p>
                              <p className="text-xs text-gray-500">
                                Lahir: {formatDate(member.dateOfBirth)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{member.relationship}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{calculateAge(member.dateOfBirth)} tahun</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">
                            {member.passportNumber || '-'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedFamilyMember(member);
                                setIsDetailModalOpen(true);
                              }}
                              className="p-2 text-gray-600 hover:text-orange hover:bg-orange-50 rounded-lg transition-colors"
                              title="Lihat Detail"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-gray-600 hover:text-orange hover:bg-orange-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteFamilyMember(member.id)}
                              className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : !isAddingFamily && (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
                Belum ada anggota keluarga
              </h3>
              <p className="font-dm-sans text-gray-600 mb-4">
                Tambahkan data keluarga untuk memudahkan aplikasi visa bersama
              </p>
              <button
                onClick={() => setIsAddingFamily(true)}
                className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors"
              >
                Tambah Anggota Pertama
              </button>
            </div>
          )}

          {/* Family Member Detail Modal */}
          {isDetailModalOpen && selectedFamilyMember && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-poppins font-bold text-xl text-navy">
                      Detail Anggota Keluarga
                    </h3>
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        setSelectedFamilyMember(null);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserIcon className="w-10 h-10 text-orange" />
                      </div>
                      <h4 className="font-poppins font-bold text-lg text-navy">
                        {selectedFamilyMember.name}
                      </h4>
                      <p className="font-dm-sans text-gray-600">
                        {selectedFamilyMember.relationship}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h5 className="font-poppins font-semibold text-sm text-navy mb-3">
                          Informasi Pribadi
                        </h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-dm-sans text-sm text-gray-600">Nama Lengkap:</span>
                            <span className="font-dm-sans text-sm text-navy font-medium">
                              {selectedFamilyMember.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-dm-sans text-sm text-gray-600">Hubungan:</span>
                            <span className="font-dm-sans text-sm text-navy font-medium">
                              {selectedFamilyMember.relationship}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-dm-sans text-sm text-gray-600">Tanggal Lahir:</span>
                            <span className="font-dm-sans text-sm text-navy font-medium">
                              {formatDate(selectedFamilyMember.dateOfBirth)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-dm-sans text-sm text-gray-600">Umur:</span>
                            <span className="font-dm-sans text-sm text-navy font-medium">
                              {calculateAge(selectedFamilyMember.dateOfBirth)} tahun
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-dm-sans text-sm text-gray-600">Kewarganegaraan:</span>
                            <span className="font-dm-sans text-sm text-navy font-medium">
                              {selectedFamilyMember.nationality}
                            </span>
                          </div>
                        </div>
                      </div>

                      {selectedFamilyMember.passportNumber && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h5 className="font-poppins font-semibold text-sm text-navy mb-3">
                            Informasi Paspor
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="font-dm-sans text-sm text-gray-600">Nomor Paspor:</span>
                              <span className="font-dm-sans text-sm text-navy font-medium">
                                {selectedFamilyMember.passportNumber}
                              </span>
                            </div>
                            {selectedFamilyMember.passportExpiry && (
                              <div className="flex justify-between">
                                <span className="font-dm-sans text-sm text-gray-600">Berlaku Hingga:</span>
                                <span className="font-dm-sans text-sm text-navy font-medium">
                                  {formatDate(selectedFamilyMember.passportExpiry)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="flex-1 bg-orange hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors">
                        Edit Data
                      </button>
                      <button 
                        onClick={() => {
                          setIsDetailModalOpen(false);
                          setSelectedFamilyMember(null);
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}