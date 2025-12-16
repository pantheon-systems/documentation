"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

export const Pre = ({ children, node, ...props }: PropsWithChildren & any) => {
  const [mounted, setMounted] = useState(false);

  const [outputLines, setOutputLines] = useState<{
    start: number;
    end: number;
  }>();

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const className: string = props?.className;

    if (className) {
      const titleExists = className
        .split(" ")
        .filter((e) => e.startsWith("metadata-title"));
      if (titleExists.length > 0) {
        const title = titleExists[0].split("=")?.[1];
        setTitle(title);
      }

      const outputLinesExists = className
        .split(" ")
        .filter((e) => e.startsWith("metadata-outputLines"));
      if (outputLinesExists.length > 0) {
        const outputLines = outputLinesExists[0].split("=")?.[1];
        const [start, end] = outputLines
          ?.split("-")
          .map((e) => parseInt(e.trim()));

        if (
          start &&
          end &&
          !Number.isNaN(start) &&
          !Number.isNaN(end) &&
          start < end
        ) {
          setOutputLines({
            start,
            end,
          });
        }
      }
    }

    setMounted(true);
  }, [props?.className]);

  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!mounted || !preRef.current) {
      return;
    }

    const codeBlock = preRef.current.children[0];

    if (!codeBlock) {
      return;
    }

    if (codeBlock.tagName !== "CODE") {
      return;
    }

    if (codeBlock.getAttribute("data-skip-line-highlight") === "true") {
      return;
    }

    if (codeBlock.classList.contains("language-bash")) {
      // add a $ to the beginning of the code block
      codeBlock.innerHTML = `<span id="bash-pound-prompt">$</span> ${codeBlock.innerHTML}`;
    }

    const spanBlocks = Array.from(codeBlock.children).filter(
      (e: Element) => e.tagName === "SPAN" && e.id !== "bash-pound-prompt"
    ) as HTMLSpanElement[];

    let highlight = false;

    spanBlocks.forEach((spanBlock: HTMLSpanElement, index: number) => {
      if (outputLines) {
        // 0 is base but we refer counts = 1
        // 1 is always the command for bash
        if (index + 2 < outputLines.start || index + 2 > outputLines.end) {
          spanBlock.classList.add("gatsby-hide-code-line");
        }
      }

      if (spanBlock.innerText?.includes("//highlight-line")) {
        spanBlock.classList.add("gatsby-highlight-code-line");
        spanBlock.innerText = spanBlock.innerText.replace(
          "//highlight-line",
          ""
        );
      }

      if (spanBlock.innerText?.trim() === "//highlight-start") {
        spanBlock.classList.add("span-block-hidden");
        highlight = true;
      }

      if (spanBlock.innerText?.trim() === "//highlight-end") {
        spanBlock.classList.add("span-block-hidden");

        highlight = false;
      }

      if (highlight) {
        spanBlock.classList?.add?.("gatsby-highlight-code-line");
      }
    });
  }, [preRef, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="gatsby-highlight">
      {title && <div className="gatsby-remark-code-title">{title}</div>}

      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
};
