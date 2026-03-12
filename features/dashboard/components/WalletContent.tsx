"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  WalletIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TicketIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface Transaction {
  id: string;
  type: 'topup' | 'payment' | 'refund' | 'bonus';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
}

interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount?: number;
  validUntil: string;
  status: 'active' | 'expired' | 'used';
  usageCount: number;
  usageLimit: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "trx-001",
    type: "payment",
    amount: -1200000,
    description: "Pembayaran Visa Jepang",
    date: "2024-03-15",
    status: "completed",
    orderId: "WP-2024-001"
  },
  {
    id: "trx-002",
    type: "topup", 
    amount: 2000000,
    description: "Top Up Saldo",
    date: "2024-03-14",
    status: "completed"
  },
  {
    id: "trx-003",
    type: "payment",
    amount: -950000,
    description: "Pembayaran Visa Korea Selatan",
    date: "2024-03-12",
    status: "completed",
    orderId: "WP-2024-002"
  },
  {
    id: "trx-004",
    type: "refund",
    amount: 500000,
    description: "Refund Pembatalan Visa Australia",
    date: "2024-03-10",
    status: "completed"
  },
  {
    id: "trx-005",
    type: "bonus",
    amount: 100000,
    description: "Bonus Referral Teman",
    date: "2024-03-08",
    status: "completed"
  },
  {
    id: "trx-006",
    type: "payment",
    amount: -800000,
    description: "Pembayaran Visa Singapura",
    date: "2024-03-07",
    status: "completed",
    orderId: "WP-2024-003"
  },
  {
    id: "trx-007",
    type: "topup",
    amount: 1500000,
    description: "Top Up Saldo via Bank Transfer",
    date: "2024-03-05",
    status: "completed"
  },
  {
    id: "trx-008",
    type: "payment",
    amount: -1100000,
    description: "Pembayaran Visa Schengen",
    date: "2024-03-03",
    status: "completed",
    orderId: "WP-2024-004"
  },
  {
    id: "trx-009",
    type: "bonus",
    amount: 50000,
    description: "Bonus Review Aplikasi",
    date: "2024-03-01",
    status: "completed"
  },
  {
    id: "trx-010",
    type: "payment",
    amount: -750000,
    description: "Pembayaran Visa Thailand",
    date: "2024-02-28",
    status: "completed",
    orderId: "WP-2024-005"
  },
  {
    id: "trx-011",
    type: "refund",
    amount: 300000,
    description: "Refund Biaya Admin",
    date: "2024-02-25",
    status: "completed"
  },
  {
    id: "trx-012",
    type: "topup",
    amount: 1000000,
    description: "Top Up Saldo via E-Wallet",
    date: "2024-02-22",
    status: "completed"
  }
];

const mockVouchers: Voucher[] = [
  {
    id: "voucher-001",
    code: "NEWUSER50",
    title: "Diskon User Baru",
    description: "Diskon 50% untuk aplikasi visa pertama",
    discountType: "percentage",
    discountValue: 50,
    minAmount: 500000,
    validUntil: "2024-12-31",
    status: "active",
    usageCount: 0,
    usageLimit: 1
  },
  {
    id: "voucher-002",
    code: "FAMILY100K",
    title: "Diskon Keluarga",
    description: "Potongan Rp 100.000 untuk visa keluarga",
    discountType: "fixed",
    discountValue: 100000,
    minAmount: 1000000,
    validUntil: "2024-06-30",
    status: "active",
    usageCount: 0,
    usageLimit: 3
  },
  {
    id: "voucher-003",
    code: "STUDENT25",
    title: "Diskon Pelajar",
    description: "Diskon 25% khusus pelajar dan mahasiswa",
    discountType: "percentage",
    discountValue: 25,
    minAmount: 300000,
    validUntil: "2024-08-31",
    status: "active",
    usageCount: 0,
    usageLimit: 2
  },
  {
    id: "voucher-004",
    code: "WEEKEND15",
    title: "Diskon Weekend",
    description: "Diskon 15% untuk aplikasi di akhir pekan",
    discountType: "percentage",
    discountValue: 15,
    minAmount: 400000,
    validUntil: "2024-05-31",
    status: "active",
    usageCount: 1,
    usageLimit: 5
  },
  {
    id: "voucher-005",
    code: "LOYALTY200K",
    title: "Voucher Loyalitas",
    description: "Potongan Rp 200.000 untuk member setia",
    discountType: "fixed",
    discountValue: 200000,
    minAmount: 1500000,
    validUntil: "2024-07-15",
    status: "active",
    usageCount: 0,
    usageLimit: 1
  },
  {
    id: "voucher-006",
    code: "FLASH30",
    title: "Flash Sale 30%",
    description: "Diskon kilat 30% terbatas waktu",
    discountType: "percentage",
    discountValue: 30,
    minAmount: 600000,
    validUntil: "2024-04-15",
    status: "active",
    usageCount: 0,
    usageLimit: 10
  },
  {
    id: "voucher-007",
    code: "EXPIRED20",
    title: "Voucher Kadaluarsa",
    description: "Diskon 20% sudah tidak berlaku",
    discountType: "percentage", 
    discountValue: 20,
    validUntil: "2024-02-28",
    status: "expired",
    usageCount: 1,
    usageLimit: 1
  },
  {
    id: "voucher-008",
    code: "OLDPROMO",
    title: "Promo Lama",
    description: "Voucher promo yang sudah berakhir",
    discountType: "fixed",
    discountValue: 150000,
    validUntil: "2024-01-31",
    status: "expired",
    usageCount: 2,
    usageLimit: 3
  },
  {
    id: "voucher-009",
    code: "USED50K",
    title: "Voucher Terpakai",
    description: "Voucher yang sudah digunakan",
    discountType: "fixed",
    discountValue: 50000,
    validUntil: "2024-06-30",
    status: "used",
    usageCount: 1,
    usageLimit: 1
  }
];

export function WalletContent() {
  const [activeTab, setActiveTab] = useState<'balance' | 'vouchers'>('balance');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  
  // Pagination states
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [currentVoucherPage, setCurrentVoucherPage] = useState(1);
  const itemsPerPage = 5;

  const currentBalance = 2500000;
  const activeVouchers = mockVouchers.filter(v => v.status === 'active');
  const expiredVouchers = mockVouchers.filter(v => v.status === 'expired');
  const usedVouchers = mockVouchers.filter(v => v.status === 'used');
  const allVouchers = [...activeVouchers, ...usedVouchers, ...expiredVouchers];

  // Pagination calculations for transactions
  const totalTransactionPages = Math.ceil(mockTransactions.length / itemsPerPage);
  const startTransactionIndex = (currentTransactionPage - 1) * itemsPerPage;
  const endTransactionIndex = startTransactionIndex + itemsPerPage;
  const currentTransactions = mockTransactions.slice(startTransactionIndex, endTransactionIndex);

  // Pagination calculations for vouchers
  const totalVoucherPages = Math.ceil(allVouchers.length / itemsPerPage);
  const startVoucherIndex = (currentVoucherPage - 1) * itemsPerPage;
  const endVoucherIndex = startVoucherIndex + itemsPerPage;
  const currentVouchers = allVouchers.slice(startVoucherIndex, endVoucherIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'topup': return ArrowDownIcon;
      case 'payment': return ArrowUpIcon;
      case 'refund': return ArrowDownIcon;
      case 'bonus': return ArrowDownIcon;
      default: return WalletIcon;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'topup': return 'text-green-600 bg-green-50';
      case 'payment': return 'text-red-600 bg-red-50';
      case 'refund': return 'text-blue-600 bg-blue-50';
      case 'bonus': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange, itemType }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemType: string;
  }) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 4) {
          pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      return pages;
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = itemType === 'transaksi' ? mockTransactions.length : allVouchers.length;

    return (
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} {itemType}
        </p>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                onClick={() => typeof page === 'number' && onPageChange(page)}
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
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-navy mb-2">
          Saldo & Voucher
        </h1>
        <p className="font-dm-sans text-gray-600">
          Kelola saldo dan voucher Anda
        </p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-orange to-orange-600 rounded-2xl shadow-md p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <WalletIcon className="w-8 h-8" />
              <h3 className="font-poppins font-bold text-lg">Saldo Utama</h3>
            </div>
            <p className="font-poppins font-bold text-3xl mb-4">
              {formatCurrency(currentBalance)}
            </p>
            <button
              onClick={() => setShowTopUpModal(true)}
              className="bg-white text-orange font-poppins font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Top Up
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl shadow-md p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <TicketIcon className="w-8 h-8" />
              <h3 className="font-poppins font-bold text-lg">Voucher Aktif</h3>
            </div>
            <p className="font-poppins font-bold text-3xl mb-2">
              {activeVouchers.length}
            </p>
            <p className="font-dm-sans text-white/90 text-sm">
              Voucher tersedia
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon className="w-8 h-8" />
              <h3 className="font-poppins font-bold text-lg">Total Transaksi</h3>
            </div>
            <p className="font-poppins font-bold text-3xl mb-2">
              {mockTransactions.length}
            </p>
            <p className="font-dm-sans text-white/90 text-sm">
              Bulan ini
            </p>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-md p-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab('balance')}
            className={`flex-1 py-3 px-4 rounded-xl font-poppins font-semibold text-sm transition-colors ${
              activeTab === 'balance'
                ? 'bg-orange text-white'
                : 'text-gray-600 hover:text-orange'
            }`}
          >
            Riwayat Transaksi
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`flex-1 py-3 px-4 rounded-xl font-poppins font-semibold text-sm transition-colors ${
              activeTab === 'vouchers'
                ? 'bg-orange text-white'
                : 'text-gray-600 hover:text-orange'
            }`}
          >
            Voucher Saya
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'balance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="font-poppins font-bold text-lg text-navy mb-6">
            Riwayat Transaksi
          </h3>
          
          <div className="space-y-4">
            {currentTransactions.map((transaction, index) => {
              const IconComponent = getTransactionIcon(transaction.type);
              const isPositive = transaction.amount > 0;
              
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold text-base text-navy">
                        {transaction.description}
                      </h4>
                      <p className="font-dm-sans text-sm text-gray-600">
                        {formatDate(transaction.date)}
                        {transaction.orderId && ` • ${transaction.orderId}`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-poppins font-bold text-lg ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <div className="flex items-center gap-1">
                      {transaction.status === 'completed' ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      ) : transaction.status === 'pending' ? (
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-dm-sans text-xs text-gray-500 capitalize">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Transaction Pagination */}
          <Pagination
            currentPage={currentTransactionPage}
            totalPages={totalTransactionPages}
            onPageChange={setCurrentTransactionPage}
            itemType="transaksi"
          />
        </motion.div>
      )}

      {activeTab === 'vouchers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="font-poppins font-bold text-lg text-navy mb-6">
            Semua Voucher
          </h3>

          {allVouchers.length > 0 ? (
            <>
              <div className="space-y-3">
                {currentVouchers.map((voucher, index) => {
                  const daysLeft = getDaysUntilExpiry(voucher.validUntil);
                  const isExpiringSoon = daysLeft <= 7 && voucher.status === 'active';
                  
                  return (
                    <motion.div
                      key={voucher.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          voucher.status === 'active' 
                            ? 'bg-orange-100 text-orange' 
                            : voucher.status === 'used'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <TagIcon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-poppins font-bold text-base text-navy">
                              {voucher.title}
                            </h4>
                            <span className={`font-poppins font-bold text-sm px-2 py-1 rounded ${
                              voucher.status === 'active' 
                                ? 'bg-orange text-white' 
                                : voucher.status === 'used'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-400 text-white'
                            }`}>
                              {voucher.code}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              voucher.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : voucher.status === 'used'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {voucher.status === 'active' && 'Aktif'}
                              {voucher.status === 'used' && 'Terpakai'}
                              {voucher.status === 'expired' && 'Kadaluarsa'}
                            </span>
                            {isExpiringSoon && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                {daysLeft} hari lagi
                              </span>
                            )}
                          </div>
                          
                          <p className="font-dm-sans text-sm text-gray-600 mb-1">
                            {voucher.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Berlaku hingga {formatDate(voucher.validUntil)}</span>
                            {voucher.minAmount && (
                              <span>Min. {formatCurrency(voucher.minAmount)}</span>
                            )}
                            <span>{voucher.usageCount}/{voucher.usageLimit} terpakai</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <span className={`font-poppins font-bold text-xl ${
                          voucher.status === 'active' 
                            ? 'text-orange' 
                            : voucher.status === 'used'
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}>
                          {voucher.discountType === 'percentage' 
                            ? `${voucher.discountValue}%` 
                            : formatCurrency(voucher.discountValue)
                          }
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Voucher Pagination */}
              <Pagination
                currentPage={currentVoucherPage}
                totalPages={totalVoucherPages}
                onPageChange={setCurrentVoucherPage}
                itemType="voucher"
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TicketIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
                Belum ada voucher
              </h3>
              <p className="font-dm-sans text-gray-600">
                Voucher akan muncul di sini ketika Anda mendapatkannya
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}