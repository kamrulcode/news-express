import Link from "next/link";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export default async function NavLinks() {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const navs: Navs[] = data.data;

  const filterNavs = navs.filter((nav) => nav.scrapable);
  return (
    <div className="flex gap-5 justify-center">
      <Link href={"/"}>হোম</Link>
      {filterNavs.map((nav, i) => (
        <Link key={i} href={`/category/${nav.slug}`}>
          {nav.title}
        </Link>
      ))}
    </div>
  );
}
