// import { client } from "@/libs/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// export const getServerSideProps = async (ctx) => {
//   const { query } = ctx;
//   const q = query.q;
//   const data = await client.get({ endpoint: "blog", queries: { q: q } });
//   return {
//     props: {
//       blog: data.contents,
//     },
//   };
// };

const Search = () => {
  // const router = useRouter();
  const [state, setState] = useState("");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const result = await axios
        .get(`/api/blog/${state}`)
        .then((res) => res.data);
      setBlog(result.contents);
    };
    getBlog();
  }, [state]);

  const changeHandle = (e) => {
    setState(e.target.value);
  };
  // const onClickBtn = () => {
  //   router.push({
  //     pathname: "/search",
  //     query: { q: state },
  //   });
  //   setState("");
  // };
  return (
    <>
      <h2 className="text-2xl">検索ページ</h2>
      <p>本文の内容も検索対象です。</p>
      <input
        type="text"
        onChange={changeHandle}
        value={state}
        className="bg-gray-100"
      />
      {/* <button onClick={onClickBtn}>検索</button> */}
      <div className="mt-6">
        <ul className="flex flex-col gap-y-2">
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`} className="underline">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
