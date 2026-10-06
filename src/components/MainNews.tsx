import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsMain {
  category: string;
  description: string;
  firstPublished: string;
  id: string;
  imageAlt: string;
  imageUrl: string;
  isLive: boolean;
  lastPublished: string;
  link: string;
  source: string;
  title: string;
  type: string;
}

const MainNews = ({ mainNews }: { mainNews: NewsMain[] }) => {
  const [firstNews, ...otherNews] = mainNews;
  // console.log(firstNews);
  return (
    <div className="grid grid-cols-2 gap-6">
      <Link
        href={`/news/${firstNews.id}`}
        className="card bg-base-100 w-96 shadow-sm"
      >
        <figure>
          <Image
            width={600}
            height={600}
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
          />
        </figure>
        <div className="card-body">
          <div className="badge badge-secondary">{firstNews.category}</div>
          <h2 className="card-title">{firstNews.title}</h2>
          <p>{firstNews.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </Link>
      <div className="">
        {otherNews.slice(0, 4).map((oNews) => (
          <div key={oNews.id}>
            <p>{oNews.category}</p>
            <Link href={`/news/${oNews.id}`}>{oNews.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
