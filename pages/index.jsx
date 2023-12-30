import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "@/components/Pagination";
import { Blog } from "@/components/Blog";
import { CategoryList } from "@/components/CategoryList";
import { TagList } from "@/components/TagList";

export default function Home({ blog, category, tag, totalCount }) {
  console.log(totalCount);
  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <h5 className="text-lg">カテゴリー一覧</h5>
          <CategoryList category={category} />
        </div>
        <div>
          <h5 className="text-lg">タグ一覧</h5>
          <TagList tag={tag} />
        </div>
        <div>
          <Link href={"/search"} className="underline">
            検索ページ
          </Link>
        </div>
      </div>
      <div>
        <Blog blog={blog} />
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
