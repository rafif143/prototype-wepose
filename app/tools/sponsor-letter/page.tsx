'use client';

import { useSponsorLetterState } from '@/features/visa/hooks/useSponsorLetterState';
import { StepIndicator } from '@/features/tools/components/sponsor-letter/StepIndicator';
import { TemplateSelector } from '@/features/tools/components/sponsor-letter/TemplateSelector';
import { SponsorForm } from '@/features/tools/components/sponsor-letter/SponsorForm';
import { LetterPreview } from '@/features/tools/components/sponsor-letter/LetterPreview';
import { MobilePreviewAccordion } from '@/features/tools/components/sponsor-letter/MobilePreviewAccordion';
import { LanguageToggle } from '@/features/tools/components/sponsor-letter/LanguageToggle';
import { GenerateStep } from '@/features/tools/components/sponsor-letter/GenerateStep';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/shared/layout/Navbar';

export default function SponsorLetterPage() {
  const {
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
  } = useSponsorLetterState();

  const completedSteps = step > 1 ? [1] : [];
  if (step > 2) completedSteps.push(2);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16">
        {/* Background Pattern */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Header with Language Toggle */}
        {step !== 1 && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-gradient-to-r from-navy via-navy-mid to-navy py-6 px-6 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange/5 to-transparent" />
            <div className="relative max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📄</span>
                </div>
                <div>
                  <h1 className="text-2xl font-poppins font-bold text-white">Generator Surat Sponsor</h1>
                  <p className="text-sm text-gray-300">Buat surat sponsor profesional dalam hitungan menit</p>
                </div>
              </div>
              <LanguageToggle language={language} onToggle={setLanguage} />
            </div>
          </motion.div>
        )}

        {/* Step Indicator */}
        <div className="mt-8">
          <StepIndicator currentStep={step} completedSteps={completedSteps} />
        </div>

        {/* Main Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  onNext={goToNextStep}
                />
              </motion.div>
            )}

            {step === 2 && selectedTemplate && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 py-8"
              >
                {/* Mobile Preview Accordion */}
                <MobilePreviewAccordion
                  template={selectedTemplate}
                  language={language}
                  formData={formData}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form Column */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 p-8 relative overflow-hidden">
                      {/* Decorative gradient */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange via-orange-400 to-orange" />
                      
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                          <span className="text-orange text-lg">✏️</span>
                        </div>
                        <h2 className="text-2xl font-poppins font-bold text-navy">
                          Isi Data Surat Sponsor
                        </h2>
                      </div>
                      
                      <SponsorForm
                        template={selectedTemplate}
                        formData={formData}
                        onUpdateField={updateFormData}
                      />

                      {/* Navigation Buttons */}
                      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button
                          onClick={goToPreviousStep}
                          className="px-6 py-3 rounded-xl border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200 flex items-center gap-2"
                        >
                          <span>←</span> Kembali
                        </button>
                        <button
                          onClick={goToNextStep}
                          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange to-orange-600 text-white font-poppins font-semibold text-[15px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          Lanjut ke Generate <span>→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Preview Column - Hidden on mobile, shown on desktop */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="hidden lg:block"
                  >
                    <div className="sticky top-32">
                      <LetterPreview
                        template={selectedTemplate}
                        language={language}
                        formData={formData}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 3 && selectedTemplate && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <GenerateStep
                  template={selectedTemplate}
                  language={language}
                  formData={formData}
                  isGenerating={isGenerating}
                  pdfUrl={pdfUrl}
                  error={error}
                  onGenerate={generatePDF}
                  onRetry={retryGenerate}
                  onBack={goToPreviousStep}
                  onReset={reset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}