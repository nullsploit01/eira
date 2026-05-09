import { useEffect, useState } from 'react';

import { IBlog } from '@/models/blog';

const BlogsHomePage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await import('@/data/blogs.json');
      setBlogs(data.default);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <small>Published on: {new Date(blog.publishedAt).toLocaleDateString()}</small>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogsHomePage;
