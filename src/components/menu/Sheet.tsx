'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';

/** Bottom sheet on phones, centred dialog on wide screens. Drag down or press Esc to close. */
export default function Sheet({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string }) {
  const drag = useDragControls();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button aria-label="Close" className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-[3px]" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={label}
            className="relative max-h-[92dvh] w-full overflow-hidden rounded-t-[30px] sm:max-w-lg sm:rounded-[30px]"
            style={{ background: 'var(--sf)', color: 'var(--tx)', boxShadow: '0 -20px 60px rgba(0,0,0,.3)' }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            drag="y" dragControls={drag} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, i) => { if (i.offset.y > 120 || i.velocity.y > 600) onClose(); }}
          >
            <div onPointerDown={(e) => drag.start(e)} className="flex cursor-grab touch-none justify-center pb-1 pt-3"><div className="h-1.5 w-11 rounded-full" style={{ background: 'var(--line)' }} /></div>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full" style={{ background: 'var(--soft)' }}><X size={18} /></button>
            <div className="max-h-[calc(92dvh-20px)] overflow-y-auto overscroll-contain pb-[max(20px,env(safe-area-inset-bottom))]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
