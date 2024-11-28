import ReactMarkdown from "react-markdown";

export const MarkdownRenderer = ({ content }: { content: any }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};
