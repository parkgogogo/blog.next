"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  cardHoverVariants,
  staggerContainer,
  staggerItem,
  buttonVariants,
} from "@/lib/animations";

// 模拟博客数据
const blogPosts = [
  {
    id: 1,
    title: "Next.js 13 App Router 完全指南",
    excerpt:
      "深入探讨 Next.js 13 的新特性，包括 App Router、Server Components 和新的数据获取模式。",
    date: "2024-01-15",
    readTime: "8 分钟",
    category: "React",
    slug: "nextjs-13-app-router-guide",
    image: "/api/placeholder/400/240",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: 2,
    title: "TypeScript 高级类型技巧",
    excerpt: "掌握 TypeScript 的高级类型系统，提升代码的类型安全性和开发效率。",
    date: "2024-01-10",
    readTime: "12 分钟",
    category: "TypeScript",
    slug: "typescript-advanced-types",
    image: "/api/placeholder/400/240",
    tags: ["TypeScript", "类型系统", "最佳实践"],
  },
  {
    id: 3,
    title: "React 性能优化实战",
    excerpt:
      "从 memo、useMemo 到 Suspense，全面了解 React 应用的性能优化策略。",
    date: "2024-01-05",
    readTime: "10 分钟",
    category: "React",
    slug: "react-performance-optimization",
    image: "/api/placeholder/400/240",
    tags: ["React", "性能优化", "Hooks"],
  },
];

interface BlogCardProps {
  post: (typeof blogPosts)[0];
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.article
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="card overflow-hidden h-full group"
      >
        {/* 文章图片 */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 文章内容 */}
        <div className="flex-1 flex flex-col">
          {/* 分类标签 */}
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs text-blue-300 border border-blue-500/30">
              {post.category}
            </span>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-3 h-3" />
                <span>{new Date(post.date).toLocaleDateString("zh-CN")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* 标题 */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* 摘要 */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 阅读更多 */}
          <Link href={`/blog/${post.slug}`}>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group/link"
            >
              <span className="text-sm font-medium">阅读全文</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

export default function BlogSection() {
  return (
    <section
      id="blog"
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
                📚 最新文章
              </motion.span>

              <motion.h2
                variants={staggerItem}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                技术<span className="gradient-text">博客</span>
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                分享我在开发过程中的经验、技巧和思考，希望能对你有所帮助
              </motion.p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* 博客文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* 查看更多按钮 */}
        <ScrollReveal delay={0.6}>
          <div className="text-center">
            <Link href="/blog">
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center btn btn-primary text-lg px-8 py-4 group"
              >
                <span>查看所有文章</span>
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>

        {/* 博客统计 */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-300">技术文章</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  10K+
                </div>
                <div className="text-gray-300">阅读量</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-gray-300">技术主题</div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
