# 🎨 Reusable UI Component Library

Comprehensive, production-ready UI components built with TypeScript, Tailwind CSS, and CVA (Class Variance Authority).

## 📦 Components

### Form Components
- `Input` - Text input with validation
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `QuantityStepper` - Increment/decrement number input

### Layout Components
- `Card` - Container with variants
- `Modal` - Overlay dialog
- `Accordion` - Collapsible content
- `Tabs` - Tabbed interface

### Feedback Components
- `Alert` - Inline notifications
- `Toast` - Floating notifications
- `Spinner` - Loading indicator
- `Progress` - Progress bar
- `Skeleton` - Loading placeholder
- `EmptyState` - No data state

### Interactive Components
- `Badge` - Status labels
- `SearchBar` - Search input
- `Pagination` - Page navigation

## 🚀 Usage Examples

### Input
```tsx
import { Input } from '@/shared/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
</Card>
```

### Modal
```tsx
import { Modal } from '@/shared/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="lg"
>
  <div className="p-6">
    <h2>Modal Title</h2>
    <p>Modal content</p>
  </div>
</Modal>
```

### Toast
```tsx
import { useToast, ToastProvider } from '@/shared/ui';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const { showToast } = useToast();
showToast('success', 'Operation completed!');
```

### Accordion
```tsx
import { Accordion } from '@/shared/ui';

<Accordion
  items={[
    { id: 1, title: 'Question 1', content: 'Answer 1' },
    { id: 2, title: 'Question 2', content: 'Answer 2' },
  ]}
  defaultOpen={1}
/>
```

### Tabs
```tsx
import { Tabs } from '@/shared/ui';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  variant="pills"
/>
```

### Progress
```tsx
import { Progress, StepProgress } from '@/shared/ui';

<Progress value={75} showLabel />
<StepProgress currentStep={2} totalSteps={4} />
```

### Badge
```tsx
import { Badge } from '@/shared/ui';

<Badge variant="success" size="md">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

### Alert
```tsx
import { Alert } from '@/shared/ui';

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>
```

### Spinner
```tsx
import { Spinner, LoadingOverlay } from '@/shared/ui';

<Spinner size="lg" />
<LoadingOverlay message="Processing..." />
```

### Skeleton
```tsx
import { Skeleton, SkeletonCard, SkeletonList } from '@/shared/ui';

<Skeleton variant="rectangular" height={200} />
<SkeletonCard />
<SkeletonList count={5} />
```

## 🎨 Design System

### Colors
- Primary: Orange (#F97316)
- Navy: #1E3A5F
- Success: Green
- Error: Red
- Warning: Yellow
- Info: Blue

### Typography
- Headings: Poppins (font-poppins)
- Body: DM Sans (font-dm-sans)

### Spacing
- Consistent padding/margin scale
- Border radius: rounded-lg (8px), rounded-xl (12px), rounded-2xl (16px)

### Variants
All components support multiple variants using CVA:
- `variant`: Visual style (default, primary, success, error, etc.)
- `size`: Component size (sm, md, lg, xl)

## ♿ Accessibility

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support
- Semantic HTML

## 🔧 Customization

Components use Tailwind CSS and can be customized via:
1. `className` prop for one-off styles
2. CVA variants for consistent variations
3. Tailwind config for global theming

## 📝 Best Practices

1. Always provide labels for form inputs
2. Use error states for validation feedback
3. Include helper text for complex inputs
4. Use appropriate variants for context
5. Maintain consistent spacing
6. Test with keyboard navigation
7. Verify screen reader compatibility

## 🚀 Performance

- Tree-shakeable exports
- Minimal bundle size
- Optimized animations with Framer Motion
- Lazy loading support
