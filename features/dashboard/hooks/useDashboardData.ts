"use client";

import { useState, useEffect } from "react";
import type { User, Order, Notification, DashboardStats } from "../lib/types";

// Mock data - in real app this would come from API
const mockUser: User = {
  id: "user-1",
  name: "Rafif",
  email: "rafif@example.com",
  phone: "+62 812 3456 7890",
  profileCompletion: 75,
  avatar: undefined
};

const mockStats: DashboardStats = {
  totalOrders: 5,
  activeOrders: 2,
  completedOrders: 3,
  totalSpent: 8500000,
  walletBalance: 2500000,
  activeVouchers: 3,
  unreadNotifications: 2
};

export function useDashboardData() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser);
        setStats(mockStats);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    user,
    stats,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Re-fetch logic here
    }
  };
}