import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import News from "@/components/News";
import MostReadNews from "@/pages/MostReadNews";

interface NewsIs {
  articles: [];
  count: number;
  curationId: string;
  curationType: string;
  link: string | null;
  title: string;
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;

  const mainNews = sections[0].articles;

  const otherSections: NewsIs[] = sections.slice(1);

  return (
    <div>
      <div className="containW grid grid-cols-3 gap-8">
        {/* main layout  */}
        <div className="col-span-2">
          {/* top news  */}
          <MainNews mainNews={mainNews} />

          {otherSections
            .filter((item) => item.count > 1 && item.count < 5)
            .map((section) => (
              <News key={section.curationId} section={section} />
            ))}
        </div>

        {/* right card  */}
        <MostReadNews />
      </div>
    </div>
  );
}
