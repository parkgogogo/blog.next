"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import { pageVariants, pageTransition } from "@/lib/animations";

export default function Home() {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* 导航栏 */}
      <Navigation />

      {/* 主要内容区域 */}
      <div className="relative">
        {/* 英雄区域 */}
        <HeroSection />

        {/* 关于我 */}
        <AboutSection />

        {/* 技能展示 */}
        <SkillsSection />

        {/* 博客文章 */}
        <BlogSection />

        {/* 联系方式 */}
        <ContactSection />

        {/* 页脚 */}
        <footer className="py-8 bg-black border-t border-white/10">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold gradient-text">Blog</span>
              </div>

              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">
                  © 2024 我的博客. 用 ❤️ 和 Next.js 构建
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Powered by Next.js, TypeScript & Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </motion.main>
  );
}
