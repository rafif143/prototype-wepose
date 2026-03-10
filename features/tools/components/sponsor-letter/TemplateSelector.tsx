'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { templates, TemplateType } from '@/features/tools/lib/sponsor-letter/types';
import { staggerContainer, fadeInUp } from '@/shared/utils/animations';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon 
} from '@heroicons/react/24/outline';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType | null;
  onSelectTemplate: (template: TemplateType | null) => void;
  onNext: () => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}: TemplateSelectorProps) {
  // Map template IDs to heroicons
  const getTemplateIcon = (templateId: TemplateType) => {
    switch (templateId) {
      case 'keluarga':
        return UserGroupIcon;
      case 'perusahaan':
        return BuildingOfficeIcon;
      case 'pribadi':
        return BriefcaseIcon;
      default:
        return BriefcaseIcon;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative">

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center pt-8 pb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-poppins font-black bg-gradient-to-r from-navy via-navy-mid to-navy bg-clip-text text-transparent mb-6 leading-tight"
            >
              Pilih Template
              <br />
              <span className="bg-gradient-to-r from-orange via-orange-dark to-orange bg-clip-text text-transparent">
                Surat Sponsor
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-dm-sans"
            >
              Buat surat sponsor profesional dalam hitungan menit dengan template yang telah 
              <span className="font-semibold text-orange"> disetujui kedutaan internasional</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Template Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => {
              const isSelected = selectedTemplate === template.id;
              const IconComponent = getTemplateIcon(template.id);
              
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                  className="group relative"
                >
                  {/* Card */}
                  <motion.button
                    onClick={() => onSelectTemplate(isSelected ? null : template.id)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full p-6 rounded-2xl transition-all duration-500 text-left overflow-hidden ${
                      isSelected
                        ? 'bg-white shadow-xl shadow-orange/25 ring-2 ring-orange'
                        : 'bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:shadow-navy/20'
                    }`}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-50/50 rounded-2xl" />
                    
                    {/* Template Preview */}
                    <div className="relative mb-6">
                      <motion.div
                        className="w-full h-32 rounded-xl relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Document Preview */}
                        <div className="absolute inset-3 bg-white/90 rounded-lg p-3 shadow-inner">
                          <div className="space-y-1.5">
                            <div className="h-1.5 bg-navy/30 rounded-full w-3/4" />
                            <div className="h-1.5 bg-gray-300 rounded-full w-full" />
                            <div className="h-1.5 bg-gray-300 rounded-full w-5/6" />
                            <div className="h-1 bg-gray-200 rounded-full w-2/3" />
                            <div className="mt-3 space-y-1">
                              <div className="h-0.5 bg-gray-200 rounded-full w-4/5" />
                              <div className="h-0.5 bg-gray-200 rounded-full w-3/4" />
                              <div className="h-0.5 bg-gray-200 rounded-full w-5/6" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Icon */}
                        <motion.div
                          className="absolute bottom-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Template Info */}
                    <div className="relative space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-orange" />
                        </div>
                        <div>
                          <h3 className="text-lg font-poppins font-bold text-navy mb-1">
                            {template.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-success-green rounded-full" />
                            <span className="text-xs text-success-green font-medium">Ready to use</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed font-dm-sans">
                        {template.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="px-2 py-1 bg-orange-50 text-orange font-medium text-xs rounded-full">
                          Professional
                        </span>
                        <span className="px-2 py-1 bg-orange-50 text-orange text-xs font-medium rounded-full">
                          Embassy Approved
                        </span>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-orange to-orange-dark rounded-full flex items-center justify-center shadow-lg z-10"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange/5 via-navy/5 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <p className="text-gray-600 text-lg font-dm-sans font-medium">
              Pilih template untuk melanjutkan
            </p>
          </motion.div>
        </div>

        {/* Sticky Bottom Button - Snackbar Style */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl font-poppins font-bold text-lg bg-gradient-to-r from-orange via-orange-dark to-orange text-white shadow-2xl shadow-orange/30 border border-orange-dark/20 backdrop-blur-sm overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-dark via-orange to-orange-dark"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-3">
                  Continue to Form
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange/20 via-orange-dark/20 to-orange/20 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
