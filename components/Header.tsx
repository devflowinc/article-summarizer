/* eslint-disable @next/next/no-html-link-for-pages */
import { Poppins } from "@next/font/google";
import clsx from "clsx";
import Image from "next/image";
import Github from "../components/GitHub";
import { useEffect, useState } from "react";

const poppins = Poppins({ weight: "800", subsets: ["latin"] });

export default function Header() {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    void fetch(`https://api.github.com/repos/arguflow/arguflow`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }).then((response) => {
      if (!response.ok) {
        return;
      }
      void response.json().then((data) => {
        setStarCount(data.stargazers_count);
      });
    });
  });

  return (
    <div className="flex items-center justify-between px-3 py-6">
      <a className="flex items-center space-x-3" href="/">
        <Image src="/edit.png" alt="logo" width={34} height={34} />
        <h2 className={clsx("text-lg sm:text-3xl", poppins.className)}>
          <span className="text-green-500">Article</span> summarizer
        </h2>
      </a>
      <a href="https://github.com/arguflow/arguflow">
        <div className="flex items-center justify-center space-x-2 rounded border border-black px-2 py-1 hover:border-gray-300 hover:bg-gray-300 dark:border-white dark:hover:border-neutral-700 dark:hover:bg-neutral-700">
          <span>
            <Github width="26" height="26" />
          </span>
          <span className="text-sm">STAR US</span>
          <span>|</span>
          <span>{starCount}</span>
        </div>
      </a>
    </div>
  );
}
