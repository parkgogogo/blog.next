"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaTwitter, FaLinkedin, FaWeixin } from "react-icons/fa";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  cardHoverVariants,
  staggerContainer,
  staggerItem,
  buttonVariants,
} from "@/lib/animations";

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: "邮箱",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MapPinIcon,
    label: "位置",
    value: "中国，上海",
    href: "#",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: PhoneIcon,
    label: "微信",
    value: "WeChat ID",
    href: "#",
    color: "from-purple-500 to-pink-500",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com",
    color: "#333",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    href: "https://twitter.com",
    color: "#1DA1F2",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com",
    color: "#0077B5",
  },
  {
    name: "WeChat",
    icon: FaWeixin,
    href: "#",
    color: "#07C160",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟表单提交
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-blue-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-purple-500/10 rounded-full"
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
                📬 联系我
              </motion.span>

              <motion.h2
                variants={staggerItem}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                让我们<span className="gradient-text">合作</span>
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                有项目想法或技术问题？欢迎随时联系我，让我们一起创造些什么
              </motion.p>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 左侧：联系信息 */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                联系方式
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{info.label}</div>
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* 社交媒体链接 */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">
                  社交媒体
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 group"
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* 可用性状态 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">
                  目前可接受新项目
                </span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* 右侧：联系表单 */}
          <ScrollReveal direction="right">
            <motion.form
              onSubmit={handleSubmit}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="card"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                发送消息
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="您的姓名"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    主题 *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="项目咨询 / 技术交流 / 其他"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    消息 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="请详细描述您的需求或问题..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>发送中...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      <span>发送消息</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
