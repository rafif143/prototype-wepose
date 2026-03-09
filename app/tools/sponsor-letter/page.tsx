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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Language Toggle */}
      {step !== 1 && (
        <div className="bg-navy py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-h3 text-white">Generator Surat Sponsor</h1>
            <LanguageToggle language={language} onToggle={setLanguage} />
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <StepIndicator currentStep={step} completedSteps={completedSteps} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
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
              <div>
                <div className="bg-white rounded-card border border-gray-200 shadow-card p-6">
                  <h2 className="text-h3 text-navy mb-6">
                    Isi Data Surat Sponsor
                  </h2>
                  <SponsorForm
                    template={selectedTemplate}
                    formData={formData}
                    onUpdateField={updateFormData}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={goToPreviousStep}
                      className="px-6 py-3 rounded-button border border-gray-200 text-navy font-poppins font-semibold text-[15px] hover:border-orange hover:bg-orange-50 transition-all duration-200"
                    >
                      ← Kembali
                    </button>
                    <button
                      onClick={goToNextStep}
                      className="flex-1 px-6 py-3 rounded-button bg-orange text-white font-poppins font-semibold text-[15px] hover:bg-orange-dark hover:shadow-cta-hover transition-all duration-200"
                    >
                      Lanjut ke Generate →
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Column - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <LetterPreview
                  template={selectedTemplate}
                  language={language}
                  formData={formData}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && selectedTemplate && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
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
  );
}
