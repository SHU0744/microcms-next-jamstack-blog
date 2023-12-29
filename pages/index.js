import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, category, tag }) {
  return (
    <div>
      <div>
        <h5>カテゴリー一覧</h5>
        <ul>
          {category.map((category) => (
            <li key={category.id}>
              <Link href={`/category/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
        <h5>タグ一覧</h5>
        <ul>
          {tag.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
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
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      category: categoryDate.contents,
      tag: tagData.contents,
    },
  };
};
