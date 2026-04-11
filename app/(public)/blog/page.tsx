'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  featured: boolean
  readTime: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    fetch('/blog-posts.json')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading blog posts:', err)
        setLoading(false)
      })
  }, [])

  const categories = ['All', ...new Set(posts.map((p) => p.category))]
  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter((p) => p.category === selectedCategory)
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 2)

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading blog...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            ICM Optimization <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Strategies, benchmarks, and best practices for optimizing your compensation platform.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="relative py-24 bg-gradient-to-b from-black via-black/50 to-transparent">
          <div className="section-container relative z-10">
            <p className="text-white/60 uppercase text-sm font-semibold tracking-widest mb-8">Featured Articles</p>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group scroll-reveal"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className="glass-card p-8 h-full flex flex-col hover:translate-y-[-4px] transition duration-300"
                    style={{ backgroundColor: 'rgba(139, 21, 56, 0.08)' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition flex-grow">
                      {post.title}
                    </h3>

                    <p className="text-white/60 mb-6 flex-grow">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="relative py-16 bg-black">
        <div className="section-container relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group scroll-reveal"
                style={{ animationDelay: `${(idx % 3) * 0.1}s` }}
              >
                <div
                  className="glass-card p-6 h-full flex flex-col hover:translate-y-[-4px] transition duration-300"
                  style={{ backgroundColor: 'rgba(139, 21, 56, 0.05)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/60 text-sm mb-4 flex-grow line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/50">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}m
                    </div>
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white/80 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Platform?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Take our assessment to identify your specific optimization opportunities.
          </p>
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
            Take the Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
