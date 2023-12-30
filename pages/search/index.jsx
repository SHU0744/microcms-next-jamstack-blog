import { client } from "@/libs/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const q = query.q;
  const data = await client.get({ endpoint: "blog", queries: { q: q } });
  return {
    props: {
      blog: data.contents,
    },
  };
};

const Search = ({ blog }) => {
  const router = useRouter();
  const [state, setState] = useState("");
  const changeHandle = (e) => {
    setState(e.target.value);
  };
  const onClickBtn = () => {
    router.push({
      pathname: "/search",
      query: { q: state },
    });
    setState("");
  };
  return (
    <>
      <p className="text-2xl">検索ページ</p>
      <input
        type="text"
        onChange={changeHandle}
        value={state}
        className="bg-gray-100"
      />
      <button onClick={onClickBtn}>検索</button>
      <div className="mt-6">
        <ul className="flex flex-col gap-y-2">
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
