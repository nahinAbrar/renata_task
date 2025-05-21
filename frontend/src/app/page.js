"use client"
import Link from "next/link";
import { LampContainer } from "@/components/lamp";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/shooting-stars";
import { StarsBackground } from "@/components/stars-background";
import MagicBorderButton from "@/components/MagicBorderButton";

export default function HomePage() {
  return (
    <LampContainer className="relative">


      <div className="fixed inset-0 -z-10">
        <StarsBackground className="w-full h-full" />
        <ShootingStars className="w-full h-full" />
      </div>

      <motion.div
        initial={{ opacity: 0.5, y: 450 }}
        whileInView={{ opacity: 1, y: 350 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative z-20 flex flex-col items-center justify-center h-screen space-y-4"
      >
        <h1 className="text-3xl font-bold text-white">
          Renata PLC Frontend Task
        </h1>
        <div className="space-x-4 mt-5">
          <Link href="/task1">
            <MagicBorderButton>
              Task 1
            </MagicBorderButton>
          </Link>
          <Link href="/login">
            <MagicBorderButton>
              Task 2
            </MagicBorderButton>
          </Link>
        </div>
      </motion.div>
    </LampContainer>
  );
}
