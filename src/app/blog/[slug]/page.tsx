import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import '@/styles/BlogPost.css'

export const dynamic = 'force-static'
export const revalidate = false

const markedOptions: Parameters<typeof marked.setOptions>[0] = {
  breaks: false,
  gfm: true,
}

marked.setOptions(markedOptions)

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
      const highlighted = hljs.highlight(text, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    },
  } as any,
})

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} - Vizier Blog`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const previousPost = currentIndex > 0 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex - 1] : null

  if (!post) {
    notFound()
  }

  const htmlContent = marked(post.content)

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <div className="blog-post-container">
        <Link href="/blog/" className="blog-post-back-btn">
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <div className="blog-post-meta-item">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="blog-post-meta-item">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {(previousPost || nextPost) && (
          <div className="blog-post-navigation">
            {previousPost && (
              <Link href={`/blog/${previousPost.slug}/`} className="blog-nav-post blog-nav-previous">
                <span className="blog-nav-label">← Previous</span>
                <span className="blog-nav-title">{previousPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}/`} className="blog-nav-post blog-nav-next">
                <span className="blog-nav-label">Next →</span>
                <span className="blog-nav-title">{nextPost.title}</span>
              </Link>
            )}
          </div>
        )}

        <div className="blog-post-footer">
          <Link href="/blog/" className="btn btn-secondary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}