# Implementation Plan: WEPOSE Premium Tools

## Overview

This implementation plan breaks down the WEPOSE Premium Tools feature into actionable coding tasks. The feature includes three interactive premium tools: Quiz Kelayakan Visa, Visa Comparison Tool, and Sponsor Letter Generator. All tools use Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion for animations.

## Tasks

- [x] 1. Setup project infrastructure and shared utilities
  - Create directory structure for tools (app/tools/quiz, app/tools/compare, app/tools/sponsor-letter)
  - Create shared components directory (components/tools/shared)
  - Set up animation utilities with Framer Motion variants (utils/animations.ts)
  - Create validation helpers (utils/validation.ts)
  - Configure Tailwind with custom colors (navy, orange, purple) and design tokens
  - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 27.4, 27.5, 27.6_

- [ ]* 1.1 Write property test for animation configuration
  - **Property 16: Reduced Motion Compliance**
  - **Validates: Requirements 24.2, 24.3**

- [x] 2. Implement shared components
  - [x] 2.1 Create base Modal component with AnimatePresence
    - Implement modal overlay with fade animation
    - Add focus trap and Escape key handler
    - Support close on overlay click
    - _Requirements: 11.7, 11.8, 29.3, 29.8, 29.9, 29.10_
  
  - [x] 2.2 Create reusable Paywall component
    - Implement paywall modal layout with lock icon, badge, pricing
    - Add value propositions list with checkmarks
    - Create primary and secondary CTA buttons
    - Support different pricing (quiz: Rp 25.000, sponsor letter: Rp 15.000)
    - _Requirements: 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 14.2, 14.3, 14.4, 14.5, 14.6_
  
  - [ ]* 2.3 Write property test for modal focus management
    - **Property 19: Modal Focus Management**
    - **Validates: Requirements 29.8, 29.9, 29.10**

- [x] 3. Implement Quiz Kelayakan Visa tool
  - [x] 3.1 Create quiz data structure and questions
    - Define QuizQuestion and QuizOption TypeScript interfaces
    - Create 8 quiz questions with categories, options, and emojis
    - Implement questions data file (lib/tools/quiz/questions.ts)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10_
  
  - [x] 3.2 Create useQuizState custom hook
    - Implement state management for current question, answers, unlock status
    - Add navigation functions (goToNext, goToPrevious)
    - Implement paywall check at question 4
    - Add result trigger when all questions answered
    - _Requirements: 30.1, 30.2, 30.3_
  
  - [ ]* 3.3 Write property test for quiz navigation consistency
    - **Property 1: Quiz Navigation Consistency**
    - **Validates: Requirements 3.1, 3.4**
  
  - [x] 3.4 Create ProgressBar component
    - Implement fixed top progress bar with 3px height
    - Add smooth width animation based on current question
    - Style with navy background and orange fill
    - _Requirements: 1.4, 1.5_
  
  - [ ]* 3.5 Write property test for progress bar accuracy
    - **Property 2: Progress Bar Accuracy**
    - **Validates: Requirements 1.5**
  
  - [x] 3.6 Create QuizScreen component
    - Implement full-screen layout with gradient background and noise texture
    - Add category label, question text, and question counter
    - Create back and close buttons with conditional visibility
    - Implement AnimatePresence for question transitions
    - _Requirements: 1.1, 1.2, 1.6, 1.7, 1.8, 1.9, 1.10, 2.1, 2.2, 2.3_
  
  - [x] 3.7 Create QuizOptions component
    - Implement responsive grid layout (2 columns for 4 options, 1 column for 2-3)
    - Create option cards with emoji, label, and interaction states
    - Add hover, selected, and tap animations
    - Show "Lanjut →" button when answer selected
    - _Requirements: 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12_
  
  - [ ]* 3.8 Write property test for answer selection
    - **Property 5: Answer Selection Shows Next Button**
    - **Validates: Requirements 2.11**
  
  - [ ]* 3.9 Write property test for grid layout adaptation
    - **Property 6: Grid Layout Adapts to Option Count**
    - **Validates: Requirements 2.5, 2.6**
  
  - [x] 3.10 Create QuizPaywall component
    - Integrate shared Paywall component with quiz-specific content
    - Implement paywall trigger logic at question 4
    - Add purchase and bundle handlers
    - _Requirements: 5.1, 5.2, 5.13_
  
  - [ ]* 3.11 Write property test for paywall access control
    - **Property 3: Paywall Access Control**
    - **Validates: Requirements 5.2, 5.3, 5.4**
  
  - [x] 3.12 Create recommendation logic
    - Implement calculateRecommendation function based on answers
    - Add rule-based visa matching (destination + purpose)
    - Calculate approval level and percentage
    - Generate personalized tips and document checklist
    - _Requirements: 6.1_
  
  - [x] 3.13 Create QuizResult component
    - Implement result page layout with visa recommendation
    - Create ApprovalMeter with animated progress bar and color coding
    - Add tips section and document checklist
    - Implement stagger animation for all elements
    - Add CTA buttons (Apply, Save, Restart)
    - _Requirements: 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 6.12, 6.13, 6.14, 6.15, 6.16, 6.17, 6.18_
  
  - [ ]* 3.14 Write property test for quiz completion
    - **Property 4: Quiz Completion Triggers Result**
    - **Validates: Requirements 6.1**
  
  - [x] 3.15 Create quiz page and integrate all components
    - Create app/tools/quiz/page.tsx with quiz orchestration
    - Create app/tools/quiz/layout.tsx to hide Navbar/Footer
    - Wire up all quiz components with state management
    - Implement question transitions with AnimatePresence
    - _Requirements: 1.3, 27.1, 27.4, 27.8_

- [x] 4. Checkpoint - Ensure quiz tool works end-to-end
  - Test quiz flow from question 1 to results
  - Verify paywall appears at question 4 for non-premium users
  - Check all animations and transitions
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Visa Comparison Tool
  - [x] 5.1 Create comparison data structures and types
    - Define VisaData and ComparisonCriteria TypeScript interfaces
    - Create criteria configuration with 8 comparison criteria
    - Add icons and labels for each criterion
    - _Requirements: 9.6, 9.7_
  
  - [x] 5.2 Create useCompareState custom hook
    - Implement state for selected visas (max 3)
    - Add functions to add/remove visas
    - Implement modal visibility state
    - Add canCompare computed property (>= 2 visas)
    - _Requirements: 30.4, 30.5_
  
  - [x] 5.3 Create StickyCompareBar component
    - Implement fixed bottom bar with navy background
    - Add visa thumbnails with remove buttons
    - Show visa counter and compare button
    - Implement slide-up animation with AnimatePresence
    - Add responsive behavior (hide counter on mobile)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 25.6_
  
  - [ ]* 5.4 Write property test for compare bar visibility
    - **Property 7: Comparison Bar Visibility**
    - **Validates: Requirements 7.1, 7.11**
  
  - [ ]* 5.5 Write property test for compare button enablement
    - **Property 8: Comparison Button Enablement**
    - **Validates: Requirements 7.9**
  
  - [x] 5.6 Create comparison highlighting logic
    - Implement calculateHighlights function for best/worst values
    - Add price parsing and comparison logic
    - Add process time parsing and comparison logic
    - _Requirements: 9.10, 9.11_
  
  - [ ]* 5.7 Write property test for table highlighting
    - **Property 9: Comparison Table Highlighting**
    - **Validates: Requirements 9.10, 9.11**
  
  - [x] 5.8 Create CompareTable component
    - Implement responsive table with sticky header
    - Create 8 criteria rows with icons and labels
    - Add visa columns with data cells
    - Implement best/worst highlighting with green/red backgrounds
    - Add horizontal scroll for mobile
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.8, 9.9, 9.12, 25.4, 25.5_
  
  - [x] 5.9 Create AddVisaModal component
    - Implement search modal with input and autofocus
    - Add real-time visa filtering
    - Create visa list items with select buttons
    - Add empty state for no results
    - Implement modal animations
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.9, 25.9, 31.4_
  
  - [ ]* 5.10 Write property test for empty search results
    - **Property 22: Empty Search Results Handling**
    - **Validates: Requirements 31.4**
  
  - [x] 5.11 Create RecommendBanner component
    - Implement banner with orange background and border
    - Add sparkles icon and recommendation text
    - Show visa name with flag and reason
    - Add apply button
    - Implement fade-in animation with delay
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_
  
  - [ ]* 5.12 Write property test for recommendation banner display
    - **Property 10: Recommendation Banner Conditional Display**
    - **Validates: Requirements 10.1, 10.9**
  
  - [x] 5.13 Create comparison page and integrate components
    - Create app/tools/compare/page.tsx with header and layout
    - Add empty state with "Tambah Visa" cards
    - Integrate CompareTable with highlighting logic
    - Add RecommendBanner for logged-in users
    - Wire up AddVisaModal
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 27.2, 27.5, 27.9_

- [x] 6. Checkpoint - Ensure comparison tool works end-to-end
  - Test adding and removing visas
  - Verify sticky bar appears and persists
  - Check table highlighting logic
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement Sponsor Letter Generator tool
  - [x] 7.1 Create sponsor letter data structures
    - Define TemplateType, Language, SponsorFormData TypeScript interfaces
    - Create TemplateConfig for 3 templates (keluarga, perusahaan, pribadi)
    - Define required fields for each template
    - _Requirements: 13.9, 13.10, 13.11_
  
  - [x] 7.2 Create useSponsorLetterState custom hook
    - Implement state for step, template, formData, language
    - Add form update functions
    - Implement step navigation with validation
    - Add PDF generation state (isGenerating, pdfUrl)
    - _Requirements: 30.6, 30.7, 30.8, 30.9, 30.10_
  
  - [x] 7.3 Create StepIndicator component
    - Implement 3-step progress indicator with sticky positioning
    - Add step states (completed, active, pending) with colors
    - Create connector lines between steps
    - Add step labels and icons
    - _Requirements: 12.9, 12.10, 12.11, 12.12, 12.13, 12.14_
  
  - [x] 7.4 Create TemplateSelector component
    - Implement 3 template cards in responsive grid
    - Add template preview thumbnails
    - Show "Paling Populer" badge on Keluarga template
    - Implement hover and selected states
    - Add "Lanjut ke Review & Edit" button with conditional enable
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.12, 13.13, 13.14, 13.15, 25.7_
  
  - [ ]* 7.5 Write property test for template selection
    - **Property 11: Template Selection Enables Next Button**
    - **Validates: Requirements 13.14**
  
  - [x] 7.6 Create SponsorLetterPaywall component
    - Integrate shared Paywall with sponsor letter pricing (Rp 15.000)
    - Implement paywall check before step 2
    - _Requirements: 14.1, 14.6, 14.7_
  
  - [ ]* 7.7 Write property test for sponsor letter paywall
    - **Property 28: Sponsor Letter Paywall Check**
    - **Validates: Requirements 14.1, 14.7**
  
  - [x] 7.8 Create form field components for each template
    - Implement form fields for Keluarga template (Data Pemohon, Data Sponsor, Detail Perjalanan)
    - Implement form fields for Perusahaan template (with company-specific fields)
    - Implement form fields for Pribadi template (simplified fields)
    - Add form validation and error display
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 18.1, 18.2, 18.3, 18.4, 18.5, 31.2_
  
  - [ ]* 7.9 Write property test for template-specific fields
    - **Property 14: Template-Specific Form Fields**
    - **Validates: Requirements 16.1-16.6, 17.1-17.7, 18.1-18.5**
  
  - [x] 7.10 Create SponsorForm component
    - Implement two-column layout (desktop) with form sections
    - Add "Ambil dari Profil" button
    - Implement input styling with focus states
    - Add responsive single-column layout for mobile
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 25.8_
  
  - [x] 7.11 Create letter content templates
    - Create letter text for each template in Indonesian
    - Create letter text for each template in English
    - Implement getLetterBody function with template and language support
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9_
  
  - [x] 7.12 Create LetterPreview component
    - Implement A4 aspect ratio preview container
    - Add letter structure with title, sponsor data, applicant data
    - Implement live text updates with fade animation
    - Add yellow highlight for empty fields with placeholders
    - Support language toggle with content swap animation
    - _Requirements: 15.9, 15.10, 15.11, 15.12, 15.13, 19.10_
  
  - [ ]* 7.13 Write property test for live preview sync
    - **Property 12: Live Preview Synchronization**
    - **Validates: Requirements 15.12**
  
  - [ ]* 7.14 Write property test for language toggle
    - **Property 13: Language Toggle Updates Preview**
    - **Validates: Requirements 19.10**
  
  - [x] 7.15 Create LanguageToggle component
    - Implement pill toggle with Indonesian and English options
    - Add flag emojis and labels
    - Style selected and unselected states
    - _Requirements: 12.6, 12.7, 12.8_
  
  - [x] 7.16 Create mobile preview accordion
    - Implement accordion for mobile viewport
    - Add "Lihat Preview Surat" trigger button
    - Implement expand/collapse animation
    - Add icon rotation on toggle
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_
  
  - [x] 7.17 Create GenerateStep component - Before Generate state
    - Implement review card with document icon
    - Add summary box with template, language, applicant, destination
    - Create "Kembali & Edit" and "Generate PDF" buttons
    - Add trust note with lock emoji
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8, 21.9_
  
  - [x] 7.18 Create GenerateStep component - Loading state
    - Implement loading animation with bouncing document icon
    - Add progress bar with 0-100% animation
    - Show loading text with dot animation
    - Add blur overlay
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5, 22.6_
  
  - [x] 7.19 Create GenerateStep component - Success state
    - Implement success card with green checkmark and bounce animation
    - Add PDF preview with gradient overlay
    - Create action buttons (Download, Save to Vault, Share WhatsApp, Generate Again)
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9, 23.10_
  
  - [ ]* 7.20 Write property test for PDF generation states
    - **Property 27: PDF Generation State Transitions**
    - **Validates: Requirements 21.1-21.9, 22.1-22.6, 23.1-23.10**
  
  - [x] 7.21 Create PDF generation logic
    - Implement generateSponsorLetterPDF function using jsPDF
    - Add letter formatting with proper spacing and fonts
    - Support all 3 templates and both languages
    - Generate blob URL for preview and download
    - _Requirements: 23.1_
  
  - [x] 7.22 Create sponsor letter page and integrate components
    - Create app/tools/sponsor-letter/page.tsx with header and step wizard
    - Integrate StepIndicator, TemplateSelector, SponsorForm, LetterPreview, GenerateStep
    - Wire up state management and step navigation
    - Add language toggle in header
    - Implement paywall check
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 15.2, 27.3, 27.6, 27.10_

- [x] 8. Checkpoint - Ensure sponsor letter tool works end-to-end
  - Test all 3 templates with form filling
  - Verify live preview updates correctly
  - Check language toggle functionality
  - Test PDF generation flow
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement responsive design and accessibility
  - [x] 9.1 Add responsive breakpoints and mobile styles
    - Implement mobile-first CSS with Tailwind breakpoints
    - Add responsive font sizes for quiz questions
    - Implement horizontal scroll for comparison table on mobile
    - Add single-column layout for sponsor letter form on mobile
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.7, 25.8, 25.9, 25.10_
  
  - [ ]* 9.2 Write property test for responsive layout
    - **Property 17: Responsive Layout Adaptation**
    - **Validates: Requirements 15.2, 20.1-20.5, 25.8**
  
  - [x] 9.3 Implement keyboard navigation
    - Add Tab navigation support for all interactive elements
    - Implement Enter/Space activation for cards and buttons
    - Add Escape key handler for modals
    - Ensure focus visible indicators on all elements
    - _Requirements: 29.1, 29.2, 29.3_
  
  - [ ]* 9.4 Write property test for keyboard navigation
    - **Property 18: Keyboard Navigation Accessibility**
    - **Validates: Requirements 29.1, 29.2, 29.3**
  
  - [x] 9.5 Add ARIA labels and attributes
    - Add aria-label to icon-only buttons
    - Implement aria-valuenow/min/max for progress bars
    - Add aria-disabled to disabled buttons
    - Connect form labels with for attributes
    - _Requirements: 29.4, 29.5, 29.6, 29.7_
  
  - [x] 9.6 Implement reduced motion support
    - Add useReducedMotion hook from Framer Motion
    - Disable transform and transition animations when preferred
    - Create useAnimationConfig utility
    - _Requirements: 24.2, 24.3_

- [x] 10. Implement error handling and validation
  - [x] 10.1 Add form validation
    - Implement validation rules for required fields
    - Add format validation (dates, phone numbers, passport)
    - Show error messages below invalid fields
    - Disable submit until all errors resolved
    - _Requirements: 31.2_
  
  - [ ]* 10.2 Write property test for form validation errors
    - **Property 21: Form Validation Error Display**
    - **Validates: Requirements 31.2**
  
  - [x] 10.3 Add error states for API failures
    - Implement payment error handling with retry button
    - Add PDF generation error state with error icon and message
    - Create network error toast notifications
    - _Requirements: 31.1, 31.3, 31.5, 31.6, 31.7_
  
  - [x] 10.4 Add input sanitization
    - Implement sanitizeInput function using DOMPurify
    - Apply sanitization to all form inputs
    - _Requirements: Security considerations_

- [x] 11. Implement performance optimizations
  - [x] 11.1 Add code splitting with dynamic imports
    - Lazy load QuizPaywall and QuizResult components
    - Lazy load GenerateStep component
    - Use Next.js dynamic imports
    - _Requirements: 32.2, 32.3_
  
  - [x] 11.2 Add debouncing for search and preview
    - Create useDebounce custom hook
    - Apply debouncing to visa search input (300ms)
    - Apply debouncing to live preview updates (150ms)
    - _Requirements: 32.4, 32.5_
  
  - [x] 11.3 Add React.memo for heavy components
    - Memoize CompareTable component
    - Memoize LetterPreview component
    - Add useMemo for expensive calculations
    - _Requirements: 32.6_
  
  - [x] 11.4 Optimize animations for performance
    - Use CSS transform and opacity for hardware acceleration
    - Ensure 60fps animation frame rate
    - _Requirements: 32.7_

- [x] 12. Add analytics and monitoring
  - Create trackEvent function for analytics
  - Add event tracking for quiz completion
  - Add event tracking for PDF generation
  - Add event tracking for comparison usage
  - _Requirements: Deployment considerations_

- [x] 13. Final integration and testing
  - [x] 13.1 Integrate all tools with existing WEPOSE platform
    - Ensure Navbar appears on comparison and sponsor letter pages
    - Verify design consistency with landing page
    - Test navigation between tools and main site
    - _Requirements: 26.1, 26.3, 26.4, 26.6, 26.7, 26.8, 26.9, 26.10_
  
  - [x] 13.2 Run full test suite
    - Execute all unit tests
    - Execute all property-based tests
    - Run integration tests for complete flows
    - Check test coverage (target: 80%+)
  
  - [x] 13.3 Perform manual testing
    - Test all tools on desktop (Chrome, Firefox, Safari)
    - Test all tools on mobile (iOS Safari, Chrome Mobile)
    - Verify all animations and transitions
    - Test keyboard navigation throughout
    - Verify screen reader compatibility

- [x] 14. Final checkpoint - Complete feature verification
  - All three tools working end-to-end
  - All property-based tests passing
  - Responsive design verified on all breakpoints
  - Accessibility requirements met
  - Performance targets achieved
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations
- Checkpoints ensure incremental validation throughout implementation
- All code uses TypeScript for type safety
- Framer Motion is used for all animations with reduced motion support
- Mobile-first responsive design with Tailwind CSS breakpoints
- Focus on minimal, functional implementations - avoid over-engineering
