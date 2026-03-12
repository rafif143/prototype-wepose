import { OrderStatus, NotificationType, TransactionType } from './types';

export const formatCurrency = (amount: number, currency: string = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return dateObj.toLocaleDateString('id-ID', { ...defaultOptions, ...options });
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit lalu`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam lalu`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari lalu`;
  } else {
    return formatDate(dateObj);
  }
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'submitted':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'review':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'approved':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'ready':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'completed':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getOrderStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'submitted':
      return 'Diajukan';
    case 'processing':
      return 'Sedang Diproses';
    case 'review':
      return 'Direview';
    case 'approved':
      return 'Disetujui';
    case 'rejected':
      return 'Ditolak';
    case 'ready':
      return 'Siap Diambil';
    case 'completed':
      return 'Selesai';
    default:
      return 'Unknown';
  }
};

export const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return 'text-green-600 bg-green-50';
    case 'warning':
      return 'text-orange-600 bg-orange-50';
    case 'info':
      return 'text-blue-600 bg-blue-50';
    case 'error':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getTransactionTypeLabel = (type: TransactionType): string => {
  switch (type) {
    case 'topup':
      return 'Top Up';
    case 'payment':
      return 'Pembayaran';
    case 'refund':
      return 'Refund';
    case 'bonus':
      return 'Bonus';
    default:
      return 'Unknown';
  }
};

export const getTransactionTypeColor = (type: TransactionType): string => {
  switch (type) {
    case 'topup':
      return 'text-green-600';
    case 'payment':
      return 'text-red-600';
    case 'refund':
      return 'text-blue-600';
    case 'bonus':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};

export const calculateProfileCompletion = (user: any): number => {
  const fields = [
    'name',
    'email', 
    'phone',
    'address',
    'dateOfBirth',
    'nationality',
    'passportNumber',
    'avatar'
  ];
  
  const completedFields = fields.filter(field => user[field] && user[field].trim() !== '');
  return Math.round((completedFields.length / fields.length) * 100);
};

export const getDaysUntilExpiry = (expiryDate: string | Date): number => {
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  const now = new Date();
  const diffInTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffInTime / (1000 * 3600 * 24));
};

export const isExpiringSoon = (expiryDate: string | Date, daysThreshold: number = 7): boolean => {
  const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
  return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};