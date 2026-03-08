import { jsPDF } from 'jspdf';
import { TemplateType, Language, SponsorFormData } from './types';
import { getLetterBody } from './content';

export async function generateSponsorLetterPDF(
  template: TemplateType,
  language: Language,
  formData: SponsorFormData
): Promise<string> {
  const { title, body } = getLetterBody(template, language, formData);

  // Create new PDF document (A4 size)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set font
  doc.setFont('helvetica');

  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.text(title, (pageWidth - titleWidth) / 2, 30);

  // Underline title
  doc.setLineWidth(0.5);
  doc.line((pageWidth - titleWidth) / 2, 32, (pageWidth + titleWidth) / 2, 32);

  // Body text
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  // Split body into lines and add to PDF
  const lines = doc.splitTextToSize(body, 170); // 170mm width for margins
  let yPosition = 45;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.getHeight();

  lines.forEach((line: string) => {
    // Add new page if needed
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }

    doc.text(line, 20, yPosition);
    yPosition += lineHeight;
  });

  // Generate blob URL
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return pdfUrl;
}

export function downloadPDF(pdfUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
