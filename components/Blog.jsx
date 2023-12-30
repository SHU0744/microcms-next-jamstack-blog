import Link from "next/link";

export const Blog = ({ blog }) => {
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
