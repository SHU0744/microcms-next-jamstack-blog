import { Blog } from "@/components/Blog";
import { client } from "@/libs/client";

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content) => `/category/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function CategoryId({ blog }) {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }

  return <Blog blog={blog} />;
}
