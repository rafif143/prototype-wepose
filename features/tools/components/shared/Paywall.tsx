'use client';

import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Modal } from './Modal';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onSecondaryAction?: () => void;
  price: string;
  priceUnit: string;
  title: string;
  description: string;
  features: string[];
  primaryButtonText: string;
  secondaryButtonText?: string;
  footerText?: string;
}

export function Paywall({
  isOpen,
  onClose,
  onPurchase,
  onSecondaryAction,
  price,
  priceUnit,
  title,
  description,
  features,
  primaryButtonText,
  secondaryButtonText,
  footerText,
}: PaywallProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md w-full p-8">
      <div className="flex flex-col items-center text-center">
        {/* Lock Icon */}
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <LockClosedIcon className="w-12 h-12 text-orange" />
        </div>

        {/* Premium Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-info-purple/10 border border-info-purple/30 mb-4">
          <span className="text-[11px] font-poppins font-semibold text-info-purple uppercase tracking-wide">
            PREMIUM TOOL
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-poppins font-bold text-navy mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[14px] font-dm-sans text-gray-500 mb-6">
          {description}
        </p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-[32px] font-poppins font-bold text-orange">
            {price}
          </span>
          <span className="text-[14px] font-dm-sans text-gray-400 ml-1">
            {priceUnit}
          </span>
        </div>

        {/* Features */}
        <div className="w-full space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-left">
              <CheckCircleIcon className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
              <span className="text-[13px] font-dm-sans text-gray-500">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Primary Button */}
        <button
          onClick={onPurchase}
          className="w-full bg-orange text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
        >
          {primaryButtonText}
        </button>

        {/* Secondary Button */}
        {secondaryButtonText && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="w-full mt-3 border-2 border-navy text-navy font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:bg-navy/10 active:scale-[0.97] transition-all duration-200"
          >
            {secondaryButtonText}
          </button>
        )}

        {/* Footer Text */}
        {footerText && (
          <p className="text-[13px] font-dm-sans text-gray-400 mt-4 underline cursor-pointer hover:text-gray-600">
            {footerText}
          </p>
        )}
      </div>
    </Modal>
  );
}
