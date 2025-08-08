"use client";

import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  cardHoverVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { SkillItem } from "@/types/components";

const skillCategories = [
  {
    title: "前端开发",
    icon: CodeBracketIcon,
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "React/Next.js",
        level: 90,
        icon: CodeBracketIcon,
        color: "#61DAFB",
      },
      {
        name: "TypeScript",
        level: 85,
        icon: CodeBracketIcon,
        color: "#3178C6",
      },
      {
        name: "Tailwind CSS",
        level: 88,
        icon: PaintBrushIcon,
        color: "#06B6D4",
      },
      { name: "Vue.js", level: 75, icon: CodeBracketIcon, color: "#4FC08D" },
    ],
  },
  {
    title: "后端开发",
    icon: CloudIcon,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 82, icon: CloudIcon, color: "#339933" },
      { name: "Python", level: 78, icon: CodeBracketIcon, color: "#3776AB" },
      { name: "PostgreSQL", level: 80, icon: CloudIcon, color: "#336791" },
      { name: "Redis", level: 70, icon: CloudIcon, color: "#DC382D" },
    ],
  },
  {
    title: "移动开发",
    icon: DevicePhoneMobileIcon,
    color: "from-purple-500 to-pink-500",
    skills: [
      {
        name: "React Native",
        level: 75,
        icon: DevicePhoneMobileIcon,
        color: "#61DAFB",
      },
      {
        name: "Flutter",
        level: 65,
        icon: DevicePhoneMobileIcon,
        color: "#02569B",
      },
      {
        name: "iOS/Swift",
        level: 60,
        icon: DevicePhoneMobileIcon,
        color: "#FA7343",
      },
      {
        name: "Android",
        level: 58,
        icon: DevicePhoneMobileIcon,
        color: "#3DDC84",
      },
    ],
  },
  {
    title: "工具与部署",
    icon: RocketLaunchIcon,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Docker", level: 85, icon: RocketLaunchIcon, color: "#2496ED" },
      { name: "AWS/云服务", level: 75, icon: CloudIcon, color: "#FF9900" },
      {
        name: "Git/GitHub",
        level: 90,
        icon: CodeBracketIcon,
        color: "#F05032",
      },
      { name: "CI/CD", level: 70, icon: RocketLaunchIcon, color: "#326CE5" },
    ],
  },
];

interface SkillBarProps {
  skill: SkillItem;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <skill.icon className="w-4 h-4 text-blue-400" />
          <span className="text-gray-300 font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{skill.level}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{
            delay: index * 0.1 + 0.2,
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="h-full rounded-full bg-gradient-to-r"
          style={{
            background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
          }}
        />
      </div>
    </motion.div>
  );
}

interface SkillCategoryProps {
  category: (typeof skillCategories)[0];
  index: number;
}

function SkillCategory({ category, index }: SkillCategoryProps) {
  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="card h-full"
      >
        <div className="flex items-center mb-6">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}
          >
            <category.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{category.title}</h3>
        </div>

        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container-custom">
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
                💻 技术栈
              </motion.span>

              <motion.h2
                variants={staggerItem}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                我的<span className="gradient-text">技能</span>
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                持续学习和掌握现代开发技术，专注于构建高质量的数字产品
              </motion.p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* 技能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* 额外信息 */}
        <ScrollReveal delay={0.6}>
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
            >
              <CpuChipIcon className="w-8 h-8 text-blue-400" />
              <div className="text-left">
                <h4 className="text-lg font-semibold text-white mb-1">
                  持续学习
                </h4>
                <p className="text-gray-300">
                  保持对新技术的好奇心，不断提升技能水平
                </p>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
