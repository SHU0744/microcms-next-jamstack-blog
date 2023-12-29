import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, category }) {
  return (
    <div>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  const categoryDate = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      category: categoryDate.contents,
    },
  };
};
