import { Headlinges } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryNews = async ({ params }: { params: { categoryid: string } }) => {
  const { categoryid } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryid}`,
  );
  const data = await res.json();

  const allCategoryNews: Headlinges[] = data.data;

  console.log(allCategoryNews);

  return (
    <div className="containW grid grid-cols-3">
      {allCategoryNews.map((categoryNews) => (
        <Link
          href={`/news/${categoryNews.id}`}
          className="card bg-base-100 w-96 shadow-sm"
          key={categoryNews.id}
        >
          <figure>
            <Image
              width={600}
              height={600}
              src={categoryNews.imageUrl}
              alt={categoryNews.imageAlt}
            />
          </figure>
          <div className="card-body">
            <div className="badge badge-secondary">{categoryNews.category}</div>
            <h2 className="card-title">{categoryNews.title}</h2>
            <p>{categoryNews.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryNews;
