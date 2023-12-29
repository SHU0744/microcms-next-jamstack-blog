import { client } from "@/libs/client";
import Link from "next/link";

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" });
  const paths = data.contents.map((content) => `/tag/${content.id}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]${id}` },
  });
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function TagId({ blog }) {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }

  return (
    <ul>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
}