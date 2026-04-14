import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'
import '../../styles/Blog.css'

export const dynamic = 'force-static'
export const revalidate = false

export default function Blog() {
  const posts = getAllBlogPosts()

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <div className="blog-container">
        <div className="blog-header">
          <h1>Blog</h1>
          <p>Stories, updates, and insights about Vizier test</p>
        </div>

        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="blog-card"
              >
                <div className="blog-card-content">
                  <h2>{post.title}</h2>
                  <p className="blog-description">{post.description}</p>

                  <div className="blog-meta">
                    <div className="blog-meta-item">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="blog-meta-item">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <p>No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
