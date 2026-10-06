import Image from "next/image";
import { notFound } from "next/navigation";
import { Article } from "@/type/type";

type ApiResponse = {
  success: boolean;
  data: Article;
};

async function getArticle(newsId: string): Promise<Article | null> {
  try {
    // Change this to your actual API URL
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${newsId}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      return null;
    }

    const result: ApiResponse = await res.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}

function getDescription(article: Article) {
  return (
    article.description?.blocks
      ?.flatMap((block) => block.model?.blocks ?? [])
      .map((block) => block.model?.text ?? "")
      .filter(Boolean)
      .join(" ") || ""
  );
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;

  const article = await getArticle(newsId);

  if (!article) {
    notFound();
  }

  const description = getDescription(article);

  return (
    <main className="min-h-screen bg-base-200">
      <article className="mx-auto w-full max-w-3xl bg-base-100 px-5 py-8 sm:px-8 lg:px-10">
        {/* Source */}
        <div className="mb-3 flex items-center gap-2">
          <span className="badge badge-error text-white">
            {article.source || "News"}
          </span>

          <span className="text-sm text-base-content/60">
            {formatDate(article.firstPublished)}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-5 text-2xl font-bold leading-tight text-base-content sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>

        {/* Description */}
        {description && (
          <div className="mb-6 border-l-4 border-red-600 pl-4">
            <p className="text-base font-medium leading-8 text-base-content/80 sm:text-lg">
              {description}
            </p>
          </div>
        )}

        {/* Main Image */}
        {article.imageUrl && (
          <figure className="mb-7 overflow-hidden rounded-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={640}
              height={360}
              className="h-auto w-full object-cover"
              priority
            />
          </figure>
        )}

        {/* Article Info */}
        <div className="mb-7 flex flex-wrap items-center gap-3 border-b border-base-300 pb-5 text-sm text-base-content/60">
          {article.source && (
            <span>
              Source:{" "}
              <span className="font-semibold text-base-content">
                {article.source}
              </span>
            </span>
          )}

          {article.wordCount && (
            <>
              <span>•</span>
              <span>{article.wordCount} words</span>
            </>
          )}
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {article.body?.map((block, index) => {
            if (block.type === "text" && block.text) {
              return block.text
                .split("\n")
                .filter(Boolean)
                .map((paragraph, paragraphIndex) => (
                  <p
                    key={`${index}-${paragraphIndex}`}
                    className="mb-5 text-[16px] leading-8 text-base-content/90"
                  >
                    {paragraph}
                  </p>
                ));
            }

            return null;
          })}
        </div>

        {/* Share / Source */}
        <div className="mt-10 flex flex-col gap-4 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-base-content/60">Original source</p>

            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-error text-sm font-medium"
              >
                {article.source || "View original article"}
              </a>
            )}
          </div>

          <a
            href={article.sourceUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-error text-white"
          >
            Read Original
          </a>
        </div>
      </article>
    </main>
  );
}
