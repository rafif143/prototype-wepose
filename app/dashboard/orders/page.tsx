import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { OrdersContent } from "@/features/dashboard/components/OrdersContent";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrdersContent />
    </DashboardLayout>
  );
}