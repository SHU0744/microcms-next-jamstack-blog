import Link from "next/link";

export const TagList = ({ tag }) => {
  return (
    <ul>
      {tag.map((tag) => (
        <li key={tag.id}>
          <Link href={`/tag/${tag.id}`} className="underline">
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
