import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageId } from "../types";

interface PageTransitionProps {
  currentPage: PageId;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  currentPage,
  children,
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          className="w-full min-h-screen bg-[#FAF8F5]"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          exit={{
            opacity: 0,
            y: -8,
            transition: {
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
