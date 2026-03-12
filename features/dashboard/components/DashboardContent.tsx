"use client";

import { GreetingCard } from "./GreetingCard";
import { ActiveOrders } from "./ActiveOrders";
import { SaldoWidget } from "./SaldoWidget";
import { VoucherWidget } from "./VoucherWidget";
import { QuickActions } from "./QuickActions";
import { NotificationsPreview } from "./NotificationsPreview";

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Greeting Header */}
      <GreetingCard />

      {/* Row 1: Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ActiveOrders />
        </div>
        <div className="lg:col-span-1">
          <SaldoWidget />
        </div>
        <div className="lg:col-span-1">
          <VoucherWidget />
        </div>
      </div>

      {/* Row 2: Quick Actions */}
      <QuickActions />

      {/* Row 3: Notifications */}
      <NotificationsPreview />
    </div>
  );
}