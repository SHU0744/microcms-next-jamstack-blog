import { Blog } from "@/components/Blog";
import { CategoryList } from "@/components/CategoryList";
import { Pagination } from "@/components/Pagination";
import { TagList } from "@/components/TagList";
import { client } from "@/libs/client";
import Link from "next/link";

export default function BlogPageId({ blog, category, tag, totalCount }) {
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

const PER_PAGE = 5;
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * 5, limit: 5 },
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
