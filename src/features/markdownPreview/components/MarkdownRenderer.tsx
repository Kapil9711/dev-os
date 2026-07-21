import ReactMarkdown from "react-markdown";

import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import CodeBlock from "./CodeBlock";
import Heading from "./Heading";
import Image from "./Image";
import Table from "./Table";
import Blockquote from "./BlockQuote";

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
          },
        ],
      ]}
      components={{
        h1: (props) => <Heading level={1} {...props} />,
        h2: (props) => <Heading level={2} {...props} />,
        h3: (props) => <Heading level={3} {...props} />,
        h4: (props) => <Heading level={4} {...props} />,
        h5: (props) => <Heading level={5} {...props} />,
        h6: (props) => <Heading level={6} {...props} />,

        code: CodeBlock,

        img: Image,

        table: Table,

        blockquote: Blockquote,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
