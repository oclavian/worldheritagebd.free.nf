import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import { Language } from '../types';

interface SecurityGuardProps {
  lang: Language;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({ lang }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showSecurityToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  useEffect(() => {
    const isBn = lang === 'bn';

    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only inside input fields or textareas if needed
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
      showSecurityToast(
        isBn
          ? '🔒 কনটেন্ট ও কোড নিরাপত্তায় রাইট-ক্লিক নিষ্ক্রিয় রাখা হয়েছে।'
          : '🔒 Right-click is disabled for content security.'
      );
    };

    // 2. Prevent Keyboard Shortcuts (F12, Inspect, Copy, View Source, Save, Print)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      const ctrlKey = e.ctrlKey || e.metaKey;

      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '⚡ ডেভেলপার টুলস ও ইন্সপেক্ট বন্ধ রাখা হয়েছে।'
            : '⚡ Developer Tools access is restricted.'
        );
        return false;
      }

      // Ctrl + Shift + I / J / C (DevTools)
      if (ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '⚡ ডেভেলপার ইন্সপেক্টর বন্ধ রাখা হয়েছে।'
            : '⚡ Developer Inspector is restricted.'
        );
        return false;
      }

      // Ctrl + U (View Source)
      if (ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '🛡️ পেজ সোর্স কোড সুরক্ষা সক্রিয় আছে।'
            : '🛡️ Page source code protection active.'
        );
        return false;
      }

      // Ctrl + S (Save Page)
      if (ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '💾 পেজ ডাউনলোড বা সেভ করা সংরক্ষিত।'
            : '💾 Page saving is disabled.'
        );
        return false;
      }

      // Ctrl + P (Print)
      if (ctrlKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '🖨️ প্রিন্ট স্ক্রিন সুরক্ষা সক্রিয়।'
            : '🖨️ Print protection active.'
        );
        return false;
      }

      // Ctrl + C (Copy) outside input fields
      if (ctrlKey && (e.key === 'C' || e.key === 'c') && !isInput) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast(
          isBn
            ? '📋 টেক্সট ও কন্টেন্ট কপি করা নিষেধ।'
            : '📋 Text and content copying is disabled.'
        );
        return false;
      }

      // Ctrl + A (Select All) outside input fields
      if (ctrlKey && (e.key === 'A' || e.key === 'a') && !isInput) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Prevent Dragging Images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
        showSecurityToast(
          isBn
            ? '🖼️ ছবি ডাউনলোড বা ড্র্যাগ করা সংরক্ষিত।'
            : '🖼️ Image dragging & downloading disabled.'
        );
      }
    };

    // 4. Console Security Notice
    console.clear();
    console.log(
      '%c🔒 WORLD HERITAGE SECURITY NOTICE %c\nUnauthorized inspect or script injection is restricted for user safety and content copyright protection.',
      'background: #0D472B; color: #D4AF37; font-size: 16px; font-weight: bold; padding: 6px 12px; border-radius: 6px;',
      'color: #0D472B; font-size: 12px;'
    );

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [lang]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] animate-bounce pointer-events-none">
      <div className="bg-emerald-950/95 text-[#F3E0A0] border-2 border-[#D4AF37] px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-bold text-center">
        <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
