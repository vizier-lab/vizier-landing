export interface BlogMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
}

export interface BlogPost extends BlogMetadata {
  content: string;
}

// Simple frontmatter parser that works in the browser
function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterStr, markdown] = match;
  const data: Record<string, string> = {};

  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return { data, content: markdown };
}

// Import all MDX files
const blogPosts = import.meta.glob('../blog/posts/*.mdx', { 
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export function getAllBlogPosts(): BlogMetadata[] {
  return Object.entries(blogPosts)
    .map(([path, content]) => {
      const { data } = parseFrontmatter(content as string);
      const slug = path.split('/').pop()?.replace('.mdx', '') || '';
      
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Vizier Team',
        description: data.description || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const blogs = import.meta.glob('../blog/posts/*.mdx', {
    query: '?raw',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  const content = Object.entries(blogs).find(
    ([key]) => key.includes(`/${slug}.mdx`)
  )?.[1];

  if (!content) return null;

  const { data, content: markdown } = parseFrontmatter(content);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || 'Vizier Team',
    description: data.description || '',
    content: markdown,
  };
}
