import Link from "next/link";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;
  const range = (start, end) => {
    return [...Array(end - start + 1)].map((_, i) => {
      return start + i;
    });
  };

  return (
    <ul className="flex gap-x-1">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
