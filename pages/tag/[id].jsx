import { Blog } from "@/components/Blog";
import { client } from "@/libs/client";

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
  return <Blog blog={blog} />;
}
