'use client';

import { useState } from 'react';
import { TemplateType, Language, SponsorFormData } from '@/lib/tools/sponsor-letter/types';

export function useSponsorLetterState() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [formData, setFormData] = useState<SponsorFormData>({
    applicantName: '',
    passportNumber: '',
    birthDate: '',
    destinationCountry: '',
    departureDate: '',
    returnDate: '',
    destinationCity: '',
  });
  const [language, setLanguage] = useState<Language>('id');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (field: keyof SponsorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextStep = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const generatePDF = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const { generateSponsorLetterPDF } = await import('@/lib/tools/sponsor-letter/pdf-generator');
      const url = await generateSponsorLetterPDF(selectedTemplate, language, formData);
      setPdfUrl(url);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setError('Gagal generate PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const retryGenerate = () => {
    setError(null);
    generatePDF();
  };

  const reset = () => {
    setStep(1);
    setSelectedTemplate(null);
    setFormData({
      applicantName: '',
      passportNumber: '',
      birthDate: '',
      destinationCountry: '',
      departureDate: '',
      returnDate: '',
      destinationCity: '',
    });
    setLanguage('id');
    setIsGenerating(false);
    setPdfUrl(null);
    setError(null);
  };

  return {
    step,
    selectedTemplate,
    formData,
    language,
    isGenerating,
    pdfUrl,
    error,
    setSelectedTemplate,
    updateFormData,
    setLanguage,
    goToNextStep,
    goToPreviousStep,
    generatePDF,
    retryGenerate,
    reset,
  };
}
