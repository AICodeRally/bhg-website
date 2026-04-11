'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'

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
  content: string
  tags?: string[]
}

function BlogPostContent() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blog-posts.json')
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data)
        const found = data.find((p: BlogPost) => p.slug === slug)
        setPost(found)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading blog post:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading article...</p>
        </div>
      </div>
    )
  }

  const nextPost = allPosts[
    (allPosts.findIndex((p) => p.slug === slug) + 1) % allPosts.length
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="gradient-mesh absolute inset-0" />
        <div className="section-container relative z-10 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/70 border border-white/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
            <div>By {post.author}</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-24">
        <div className="section-container relative z-10 max-w-3xl">
          <article className="prose prose-invert max-w-none">
            <div className="text-white/80 leading-relaxed space-y-6 whitespace-pre-wrap font-sans">
              {post.content}
            </div>
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/60 text-sm font-semibold mb-3">Tagged:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Next Post */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-transparent">
        <div className="section-container relative z-10 max-w-3xl">
          <p className="text-white/60 uppercase tracking-widest text-sm font-semibold mb-6">Next Article</p>
          <Link href={`/blog/${nextPost.slug}`} className="group block">
            <h3 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition">
              {nextPost.title}
            </h3>
            <p className="text-white/60 mb-6">{nextPost.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-white hover:gap-3 transition" style={{ color: '#8B1538' }}>
              Read Next <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="section-container relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">Take the Assessment</h2>
          <p className="text-lg text-white/60 mb-8">
            Identify your specific optimization opportunity with our 5-minute assessment.
          </p>
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
            Start Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function BlogPostPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      }
    >
      <BlogPostContent />
    </Suspense>
  )
}
