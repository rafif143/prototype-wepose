'use client';

import { useState } from 'react';

export function useCompareState() {
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Debug log
  console.log('useCompareState - selectedVisas:', selectedVisas);

  const addVisa = (visaId: string) => {
    console.log('Adding visa:', visaId);
    if (selectedVisas.length < 3 && !selectedVisas.includes(visaId)) {
      setSelectedVisas((prev) => [...prev, visaId]);
    }
  };

  const removeVisa = (visaId: string) => {
    console.log('Removing visa:', visaId);
    setSelectedVisas((prev) => prev.filter((id) => id !== visaId));
  };

  const clearAllVisas = () => {
    console.log('Clearing all visas');
    setSelectedVisas([]);
  };

  const canCompare = selectedVisas.length >= 2;

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  return {
    selectedVisas,
    showAddModal,
    canCompare,
    addVisa,
    removeVisa,
    clearAllVisas,
    openAddModal,
    closeAddModal,
  };
}
