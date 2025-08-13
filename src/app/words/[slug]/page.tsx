import { WordsService } from "@/lib/words";
import { ExplanationWrapper } from "@/app/words/[slug]/components/explanation-wrapper";

export default async function DailyWordsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dailyWords = await WordsService.getWordsByDate(slug);

  console.log(dailyWords);

  return (
    <div className="p-8">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-3xl font-medium font-display text-foreground mb-4 leading-tight tracking-tight mt-0">
          {slug} Daily Words
        </h1>
        <div className="markdown-body">
          {dailyWords.map((word) => (
            <div key={word.uuid}>
              <h3>{word.uuid}</h3>
              <ExplanationWrapper word={word}>
                <div
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: word.context.line }}
                />
              </ExplanationWrapper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
