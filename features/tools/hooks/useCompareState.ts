'use client';

import { useState } from 'react';

export function useCompareState() {
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const addVisa = (visaId: string) => {
    if (selectedVisas.length < 3 && !selectedVisas.includes(visaId)) {
      setSelectedVisas((prev) => [...prev, visaId]);
    }
  };

  const removeVisa = (visaId: string) => {
    setSelectedVisas((prev) => prev.filter((id) => id !== visaId));
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
    openAddModal,
    closeAddModal,
  };
}
