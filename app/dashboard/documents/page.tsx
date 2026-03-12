import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { DocumentsContent } from "@/features/dashboard/components/DocumentsContent";

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <DocumentsContent />
    </DashboardLayout>
  );
}