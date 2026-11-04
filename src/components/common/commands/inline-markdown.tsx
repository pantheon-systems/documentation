import Markdown from "react-markdown";

/**
 * Terminus help text is Symfony Console output. Descriptions can contain
 * markdown (e.g. `site-name.env`) and Symfony style tags such as <info>…</info>,
 * which mean nothing in HTML and would otherwise show up as literal text.
 */
const SYMFONY_STYLE_TAGS = /<\/?(info|comment|question|error)>/g;

/** Only the inline elements that appear in command descriptions. */
const ALLOWED_ELEMENTS = ["code", "em", "strong", "a"];

/**
 * Renders a one-line command description (argument, option or command summary)
 * as inline markdown. No <p> wrapper is emitted, so it is safe inside <td>
 * and <p>, and no raw HTML is ever passed through.
 */
export const InlineMarkdown = ({ children }: { children?: string | null }) => {
  if (!children) return null;

  return (
    <Markdown
      allowedElements={ALLOWED_ELEMENTS}
      unwrapDisallowed
      components={{ p: ({ children }) => <>{children}</> }}
    >
      {children.replace(SYMFONY_STYLE_TAGS, "")}
    </Markdown>
  );
};
