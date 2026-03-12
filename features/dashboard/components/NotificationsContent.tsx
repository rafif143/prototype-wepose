"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  orderId?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "success",
    title: "Dokumen Disetujui",
    message: "Dokumen visa Jepang Anda telah disetujui dan sedang diproses ke kedutaan. Estimasi waktu proses 7-10 hari kerja.",
    date: "2024-03-15",
    time: "14:30",
    read: false,
    orderId: "WP-2024-001"
  },
  {
    id: "notif-002",
    type: "warning", 
    title: "Dokumen Perlu Diperbaiki",
    message: "Foto paspor untuk visa Korea perlu diganti dengan background putih polos. Silakan upload ulang dokumen yang sudah diperbaiki.",
    date: "2024-03-15",
    time: "10:15",
    read: false,
    orderId: "WP-2024-002"
  },
  {
    id: "notif-003",
    type: "info",
    title: "Pembayaran Berhasil",
    message: "Pembayaran visa Singapura sebesar Rp 850.000 telah berhasil diproses. Terima kasih atas kepercayaan Anda.",
    date: "2024-03-14",
    time: "16:45",
    read: true,
    orderId: "WP-2024-003"
  },
  {
    id: "notif-004",
    type: "success",
    title: "Visa Siap Diambil",
    message: "Paspor dengan visa Australia Anda sudah siap diambil di kantor pusat Jakarta. Jam operasional 09:00-18:00.",
    date: "2024-03-13",
    time: "09:20",
    read: true,
    orderId: "WP-2024-004"
  },
  {
    id: "notif-005",
    type: "error",
    title: "Aplikasi Visa Ditolak",
    message: "Mohon maaf, aplikasi visa Australia Anda ditolak oleh kedutaan. Tim kami akan menghubungi Anda untuk konsultasi lebih lanjut.",
    date: "2024-03-12",
    time: "11:30",
    read: true,
    orderId: "WP-2024-005"
  },
  {
    id: "notif-006",
    type: "info",
    title: "Reminder: Melengkapi Profil",
    message: "Lengkapi profil Anda untuk mempercepat proses aplikasi visa selanjutnya. Saat ini kelengkapan profil Anda 75%.",
    date: "2024-03-11",
    time: "08:00",
    read: true
  },
  {
    id: "notif-007",
    type: "success",
    title: "Bonus Referral Diterima",
    message: "Selamat! Anda mendapat bonus Rp 100.000 karena berhasil mereferensikan teman. Bonus sudah masuk ke saldo Anda.",
    date: "2024-03-10",
    time: "15:20",
    read: true
  },
  {
    id: "notif-008",
    type: "warning",
    title: "Voucher Akan Berakhir",
    message: "Voucher FAMILY100K akan berakhir dalam 3 hari. Gunakan sekarang untuk mendapat potongan Rp 100.000.",
    date: "2024-03-09",
    time: "12:00",
    read: true
  },
  {
    id: "notif-009",
    type: "success",
    title: "Dokumen Diterima",
    message: "Dokumen visa Thailand Anda telah diterima dan sedang dalam tahap review. Kami akan menginformasikan hasilnya dalam 2-3 hari kerja.",
    date: "2024-03-08",
    time: "13:45",
    read: true,
    orderId: "WP-2024-006"
  },
  {
    id: "notif-010",
    type: "info",
    title: "Update Status Aplikasi",
    message: "Status aplikasi visa Schengen Anda telah diupdate. Silakan cek halaman order untuk detail lebih lanjut.",
    date: "2024-03-07",
    time: "11:20",
    read: true,
    orderId: "WP-2024-007"
  },
  {
    id: "notif-011",
    type: "warning",
    title: "Dokumen Hampir Expired",
    message: "Paspor Anda akan expired dalam 6 bulan. Pastikan untuk memperpanjang sebelum mengajukan visa baru.",
    date: "2024-03-06",
    time: "09:30",
    read: true
  },
  {
    id: "notif-012",
    type: "success",
    title: "Pembayaran Dikonfirmasi",
    message: "Pembayaran untuk visa Malaysia sebesar Rp 650.000 telah dikonfirmasi. Proses aplikasi akan segera dimulai.",
    date: "2024-03-05",
    time: "14:15",
    read: true,
    orderId: "WP-2024-008"
  },
  {
    id: "notif-013",
    type: "info",
    title: "Promo Spesial",
    message: "Dapatkan diskon 20% untuk aplikasi visa keluarga. Promo berlaku hingga akhir bulan ini.",
    date: "2024-03-04",
    time: "10:00",
    read: true
  },
  {
    id: "notif-014",
    type: "error",
    title: "Pembayaran Gagal",
    message: "Pembayaran untuk order WP-2024-009 gagal diproses. Silakan coba lagi atau hubungi customer service.",
    date: "2024-03-03",
    time: "16:30",
    read: true,
    orderId: "WP-2024-009"
  },
  {
    id: "notif-015",
    type: "success",
    title: "Akun Terverifikasi",
    message: "Selamat! Akun Anda telah berhasil diverifikasi. Kini Anda dapat mengakses semua fitur premium kami.",
    date: "2024-03-02",
    time: "12:45",
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success': return CheckCircleIcon;
    case 'warning': return ExclamationTriangleIcon;
    case 'info': return InformationCircleIcon;
    case 'error': return XCircleIcon;
    default: return BellIcon;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success': return 'text-green-600 bg-green-50 border-green-200';
    case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'error': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export function NotificationsContent() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRead, setFilterRead] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredNotifications = notifications.filter(notif => {
    const matchesType = filterType === "all" || notif.type === filterType;
    const matchesRead = filterRead === "all" || 
                       (filterRead === "unread" && !notif.read) ||
                       (filterRead === "read" && notif.read);
    return matchesType && matchesRead;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Pagination component
  const Pagination = () => {
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

    return (
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} dari {filteredNotifications.length} notifikasi
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getRelativeTime = (dateString: string, timeString: string) => {
    const notifDate = new Date(`${dateString} ${timeString}`);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - notifDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays} hari lalu`;
    
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-navy mb-2">
            Notifikasi
          </h1>
          <p className="font-dm-sans text-gray-600">
            Semua notifikasi dan update terbaru
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-colors"
          >
            <CheckIcon className="w-4 h-4" />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <BellIcon className="w-6 h-6 text-orange" />
            </div>
            <div>
              <p className="font-poppins font-bold text-2xl text-navy">
                {notifications.length}
              </p>
              <p className="font-dm-sans text-sm text-gray-600">Total Notifikasi</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="font-poppins font-bold text-2xl text-navy">
                {unreadCount}
              </p>
              <p className="font-dm-sans text-sm text-gray-600">Belum Dibaca</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="font-poppins font-bold text-2xl text-navy">
                {notifications.length - unreadCount}
              </p>
              <p className="font-dm-sans text-sm text-gray-600">Sudah Dibaca</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="font-dm-sans font-medium text-sm text-gray-700">Filter:</span>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              handleFilterChange();
            }}
            className="px-4 py-2 border border-gray-200 rounded-xl font-dm-sans text-sm focus:border-orange focus:outline-none transition-colors appearance-none bg-white"
          >
            <option value="all">Semua Jenis</option>
            <option value="success">Sukses</option>
            <option value="warning">Peringatan</option>
            <option value="info">Informasi</option>
            <option value="error">Error</option>
          </select>

          <select
            value={filterRead}
            onChange={(e) => {
              setFilterRead(e.target.value);
              handleFilterChange();
            }}
            className="px-4 py-2 border border-gray-200 rounded-xl font-dm-sans text-sm focus:border-orange focus:outline-none transition-colors appearance-none bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="unread">Belum Dibaca</option>
            <option value="read">Sudah Dibaca</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-poppins font-bold text-lg text-navy mb-6">
          Daftar Notifikasi
        </h3>

        {currentNotifications.length > 0 ? (
          <>
            <div className="space-y-3">
              {currentNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all ${
                      !notification.read ? 'bg-orange-50 border-orange-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-poppins font-semibold text-base ${
                            !notification.read ? 'text-navy' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="inline-block w-2 h-2 bg-orange rounded-full" />
                          )}
                        </div>
                        
                        <p className={`font-dm-sans text-sm mb-2 line-clamp-2 ${
                          !notification.read ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{getRelativeTime(notification.date, notification.time)}</span>
                          {notification.orderId && (
                            <span>Order: {notification.orderId}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-orange hover:bg-orange-50 rounded-lg transition-colors"
                          title="Tandai sudah dibaca"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus notifikasi"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
              Tidak ada notifikasi
            </h3>
            <p className="font-dm-sans text-gray-600">
              {filterType !== "all" || filterRead !== "all" 
                ? "Tidak ada notifikasi yang sesuai dengan filter"
                : "Belum ada notifikasi untuk ditampilkan"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}