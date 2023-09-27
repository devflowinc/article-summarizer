/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SupportedSitesRewriter, {
  supportedDomains,
} from "../components/SupportedSitesRewriter";
import ReactMarkdown from "react-markdown";
import Anchor from "../components/Blog/MarkdownComponents/Anchor/Anchor";
import HeadingFour from "../components/Blog/MarkdownComponents/Headings/HeadingFour";
import HeadingThree from "../components/Blog/MarkdownComponents/Headings/HeadingThree";
import HeadingTwo from "../components/Blog/MarkdownComponents/Headings/HeadingTwo";
import HeadingOne from "../components/Blog/MarkdownComponents/Headings/HeadingOne";
import HeadingFive from "../components/Blog/MarkdownComponents/Headings/HeadingFive";
import HeadingSix from "../components/Blog/MarkdownComponents/Headings/HeadingSix";
import BlogImage from "../components/Blog/MarkdownComponents/Image/Image";
import { useRouter } from "next/router";

const isSupportedDomain = (url: string) => {
  return (
    url.startsWith("https://") &&
    supportedDomains.some((domain) => url.includes(domain))
  );
};

export const Home: NextPage = () => {
  const router = useRouter();

  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [curArticle, setCurArticle] = useState<string>("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const generateSummary = useCallback(
    async (optionalUrl?: string) => {
      setSummary("");
      const url = optionalUrl ?? curArticle;
      if (!isSupportedDomain(url)) {
        toast.error("Please enter a valid article from a supported site");
        return;
      }
      setLoading(true);
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        toast.error(response.statusText);
        setLoading(false);
        return;
      }

      const data = response.body;
      if (!data) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/" + url);

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setSummary((prev) => prev + chunkValue);
        summaryRef.current?.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth",
        });
      }
      setLoading(false);
    },
    [curArticle, router]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        if (loading) {
          toast.error("The article is still being summarized");
        }
        generateSummary();
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      generateSummary(event.clipboardData?.getData("text"));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("paste", handlePaste);
    };
  }, [generateSummary, loading]);

  useEffect(() => {
    if (
      router.query.slug &&
      router.isReady &&
      !curArticle &&
      typeof router.query.slug !== "string"
    ) {
      const slug = router.query.slug;
      const url = "https://" + slug.join("/");
      setCurArticle(url);
      generateSummary(url);
    }
  }, [curArticle, generateSummary, router.isReady, router.query.slug]);

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
        <Header />
        <main className="mx-auto flex h-screen-164 max-w-5xl flex-1 flex-col justify-center px-2">
          <h1 className="max-w-5xl text-center text-4xl font-bold sm:text-7xl">
            <span className="block"> Summarize articles from </span>
            <span className="relative block whitespace-nowrap text-[#3290EE]">
              <span className="relative text-green-500">
                <SupportedSitesRewriter />
              </span>
            </span>{" "}
            with AI
          </h1>
          <p className="mt-10 text-center text-lg text-gray-500 sm:text-2xl">
            Copy and paste any{" "}
            <a
              href="/supported-sites"
              className="text-green-500 underline"
              aria-label="Supported Pages"
            >
              supported{" "}
            </a>
            article link below.
          </p>
          <input
            type="text"
            value={curArticle}
            onChange={(e) => setCurArticle(e.target.value)}
            className="mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 outline-1 outline-white sm:mt-7 sm:w-3/4"
          />
          {!loading && (
            <button
              type="submit"
              className="z-10 mx-auto mt-7 w-3/4 rounded-2xl border-gray-500 bg-green-500 p-3 text-lg font-medium transition hover:bg-green-400 sm:mt-10 sm:w-1/3"
              onClick={() => generateSummary()}
            >
              Summarize
            </button>
          )}
          {loading && (
            <button
              className="z-10 mx-auto mt-7 w-3/4 cursor-not-allowed rounded-2xl border-gray-500 bg-green-500 p-3 text-lg font-medium transition hover:bg-green-400 sm:mt-10 sm:w-1/3"
              disabled
            >
              <div className="flex items-center justify-center text-white">
                <Image
                  src="/loading.svg"
                  alt="Loading..."
                  width={28}
                  height={28}
                />
              </div>
            </button>
          )}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          {summary && (
            <div className="mb-10 min-h-[75vh] px-4">
              <h2 className="mx-auto mt-16 max-w-3xl border-t border-gray-600 pt-8 text-center text-3xl font-bold sm:text-5xl">
                Summary
              </h2>
              <div className="mx-auto mt-6 max-w-3xl text-lg leading-7">
                <ReactMarkdown
                  components={{
                    h1: HeadingOne,
                    h2: HeadingTwo,
                    h3: HeadingThree,
                    h4: HeadingFour,
                    h5: HeadingFive,
                    h6: HeadingSix,
                    a: (props) => (
                      <Anchor href={props.href} body={props.children} />
                    ),
                    ul: (props) => (
                      <ul className="ml-8 list-disc text-lg text-white">
                        {props.children}
                      </ul>
                    ),
                    ol: (props) => (
                      <ol className="ml-8 list-decimal text-lg text-white">
                        {props.children}
                      </ol>
                    ),
                    li: (props) => (
                      <li className="text-lg text-white">{props.children}</li>
                    ),
                    img: (props) => (
                      <BlogImage src={props.src} about={props.alt} />
                    ),
                    p: (props) => (
                      <div className="my-2 text-lg text-white">
                        {props.children}
                      </div>
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </main>
        <div ref={summaryRef}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
