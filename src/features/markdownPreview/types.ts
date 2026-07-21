import type {
  ComponentPropsWithoutRef,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

export interface MarkdownPreviewProps {
  /**
   * Markdown content to render.
   */
  markdown: string;

  /**
   * Additional class names.
   */
  className?: string;
}

export interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface MermaidProps {
  chart: string;
}

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

import type { BlockquoteHTMLAttributes, TableHTMLAttributes } from "react";

export type TableProps = TableHTMLAttributes<HTMLTableElement>;

export type BlockquoteProps = BlockquoteHTMLAttributes<HTMLQuoteElement>;
