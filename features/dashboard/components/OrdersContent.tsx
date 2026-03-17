"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ArrowLeftIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { TrackingTimeline } from "./TrackingTimeline";
import { Flag } from '@/shared/ui/Flag';

interface Order {
  id: string;
  country: string;
  countryCode: string;
  visaType: string;
  status: 'processing' | 'review' | 'approved' | 'rejected' | 'ready' | 'completed';
  statusLabel: string;
  submittedDate: string;
  completedDate?: string;
  totalAmount: number;
}

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const mockOrders: Order[] = [
  {
    id: "WP-2024-001",
    country: "Jepang",
    countryCode: "jp",
    visaType: "Tourist Visa",
    status: "review",
    statusLabel: "Dokumen Direview",
    submittedDate: "2024-03-15",
    totalAmount: 1200000
  },
  {
    id: "WP-2024-002",
    country: "Korea Selatan", 
    countryCode: "kr",
    visaType: "Business Visa",
    status: "processing",
    statusLabel: "Sedang Diproses",
    submittedDate: "2024-03-12",
    totalAmount: 950000
  },
  {
    id: "WP-2024-003",
    country: "Singapura",
    countryCode: "sg", 
    visaType: "Tourist Visa",
    status: "completed",
    statusLabel: "Selesai",
    submittedDate: "2024-02-20",
    completedDate: "2024-03-05",
    totalAmount: 850000
  },
  {
    id: "WP-2024-004",
    country: "Australia",
    countryCode: "au",
    visaType: "Tourist Visa", 
    status: "rejected",
    statusLabel: "Ditolak",
    submittedDate: "2024-02-10",
    totalAmount: 1500000
  },
  {
    id: "WP-2024-005",
    country: "Amerika Serikat",
    countryCode: "us",
    visaType: "Business Visa",
    status: "approved",
    statusLabel: "Disetujui",
    submittedDate: "2024-03-01",
    totalAmount: 2200000
  },
  {
    id: "WP-2024-006",
    country: "Inggris",
    countryCode: "gb",
    visaType: "Tourist Visa",
    status: "ready",
    statusLabel: "Siap Diambil",
    submittedDate: "2024-02-25",
    totalAmount: 1800000
  },
  {
    id: "WP-2024-007",
    country: "Jerman",
    countryCode: "de",
    visaType: "Schengen Visa",
    status: "processing",
    statusLabel: "Sedang Diproses",
    submittedDate: "2024-03-08",
    totalAmount: 1100000
  },
  {
    id: "WP-2024-008",
    country: "Prancis",
    countryCode: "fr",
    visaType: "Schengen Visa",
    status: "review",
    statusLabel: "Dokumen Direview",
    submittedDate: "2024-03-05",
    totalAmount: 1150000
  },
  {
    id: "WP-2024-009",
    country: "Kanada",
    countryCode: "ca",
    visaType: "Tourist Visa",
    status: "completed",
    statusLabel: "Selesai",
    submittedDate: "2024-01-15",
    completedDate: "2024-02-28",
    totalAmount: 1900000
  },
  {
    id: "WP-2024-010",
    country: "Thailand",
    countryCode: "th",
    visaType: "Tourist Visa",
    status: "approved",
    statusLabel: "Disetujui",
    submittedDate: "2024-03-10",
    totalAmount: 650000
  }
];

// Helper functions
const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'review': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'approved': return 'bg-green-100 text-green-700 border-green-200';
    case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
    case 'ready': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'processing': return <ClockIcon className="w-5 h-5 text-blue-600" />;
    case 'review': return <DocumentTextIcon className="w-5 h-5 text-orange-600" />;
    case 'approved': return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    case 'rejected': return <XCircleIcon className="w-5 h-5 text-red-600" />;
    case 'ready': return <CheckCircleIcon className="w-5 h-5 text-purple-600" />;
    case 'completed': return <CheckCircleIcon className="w-5 h-5 text-emerald-600" />;
    default: return <ClockIcon className="w-5 h-5 text-gray-600" />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const OrderDetailModal = ({ isOpen, onClose, order }: OrderDetailModalProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-white rounded-[20px] shadow-lg w-full max-w-[700px] p-6 max-h-[90vh] overflow-y-auto"
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
            <Flag countryCode={order.countryCode} size="lg" />
            <h3 className="text-[18px] font-poppins font-semibold text-navy leading-tight">
              Detail Order - Visa {order.country}
            </h3>
          </div>
          <p className="text-[14px] font-dm-sans text-gray-500">
            Informasi lengkap pesanan visa Anda
          </p>
        </div>

        {/* Order Info */}
        <div className="space-y-4 mb-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Flag countryCode={order.countryCode} size="lg" />
                <div>
                  <h4 className="text-[16px] font-poppins font-semibold text-navy mb-1">
                    Visa {order.country}
                  </h4>
                  <p className="text-[14px] font-dm-sans text-gray-600">
                    {order.visaType}
                  </p>
                  <p className="text-[12px] font-dm-sans text-gray-500 font-mono">
                    {order.id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[18px] font-poppins font-bold text-navy mb-2">
                  {formatCurrency(order.totalAmount)}
                </p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.statusLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Tanggal Pengajuan
                </label>
                <p className="text-[14px] font-dm-sans text-navy mt-1">
                  {formatDate(order.submittedDate)}
                </p>
              </div>
              
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Jenis Visa
                </label>
                <p className="text-[14px] font-dm-sans text-navy mt-1">
                  {order.visaType}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                  Status Saat Ini
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(order.status)}
                  <span className="text-[14px] font-dm-sans text-navy">
                    {order.statusLabel}
                  </span>
                </div>
              </div>

              {order.completedDate && (
                <div>
                  <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
                    Tanggal Selesai
                  </label>
                  <p className="text-[14px] font-dm-sans text-navy mt-1">
                    {formatDate(order.completedDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Preview */}
          <div>
            <label className="text-[12px] font-dm-sans font-medium text-gray-500 uppercase tracking-wide">
              Progress Tracking
            </label>
            <div className="mt-2 bg-gray-100 rounded-lg p-4 text-center">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-[14px] font-dm-sans text-gray-600 mb-1">
                Timeline tracking tersedia
              </p>
              <p className="text-[12px] font-dm-sans text-gray-500">
                Tutup modal ini untuk melihat detail tracking
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
              console.log('View tracking for order:', order.id);
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-orange text-white font-poppins font-semibold text-[14px] rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Lihat Tracking
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export function OrdersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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
          Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} dari {filteredOrders.length} order
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

  const stats = {
    total: mockOrders.length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    review: mockOrders.filter(o => o.status === 'review').length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    rejected: mockOrders.filter(o => o.status === 'rejected').length
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  const handleShowTracking = (order: Order) => {
    setSelectedOrder(order);
    setShowTracking(true);
  };

  if (showTracking && selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setShowTracking(false);
              setSelectedOrder(null);
            }}
            className="flex items-center gap-2 text-orange hover:text-orange-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Kembali ke Daftar Order
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Flag countryCode={selectedOrder.countryCode} size="lg" />
              <div>
                <h1 className="font-poppins font-bold text-2xl text-navy">
                  Visa {selectedOrder.country}
                </h1>
                <p className="font-dm-sans text-gray-600">{selectedOrder.visaType}</p>
                <p className="font-dm-sans text-sm text-gray-500">Order ID: {selectedOrder.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-poppins font-bold text-xl text-navy">
                {formatCurrency(selectedOrder.totalAmount)}
              </p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-dm-sans font-medium border mt-2 ${getStatusColor(selectedOrder.status)}`}>
                {getStatusIcon(selectedOrder.status)}
                {selectedOrder.statusLabel}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-poppins font-semibold text-sm text-gray-700 mb-2">Tanggal Pengajuan</h3>
              <p className="font-dm-sans text-base text-navy">{formatDate(selectedOrder.submittedDate)}</p>
            </div>
            {selectedOrder.completedDate && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-poppins font-semibold text-sm text-gray-700 mb-2">Tanggal Selesai</h3>
                <p className="font-dm-sans text-base text-navy">{formatDate(selectedOrder.completedDate)}</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-poppins font-semibold text-sm text-gray-700 mb-2">Jenis Visa</h3>
              <p className="font-dm-sans text-base text-navy">{selectedOrder.visaType}</p>
            </div>
          </div>
        </div>

        <TrackingTimeline orderId={selectedOrder.id} steps={[]} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy">Order Saya</h1>
          <p className="text-gray-600 mt-1">Pantau semua pesanan visa Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Order</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Diproses</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Direview</p>
              <p className="text-2xl font-bold text-orange-600">{stats.review}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selesai</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
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
                placeholder="Cari order..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
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
              <option value="processing">Diproses</option>
              <option value="review">Direview</option>
              <option value="approved">Disetujui</option>
              <option value="ready">Siap Diambil</option>
              <option value="completed">Selesai</option>
              <option value="rejected">Ditolak</option>
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
          </div>
        </div>
      </div>
      {/* Orders Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Flag countryCode={order.countryCode} size="md" />
                  <div>
                    <h3 className="font-medium text-navy text-sm">Visa {order.country}</h3>
                    <p className="text-xs text-gray-500">{order.visaType}</p>
                  </div>
                </div>
                {getStatusIcon(order.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-navy font-medium">{formatCurrency(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="text-navy">{formatDate(order.submittedDate)}</span>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${getStatusColor(order.status)}`}>
                {order.statusLabel}
              </div>

              <p className="text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded-lg font-mono">
                ID: {order.id}
              </p>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewOrder(order)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <EyeIcon className="w-4 h-4" />
                  Detail
                </button>
                <button 
                  onClick={() => handleShowTracking(order)}
                  className="flex-1 bg-orange text-white px-3 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-1"
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  Tracking
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Order</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Negara</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Tanggal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-navy font-mono">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.visaType}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Flag countryCode={order.countryCode} size="md" />
                        <span className="text-sm text-gray-700">{order.country}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {order.statusLabel}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-navy">{formatCurrency(order.totalAmount)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {formatDate(order.submittedDate)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleShowTracking(order)}
                          className="p-2 text-orange hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <DocumentTextIcon className="w-4 h-4" />
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

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada order</h3>
          <p className="text-gray-600">Belum ada order yang sesuai dengan filter Anda.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination />

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        order={selectedOrder}
      />
    </div>
  );
}