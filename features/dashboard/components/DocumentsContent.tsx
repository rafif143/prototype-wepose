'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
  CreditCardIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  XMarkIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  uploadedDate: string;
  size: string;
  url: string;
  notes?: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList) => void;
}

interface DocumentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

// Helper functions
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    case 'pending':
      return <ClockIcon className="w-5 h-5 text-yellow-600" />;
    case 'needs_revision':
      return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
    default:
      return <DocumentTextIcon className="w-5 h-5 text-gray-600" />;
  }
};
const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'needs_revision':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'passport':
      return <DocumentTextIcon className="w-6 h-6 text-blue-600" />;
    case 'photo':
      return <PhotoIcon className="w-6 h-6 text-purple-600" />;
    case 'bank_statement':
      return <CreditCardIcon className="w-6 h-6 text-green-600" />;
    case 'employment_letter':
      return <BriefcaseIcon className="w-6 h-6 text-orange-600" />;
    case 'hotel_booking':
      return <BuildingOfficeIcon className="w-6 h-6 text-indigo-600" />;
    case 'flight_ticket':
      return <PaperAirplaneIcon className="w-6 h-6 text-sky-600" />;
    case 'insurance':
      return <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />;
    default:
      return <DocumentTextIcon className="w-6 h-6 text-gray-600" />;
  }
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    passport: 'Paspor',
    photo: 'Foto',
    bank_statement: 'Rekening Koran',
    employment_letter: 'Surat Kerja',
    hotel_booking: 'Booking Hotel',
    flight_ticket: 'Tiket Pesawat',
    insurance: 'Asuransi',
    other: 'Lainnya'
  };
  return labels[type] || type;
};

const DocumentDetailModal = ({ isOpen, onClose, document }: DocumentDetailModalProps) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-white rounded-[20px] shadow-lg w-full max-w-[600px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {getTypeIcon(document.type)}
            <h3 className="text-[18px] font-poppins font-semibold text-navy leading-tight">
              Detail Dokumen
            </h3>
          </div>
          <p className="text-[14px] font-dm-sans text-gray-500">
            Informasi lengkap dokumen Anda
          </p>
        </div>
        {/* Document Info */}
        <div className="space-y-4 mb-6">
          {/* Document Name */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              {getTypeIcon(document.type)}
              <div className="flex-1">
                <h4 className="text-[16px] font-poppins font-semibold text-navy mb-1">
                  {document.name}
                </h4>
                <p className="text-[14px] font-dm-sans text-gray-600">
                  {getTypeLabel(document.type)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(document.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                  {document.status === 'approved' && 'Disetujui'}
                  {document.status === 'pending' && 'Pending'}
                  {document.status === 'needs_revision' && 'Perlu Revisi'}
                </span>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Ukuran File
                </label>
                <p className="text-[14px] font-dm-sans text-navy mt-1">{document.size}</p>
              </div>
              
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Tanggal Upload
                </label>
                <p className="text-[14px] font-dm-sans text-navy mt-1">
                  {new Date(document.uploadedDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Status Verifikasi
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(document.status)}
                  <span className="text-[14px] font-dm-sans text-navy">
                    {document.status === 'approved' && 'Dokumen Disetujui'}
                    {document.status === 'pending' && 'Menunggu Review'}
                    {document.status === 'needs_revision' && 'Perlu Diperbaiki'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  ID Dokumen
                </label>
                <p className="text-[14px] font-dm-sans text-navy mt-1 font-mono">
                  DOC-{document.id.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          {/* Notes */}
          {document.notes && (
            <div>
              <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                Catatan
              </label>
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-[14px] font-dm-sans text-yellow-800">
                  {document.notes}
                </p>
              </div>
            </div>
          )}

          {/* Document Preview Placeholder */}
          <div>
            <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
              Preview Dokumen
            </label>
            <div className="mt-2 bg-gray-100 rounded-lg p-8 text-center">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-[14px] font-dm-sans text-gray-600 mb-2">
                Preview tidak tersedia
              </p>
              <p className="text-[12px] font-dm-sans text-gray-500">
                Klik download untuk melihat dokumen lengkap
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-dm-sans font-medium text-[14px] rounded-full hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              console.log('Download document:', document.id);
            }}
            className="flex-1 px-4 py-2.5 bg-orange text-white font-poppins font-semibold text-[14px] rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download
          </button>
        </div>
      </motion.div>
    </div>
  );
};
const UploadModal = ({ isOpen, onClose, onUpload }: UploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const fileList = new DataTransfer();
      selectedFiles.forEach(file => fileList.items.add(file));
      onUpload(fileList.files);
      setSelectedFiles([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-white rounded-[20px] shadow-lg w-full max-w-[480px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-[18px] font-poppins font-semibold text-navy leading-tight">
            Upload Dokumen
          </h3>
          <p className="text-[14px] font-dm-sans text-gray-500 mt-1">
            Pilih file untuk diupload ke sistem
          </p>
        </div>
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-orange bg-orange-50' 
              : 'border-gray-200 hover:border-orange hover:bg-orange-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CloudArrowUpIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-[14px] font-dm-sans text-gray-600 mb-2">
            Drag & drop files atau klik untuk pilih
          </p>
          <p className="text-[12px] font-dm-sans text-gray-400 mb-4">
            Format: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label
            htmlFor="file-upload"
            className="inline-block bg-orange text-white font-poppins font-semibold text-[13px] py-2.5 px-6 rounded-full cursor-pointer hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200"
          >
            Pilih File
          </label>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-[14px] font-poppins font-semibold text-navy mb-3">
              File Terpilih ({selectedFiles.length})
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-dm-sans font-medium text-navy truncate">
                        {file.name}
                      </p>
                      <p className="text-[12px] font-dm-sans text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-dm-sans font-medium text-[14px] rounded-full hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
            className="flex-1 px-4 py-2.5 bg-orange text-white font-poppins font-semibold text-[14px] rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.97] transition-all duration-200"
          >
            Upload ({selectedFiles.length})
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export function DocumentsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - expanded to 10 items
  const documents: Document[] = [
    {
      id: "1",
      name: "Paspor - Halaman Utama.pdf",
      type: "passport",
      status: "approved",
      uploadedDate: "2024-03-10",
      size: "2.4 MB",
      url: "#",
      notes: "Dokumen telah diverifikasi"
    },
    {
      id: "2", 
      name: "Foto 4x6 Background Putih.jpg",
      type: "photo",
      status: "pending",
      uploadedDate: "2024-03-11",
      size: "1.8 MB",
      url: "#"
    },
    {
      id: "3",
      name: "Rekening Koran 3 Bulan.pdf", 
      type: "bank_statement",
      status: "needs_revision",
      uploadedDate: "2024-03-09",
      size: "5.2 MB",
      url: "#",
      notes: "Perlu rekening koran yang lebih baru"
    },
    {
      id: "4",
      name: "Surat Keterangan Kerja.pdf",
      type: "employment_letter", 
      status: "approved",
      uploadedDate: "2024-03-08",
      size: "1.1 MB",
      url: "#"
    },
    {
      id: "5",
      name: "Booking Hotel Confirmation.pdf",
      type: "hotel_booking",
      status: "approved",
      uploadedDate: "2024-03-07",
      size: "890 KB",
      url: "#"
    },
    {
      id: "6",
      name: "Tiket Pesawat Return.pdf",
      type: "flight_ticket",
      status: "pending",
      uploadedDate: "2024-03-06",
      size: "1.5 MB",
      url: "#"
    },
    {
      id: "7",
      name: "Asuransi Perjalanan.pdf",
      type: "insurance",
      status: "approved",
      uploadedDate: "2024-03-05",
      size: "2.1 MB",
      url: "#"
    },
    {
      id: "8",
      name: "Foto Tambahan 3x4.jpg",
      type: "photo",
      status: "needs_revision",
      uploadedDate: "2024-03-04",
      size: "1.2 MB",
      url: "#",
      notes: "Background harus putih polos"
    },
    {
      id: "9",
      name: "Surat Sponsor.pdf",
      type: "other",
      status: "pending",
      uploadedDate: "2024-03-03",
      size: "980 KB",
      url: "#"
    },
    {
      id: "10",
      name: "Ijazah Terakhir.pdf",
      type: "other",
      status: "approved",
      uploadedDate: "2024-03-02",
      size: "1.7 MB",
      url: "#"
    }
  ];
  const stats = {
    total: documents.length,
    approved: documents.filter(d => d.status === 'approved').length,
    pending: documents.filter(d => d.status === 'pending').length,
    needsRevision: documents.filter(d => d.status === 'needs_revision').length
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredDocuments.length)} dari {filteredDocuments.length} dokumen
        </p>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Prev
          </button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  page === currentPage
                    ? 'bg-orange text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const handleUpload = (files: FileList) => {
    console.log('Uploading files:', files);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dokumen Saya</h1>
          <p className="text-gray-600 mt-1">Kelola semua dokumen visa Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Dokumen</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disetujui</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perlu Revisi</p>
              <p className="text-2xl font-bold text-red-600">{stats.needsRevision}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange();
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="approved">Disetujui</option>
              <option value="pending">Pending</option>
              <option value="needs_revision">Perlu Revisi</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            >
              <option value="all">Semua Tipe</option>
              <option value="passport">Paspor</option>
              <option value="photo">Foto</option>
              <option value="bank_statement">Rekening Koran</option>
              <option value="employment_letter">Surat Kerja</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-orange text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-orange text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <TableCellsIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* Documents Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentDocuments.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getTypeIcon(document.type)}
                  <div>
                    <h3 className="font-medium text-navy text-sm">{document.name}</h3>
                    <p className="text-xs text-gray-500">{getTypeLabel(document.type)}</p>
                  </div>
                </div>
                {getStatusIcon(document.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ukuran:</span>
                  <span className="text-navy">{document.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Upload:</span>
                  <span className="text-navy">{new Date(document.uploadedDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${getStatusColor(document.status)}`}>
                {document.status === 'approved' && 'Disetujui'}
                {document.status === 'pending' && 'Pending'}
                {document.status === 'needs_revision' && 'Perlu Revisi'}
              </div>

              {document.notes && (
                <p className="text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded-lg">
                  {document.notes}
                </p>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDocument(document)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <EyeIcon className="w-4 h-4" />
                  Lihat
                </button>
                <button className="flex-1 bg-orange text-white px-3 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-1">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Dokumen</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Tipe</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Ukuran</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Tanggal Upload</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDocuments.map((document) => (
                  <motion.tr
                    key={document.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(document.type)}
                        <div>
                          <p className="text-sm font-medium text-navy">{document.name}</p>
                          {document.notes && (
                            <p className="text-xs text-gray-500 mt-1">{document.notes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{getTypeLabel(document.type)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(document.status)}
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                          {document.status === 'approved' && 'Disetujui'}
                          {document.status === 'pending' && 'Pending'}
                          {document.status === 'needs_revision' && 'Perlu Revisi'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{document.size}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {new Date(document.uploadedDate).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDocument(document)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-orange hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <ArrowDownTrayIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
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
      )}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen</h3>
          <p className="text-gray-600">Belum ada dokumen yang sesuai dengan filter Anda.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      {/* Document Detail Modal */}
      <DocumentDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        document={selectedDocument}
      />
    </div>
  );
}

export default DocumentsContent;