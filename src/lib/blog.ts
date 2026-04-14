import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

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

function parseFrontmatter(content: string): {
  data: Record<string, string>;
  content: string;
} {
  const { data, content: markdown } = matter(content);
  return {
    data: data as Record<string, string>,
    content: markdown,
  };
}

export function getAllBlogPosts(): BlogMetadata[] {
  const postsDirectory = join(process.cwd(), "src/content/posts");
  const filenames = readdirSync(postsDirectory);

  return filenames
    .map((filename) => {
      const fileContents = readFileSync(
        join(postsDirectory, filename),
        "utf-8",
      );
      const { data } = parseFrontmatter(fileContents);
      const slug = filename.replace(".mdx", "");

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        author: data.author || "Vizier Team",
        description: data.description || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const postsDirectory = join(process.cwd(), "src/content/posts");

  try {
    const filenames = readdirSync(postsDirectory);
    const matchingFile = filenames.find((f) => f.includes(slug));

    if (!matchingFile) return null;

    const fileContents = readFileSync(
      join(postsDirectory, matchingFile),
      "utf-8",
    );
    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Vizier Team",
      description: data.description || "",
      content,
    };
  } catch {
    return null;
  }
}
