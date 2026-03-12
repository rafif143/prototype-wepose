export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileCompletion: number;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  country: string;
  countryCode: string;
  visaType: string;
  status: OrderStatus;
  statusLabel: string;
  submittedDate: string;
  completedDate?: string;
  documents: Document[];
  timeline: TimelineStep[];
  totalAmount: number;
  paidAmount: number;
  flag: string;
}

export type OrderStatus = 
  | 'draft'
  | 'submitted' 
  | 'processing'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'ready'
  | 'completed';

export interface Document {
  id: string;
  orderId: string;
  name: string;
  type: DocumentType;
  url: string;
  status: DocumentStatus;
  uploadedDate: string;
  notes?: string;
}

export type DocumentType = 
  | 'passport'
  | 'photo'
  | 'bank_statement'
  | 'employment_letter'
  | 'hotel_booking'
  | 'flight_ticket'
  | 'insurance'
  | 'other';

export type DocumentStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'needs_revision';

export interface TimelineStep {
  id: string;
  orderId: string;
  title: string;
  description: string;
  status: TimelineStatus;
  date?: string;
  time?: string;
  note?: string;
  staffName?: string;
  icon: string;
}

export type TimelineStatus = 'completed' | 'current' | 'pending';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdDate: string;
  actionUrl?: string;
}

export type NotificationType = 'success' | 'warning' | 'info' | 'error';

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  createdDate: string;
  orderId?: string;
}

export type TransactionType = 'topup' | 'payment' | 'refund' | 'bonus';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  status: VoucherStatus;
}

export type VoucherStatus = 'active' | 'expired' | 'used' | 'disabled';

export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
  walletBalance: number;
  activeVouchers: number;
  unreadNotifications: number;
}