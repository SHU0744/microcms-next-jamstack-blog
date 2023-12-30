import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "@/components/Pagination";

export default function Home({ blog, category, tag, totalCount }) {
  console.log(totalCount);
  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <h5 className="text-lg">カテゴリー一覧</h5>
          <ul>
            {category.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`} className="underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-lg">タグ一覧</h5>
          <ul>
            {tag.map((tag) => (
              <li key={tag.id}>
                <Link href={`/tag/${tag.id}`} className="underline">
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link href={"/search"} className="underline">
            検索ページ
          </Link>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-y-2">
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`} className="underline">
                {blog.title}
              </Link>
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
