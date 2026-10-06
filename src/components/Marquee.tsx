import { Headlinges } from "@/type/type";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  const headlines: Headlinges[] = data.data;
  return (
    <div className="sticky top-0 z-50 bg-red-700 text-white">
      <div className="containW flex items-center">
        <div className="bg-red-800 px-4 py-1">সর্বশেষ</div>
        <MarqueeText direction="right" duration={15}>
          {headlines.map((headline) => (
            <span key={headline.id} className="inline-flex items-center">
              <Link href={`/news/${headline.id}`} className="hover:underline">
                {headline.title}
              </Link>
              <span className="text-slate-300 px-4">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
