import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';

interface PageTransitionProps {
  currentPage: PageId;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ currentPage, children }) => {
  return (
    <div className="perspective-container relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          className="page-flip-wrapper w-full min-h-screen bg-[#FAF8F5]"
          initial={{
            rotateY: -35,
            opacity: 0,
            transformOrigin: 'left center',
            scale: 0.98,
            boxShadow: '-20px 0px 40px rgba(0,0,0,0.15)'
          }}
          animate={{
            rotateY: 0,
            opacity: 1,
            scale: 1,
            boxShadow: '0px 0px 0px rgba(0,0,0,0)',
            transition: {
              duration: 0.45,
              ease: [0.25, 1, 0.5, 1] // Smooth realistic page-turn spring
            }
          }}
          exit={{
            rotateY: 35,
            opacity: 0,
            scale: 0.98,
            transformOrigin: 'right center',
            boxShadow: '20px 0px 40px rgba(0,0,0,0.15)',
            transition: {
              duration: 0.35,
              ease: [0.5, 0, 0.75, 0]
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
