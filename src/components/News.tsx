import { Headlinges } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Arti {
  articles: Headlinges[];
  title: string;
}

const News = ({ section }: { section: Arti }) => {
  const newsss = section.articles;

  return (
    <div>
      <h1>{section.title}</h1>
      <div className="grid grid-cols-3">
        {newsss.map((s) => (
          <Link
            href={`/news/${s.id}`}
            className="card bg-base-100 w-70 shadow-sm"
            key={s.id}
          >
            <figure>
              <Image
                width={280}
                height={280}
                src={s.imageUrl}
                alt={s.imageAlt}
              />
            </figure>
            <div className="card-body">
              <div className="badge badge-secondary">{s.category}</div>
              <h2 className="card-title">{s.title}</h2>
              <p>{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
