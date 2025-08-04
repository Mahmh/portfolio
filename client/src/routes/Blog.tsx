import "@styles/routes/Blog.scss";
import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { BACKEND_SERVER_URL } from "@const";
import type { BlogPost } from "@types";
import { Link } from "react-router-dom";

const loading = signal(true);
const search = signal("");
const activeTags = signal<string[]>([]);
const posts = signal<BlogPost[]>([]);

export default function Blog() {
  useSignals();

  const fetchPosts = async () => {
    if (!BACKEND_SERVER_URL) {
      console.error("[fetchPosts] BACKEND_SERVER_URL is not defined");
      return;
    }

    try {
      loading.value = true;
      const res = await fetch(`${BACKEND_SERVER_URL}/blog`);

      if (!res.ok) {
        console.error(
          `[fetchPosts] Failed to fetch: ${res.status} ${res.statusText}`
        );
        return;
      }

      const data: BlogPost[] = await res.json();
      posts.value = data;
    } catch (err) {
      console.error("[fetchPosts] Network error:", err);
    } finally {
      loading.value = false;
    }
  };

  const toggleTag = (tag: string) => {
    activeTags.value = activeTags.value.includes(tag)
      ? activeTags.value.filter((t) => t !== tag)
      : [...activeTags.value, tag];
  };

  const allTags = Array.from(new Set(posts.value.flatMap((p) => p.tags)));

  const filtered = posts.value.filter((post) => {
    const s = search.value.toLowerCase();
    const t = activeTags.value;
    const matchesSearch = post.title.toLowerCase().includes(s);
    const matchesTags =
      t.length === 0 || t.some((tag) => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <title>Blog | Maher Mahmoud</title>
      <section id="blog">
        <div className="blog-banner">
          <h2>My Blog Articles</h2>
          <input
            className="blog-search"
            type="text"
            placeholder="Search posts..."
            value={search.value}
            onInput={(e) =>
              (search.value = (e.target as HTMLInputElement).value)
            }
          />
          <div className="tag-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={activeTags.value.includes(tag) ? "active" : ""}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {loading.value ? (
            <div className="loading">
              <span className="spinner" />
              <p>Loading posts...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              No posts match your search or selected tags.
            </div>
          ) : (
            filtered.map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`} className="blog-post">
                <img src={post.img} alt={post.title} className="post-img" />
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}
