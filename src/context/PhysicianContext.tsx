'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PatientQueueItem, StructuredClinicalSummary } from '@/types';
import { INITIAL_MOCK_PATIENTS } from '@/data/mockPatients';
import { soundEffects } from '@/components/common/SoundEffects';

interface PhysicianContextType {
  // Queue & Selection
  patients: PatientQueueItem[];
  selectedPatient: PatientQueueItem | null;
  selectPatient: (id: string) => void;
  filterStatus: 'all' | 'red' | 'ayush' | 'waiting' | 'completed';
  setFilterStatus: (filter: 'all' | 'red' | 'ayush' | 'waiting' | 'completed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addNewKioskPatient: (patient: PatientQueueItem) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Consultation Timer
  isTimerRunning: boolean;
  timerSeconds: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;

  // Summary Edit & Approval
  updateClinicalSummary: (updated: Partial<StructuredClinicalSummary>) => void;
  approveAndPushToEHR: () => void;
  generatePrescription: () => void;
  notificationMessage: string | null;
  clearNotification: () => void;
}

const PhysicianContext = createContext<PhysicianContextType | undefined>(undefined);

export function PhysicianProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<PatientQueueItem[]>(INITIAL_MOCK_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_MOCK_PATIENTS[0].id);
  const [filterStatus, setFilterStatus] = useState<'all' | 'red' | 'ayush' | 'waiting' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dark Mode state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Timer
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Toast Notification
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Dark mode init & effect
  useEffect(() => {
    const isDarkSaved = localStorage.getItem('medikiosk_theme') === 'dark';
    setDarkMode(isDarkSaved);
    if (isDarkSaved) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    soundEffects.playTap();
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('medikiosk_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('medikiosk_theme', 'light');
      }
      return next;
    });
  };

  // Timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const selectPatient = (id: string) => {
    soundEffects.playTap();
    setSelectedPatientId(id);
    setIsTimerRunning(true);
    setTimerSeconds(0);
  };

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0] || null;

  const addNewKioskPatient = (newPatient: PatientQueueItem) => {
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
    setNotificationMessage(`New patient ${newPatient.patient.name} (${newPatient.tokenNumber}) added to OPD queue!`);
  };

  const updateClinicalSummary = (updated: Partial<StructuredClinicalSummary>) => {
    if (!selectedPatient) return;
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            summary: {
              ...p.summary,
              ...updated,
              doctorApprovalStatus: 'modified',
            },
          };
        }
        return p;
      })
    );
    setNotificationMessage('Clinical section updated and saved to case sheet draft.');
  };

  const approveAndPushToEHR = () => {
    if (!selectedPatient) return;
    soundEffects.playSuccess();
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            status: 'completed',
            summary: {
              ...p.summary,
              doctorApprovalStatus: 'approved',
            },
          };
        }
        return p;
      })
    );
    setNotificationMessage(
      `Case Sheet for ${selectedPatient.patient.name} approved & pushed to ABDM FHIR Health Locker (ABHA: ${selectedPatient.patient.abhaId})!`
    );
  };

  const generatePrescription = () => {
    soundEffects.playTap();
    setNotificationMessage(`Digital e-Prescription & Ayurvedic Diet Chart generated for Token ${selectedPatient?.tokenNumber}. Ready for print/SMS.`);
  };

  const clearNotification = () => setNotificationMessage(null);

  return (
    <PhysicianContext.Provider
      value={{
        patients,
        selectedPatient,
        selectPatient,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        addNewKioskPatient,
        darkMode,
        toggleDarkMode,
        isTimerRunning,
        timerSeconds,
        startTimer,
        pauseTimer,
        resetTimer,
        updateClinicalSummary,
        approveAndPushToEHR,
        generatePrescription,
        notificationMessage,
        clearNotification,
      }}
    >
      {children}
    </PhysicianContext.Provider>
  );
}

export function usePhysician() {
  const context = useContext(PhysicianContext);
  if (!context) {
    throw new Error('usePhysician must be used within a PhysicianProvider');
  }
  return context;
}
