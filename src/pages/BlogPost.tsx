import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { getBlogPost, getAllBlogPosts } from '../lib/blog';
import '../styles/BlogPost.css';

// Configure marked to use highlight.js
const markedOptions: Parameters<typeof marked.setOptions>[0] = {
  breaks: false,
  gfm: true,
};

marked.setOptions(markedOptions);

// Setup custom code highlighting
marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    },
  } as any,
});

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : null;
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex - 1] : null;

  // Parse markdown to HTML with syntax highlighting
  const htmlContent = useMemo(() => {
    if (!post) return '';
    return marked(post.content);
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-post-container blog-post-not-found">
        <button className="blog-post-back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={18} />
          Back to Blog
        </button>
        <h1>Post not found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn btn-primary">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <div className="blog-post-container">
        {/* Back Button */}
        <button className="blog-post-back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        {/* Header */}
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

        {/* Content */}
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Navigation */}
        {(previousPost || nextPost) && (
          <div className="blog-post-navigation">
            {previousPost && (
              <Link to={`/blog/${previousPost.slug}`} className="blog-nav-post blog-nav-previous">
                <span className="blog-nav-label">← Previous</span>
                <span className="blog-nav-title">{previousPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="blog-nav-post blog-nav-next">
                <span className="blog-nav-label">Next →</span>
                <span className="blog-nav-title">{nextPost.title}</span>
              </Link>
            )}
          </div>
        )}

        {/* Back to Blog */}
        <div className="blog-post-footer">
          <Link to="/blog" className="btn btn-secondary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
