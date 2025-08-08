"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  cardHoverVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const highlights = [
  {
    icon: BriefcaseIcon,
    title: "5+ 年经验",
    description: "专注于全栈开发和现代Web技术",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: AcademicCapIcon,
    title: "持续学习",
    description: "保持对新技术的热情和好奇心",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: HeartIcon,
    title: "开源贡献",
    description: "积极参与开源社区，分享知识",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: SparklesIcon,
    title: "创新思维",
    description: "追求优雅的代码和用户体验",
    color: "from-orange-500 to-red-500",
  },
];

const stats = [
  { number: "50+", label: "完成项目" },
  { number: "1000+", label: "代码提交" },
  { number: "10+", label: "技术栈" },
  { number: "3+", label: "年博客写作" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-blue-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-purple-500/10 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium mb-4"
              >
                👨‍💻 关于我
              </motion.span>

              <motion.h2
                variants={staggerItem}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                热爱<span className="gradient-text">编程</span>的开发者
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                我是一名充满热情的全栈开发者，专注于创建现代化、高性能的Web应用程序。
                通过不断学习新技术和最佳实践，致力于为用户提供卓越的数字体验。
              </motion.p>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* 左侧：个人介绍 */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                我的故事
              </h3>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  从大学时期接触编程开始，我就被代码的魅力深深吸引。每当看到一行行代码
                  转化为用户界面和功能时，那种成就感让我更加坚定了在技术道路上的决心。
                </p>

                <p>
                  在过去的几年里，我专注于现代Web开发技术栈，包括React、Next.js、
                  TypeScript等前端技术，以及Node.js、Python等后端技术。我相信
                  技术应该服务于用户，创造真正有价值的产品。
                </p>

                <p>
                  除了编程，我还热衷于技术写作和知识分享。通过博客文章和开源项目，
                  我希望能够帮助更多的开发者成长，同时也在这个过程中不断提升自己。
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 pt-4"
              >
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Node.js",
                  "Python",
                  "AWS",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

          {/* 右侧：特色亮点 */}
          <ScrollReveal direction="right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="card text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${highlight.color} flex items-center justify-center`}
                  >
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 统计数据 */}
        <ScrollReveal delay={0.4}>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      duration: 0.5,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold gradient-text mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 个人理念 */}
        <ScrollReveal delay={0.6}>
          <div className="mt-16 text-center">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl font-light text-gray-300 italic max-w-4xl mx-auto"
            >
              &ldquo;代码不仅仅是解决问题的工具，更是创造美好体验的艺术&rdquo;
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-4 text-blue-400 font-medium"
            >
              — 我的编程理念
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
