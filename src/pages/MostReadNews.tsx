import { Headlinges } from "@/type/type";
import Link from "next/link";
import React from "react";

const MostReadNews = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");

  const data = await res.json();

  const mostReadNews: Headlinges[] = data.data;
  console.log(mostReadNews);
  return (
    <div>
      <h1>{mostReadNews[0].category}</h1>
      {mostReadNews?.map((mRNews) => (
        <div key={mRNews.id}>
          <span>{mRNews.rank}</span>
          <Link href={`/news/${mRNews.id}`}>{mRNews.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default MostReadNews;
