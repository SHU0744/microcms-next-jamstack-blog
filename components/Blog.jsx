import Link from "next/link";

export const Blog = ({ blog }) => {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }

  return (
    <ul>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`/blog/${blog.id}`} className="underline">
            {blog.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
