import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "@/components/Pagination";

export default function Home({ blog, category, tag, totalCount }) {
  console.log(totalCount);
  return (
    <div className="flex">
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
      <div>
        <ul className="flex flex-col gap-y-2">
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: 5 },
  });
  const categoryDate = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      category: categoryDate.contents,
      tag: tagData.contents,
      totalCount: data.totalCount,
    },
  };
};
