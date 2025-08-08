"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import TypewriterText from "@/components/ui/TypewriterText";
import ParticleBackground from "@/components/ui/ParticleBackground";
import {
  buttonVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export default function HeroSection() {
  const typewriterTexts = [
    "全栈开发者",
    "技术博主",
    "开源贡献者",
    "终身学习者",
  ];

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 粒子背景 */}
      <ParticleBackground particleCount={60} />

      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      {/* 几何图形装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-500/20 rounded-full"
        />
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg rotate-45"
        />
      </div>

      {/* 主要内容 */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        {/* 问候语 */}
        <motion.div variants={staggerItem} className="mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium">
            👋 欢迎来到我的博客
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="block text-white mb-2">你好，我是</span>
          <span className="block gradient-text">
            <TypewriterText
              texts={typewriterTexts}
              speed={150}
              deleteSpeed={100}
              delayBetweenTexts={2000}
            />
          </span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          variants={staggerItem}
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          专注于现代Web开发技术，分享编程经验与技术见解，
          <br className="hidden sm:block" />
          致力于创造优雅且高效的数字体验
        </motion.p>

        {/* CTA按钮组 */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/blog">
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="btn btn-primary text-lg px-8 py-4 group"
            >
              <span>探索博客</span>
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </Link>

          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToAbout}
            className="btn btn-secondary text-lg px-8 py-4"
          >
            了解更多
          </motion.button>
        </motion.div>

        {/* 社交媒体链接 */}
        <motion.div
          variants={staggerItem}
          className="flex justify-center space-x-6 mb-16"
        >
          {[
            { name: "GitHub", icon: "🔗", href: "#" },
            { name: "Twitter", icon: "🐦", href: "#" },
            { name: "LinkedIn", icon: "💼", href: "#" },
            { name: "Email", icon: "📧", href: "mailto:hello@example.com" },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-white/20 transition-colors border border-white/20"
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* 滚动指示器 */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center"
        >
          <span className="text-gray-400 text-sm mb-2">向下滚动探索更多</span>
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronDownIcon className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
