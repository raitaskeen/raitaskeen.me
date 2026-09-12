"use client";

import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  isUser?: boolean;
}

function CodeBlock({ children, isUser }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  let codeString = "";
  let language = "";

  if (React.isValidElement(children)) {
    const codeProps = children.props as { children?: React.ReactNode; className?: string };
    codeString = String(codeProps?.children || "").replace(/\n$/, "");
    const match = /language-(\w+)/.exec(codeProps?.className || "");
    language = match ? match[1] : "";
  } else if (typeof children === "string") {
    codeString = children.replace(/\n$/, "");
  } else if (Array.isArray(children)) {
    codeString = children
      .map((c) => (typeof c === "string" ? c : (c as { props?: { children?: React.ReactNode } })?.props?.children || ""))
      .join("")
      .replace(/\n$/, "");
  }

  const handleCopy = async () => {
    if (!codeString) return;
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful fallback if clipboard permission is unavailable
    }
  };

  return (
    <div
      className="bot-code-block"
      style={{
        margin: "8px 0",
        borderRadius: 8,
        overflow: "hidden",
        maxWidth: "100%",
        background: isUser ? "hsla(0, 0%, 0%, 0.12)" : "hsla(0, 0%, 7%, 0.95)",
        border: isUser
          ? "1px solid hsla(0, 0%, 0%, 0.2)"
          : "1px solid hsla(45, 100%, 72%, 0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 10px",
          background: isUser ? "hsla(0, 0%, 0%, 0.08)" : "hsla(0, 0%, 12%, 0.7)",
          borderBottom: isUser
            ? "1px solid hsla(0, 0%, 0%, 0.12)"
            : "1px solid hsla(0, 0%, 100%, 0.08)",
          fontSize: 10,
          fontFamily: "monospace",
        }}
      >
        <span
          style={{
            color: isUser ? "var(--smoky-black)" : "var(--orange-yellow-crayola)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied code" : "Copy code"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            color: copied
              ? "var(--orange-yellow-crayola)"
              : isUser
              ? "var(--smoky-black)"
              : "var(--light-gray)",
            cursor: "pointer",
            fontSize: 10,
            fontFamily: "monospace",
            padding: "2px 4px",
            borderRadius: 4,
            transition: "color 0.15s ease",
          }}
        >
          {copied ? (
            <>
              <Check size={11} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "8px 10px",
          maxWidth: "100%",
          overflowX: "auto",
          fontSize: "11.5px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          lineHeight: 1.5,
          color: isUser ? "var(--smoky-black)" : "var(--white-2)",
          whiteSpace: "pre",
          background: "transparent",
        }}
      >
        <code>{codeString}</code>
      </pre>
    </div>
  );
}

function cleanProps<T extends Record<string, unknown>>(props: T): Omit<T, "node"> {
  const { node: unusedNode, ...rest } = props;
  void unusedNode;
  return rest;
}

// Safely transforms standalone <br> / <br/> HTML nodes into standard markdown break nodes
function remarkBr() {
  function visit(node: { type?: string; value?: string; children?: unknown[] }) {
    if (!node || !node.children || !Array.isArray(node.children)) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i] as { type?: string; value?: string; children?: unknown[] };
      if (child.type === "html" && typeof child.value === "string" && /^\s*<br\s*\/?>\s*$/i.test(child.value)) {
        node.children[i] = { type: "break" };
      } else {
        visit(child);
      }
    }
  }

  return (tree: { type?: string; children?: unknown[] }) => {
    visit(tree);
  };
}

interface BotMarkdownProps {
  content: string;
  isUser?: boolean;
}

export default function BotMarkdown({ content, isUser = false }: BotMarkdownProps) {
  if (!content) return null;

  return (
    <div className="bot-markdown-content" style={{ maxWidth: "100%" }}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkBr]}
        components={{
          p: ({ children, ...props }) => (
            <p
              style={{
                margin: "0 0 8px 0",
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "inherit",
              }}
              {...cleanProps(props)}
            >
              {children}
            </p>
          ),
          strong: ({ children, ...props }) => (
            <strong
              style={{
                fontWeight: isUser ? 700 : 600,
                color: isUser ? "inherit" : "var(--white-1)",
              }}
              {...cleanProps(props)}
            >
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em
              style={{
                fontStyle: "italic",
                color: "inherit",
              }}
              {...cleanProps(props)}
            >
              {children}
            </em>
          ),
          h1: ({ children, ...props }) => (
            <h1
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: isUser ? "inherit" : "var(--orange-yellow-crayola)",
                margin: "8px 0 4px 0",
                lineHeight: 1.35,
              }}
              {...cleanProps(props)}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              style={{
                fontSize: "13.5px",
                fontWeight: 600,
                color: isUser ? "inherit" : "var(--orange-yellow-crayola)",
                margin: "8px 0 4px 0",
                lineHeight: 1.35,
              }}
              {...cleanProps(props)}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: isUser ? "inherit" : "var(--white-1)",
                margin: "6px 0 3px 0",
                lineHeight: 1.35,
              }}
              {...cleanProps(props)}
            >
              {children}
            </h3>
          ),
          ul: ({ children, ...props }) => (
            <ul
              style={{
                margin: "4px 0 8px 0",
                paddingLeft: 18,
                listStyleType: "disc",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
              {...cleanProps(props)}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              style={{
                margin: "4px 0 8px 0",
                paddingLeft: 18,
                listStyleType: "decimal",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
              {...cleanProps(props)}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li
              style={{
                lineHeight: 1.5,
                color: "inherit",
              }}
              {...cleanProps(props)}
            >
              {children}
            </li>
          ),
          code: ({ children, ...props }) => (
            <code
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "11.5px",
                background: isUser ? "hsla(0, 0%, 0%, 0.12)" : "hsla(0, 0%, 0%, 0.35)",
                border: isUser
                  ? "1px solid hsla(0, 0%, 0%, 0.15)"
                  : "1px solid hsla(0, 0%, 100%, 0.12)",
                padding: "1.5px 5px",
                borderRadius: 4,
                color: isUser ? "inherit" : "var(--orange-yellow-crayola)",
                wordBreak: "break-word",
              }}
              {...cleanProps(props)}
            >
              {children}
            </code>
          ),
          pre: ({ children, ...props }) => (
            <CodeBlock isUser={isUser} {...cleanProps(props)}>
              {children}
            </CodeBlock>
          ),
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http") || href?.startsWith("//");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                style={{
                  color: isUser ? "inherit" : "var(--orange-yellow-crayola)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  fontWeight: 500,
                }}
                {...cleanProps(props)}
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children, ...props }) => (
            <blockquote
              style={{
                borderLeft: isUser
                  ? "2px solid var(--smoky-black)"
                  : "2px solid var(--orange-yellow-crayola)",
                paddingLeft: 10,
                margin: "6px 0",
                color: isUser ? "inherit" : "var(--light-gray)",
                fontStyle: "italic",
              }}
              {...cleanProps(props)}
            >
              {children}
            </blockquote>
          ),
          hr: (props) => (
            <hr
              style={{
                border: "none",
                borderTop: isUser
                  ? "1px solid hsla(0, 0%, 0%, 0.15)"
                  : "1px solid hsla(0, 0%, 100%, 0.1)",
                margin: "8px 0",
              }}
              {...cleanProps(props as unknown as Record<string, unknown>)}
            />
          ),
          table: ({ children, ...props }) => (
            <div
              className="bot-table-wrapper"
              style={{
                overflowX: "auto",
                margin: "10px 0",
                maxWidth: "100%",
                borderRadius: 8,
                border: isUser
                  ? "1px solid hsla(0, 0%, 0%, 0.15)"
                  : "1px solid hsla(0, 0%, 100%, 0.1)",
                background: isUser
                  ? "hsla(0, 0%, 0%, 0.05)"
                  : "hsla(0, 0%, 7%, 0.7)",
              }}
            >
              <table
                className="bot-table"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  minWidth: "300px",
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                }}
                {...cleanProps(props)}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              style={{
                borderBottom: isUser
                  ? "1px solid hsla(0, 0%, 0%, 0.25)"
                  : "1px solid hsla(45, 100%, 72%, 0.3)",
                background: isUser ? "hsla(0, 0%, 0%, 0.08)" : "hsla(0, 0%, 12%, 0.8)",
                padding: "6px 10px",
                textAlign: "left",
                color: isUser ? "inherit" : "var(--orange-yellow-crayola)",
                fontWeight: 600,
                fontSize: "10.5px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                verticalAlign: "top",
                whiteSpace: "nowrap",
              }}
              {...cleanProps(props)}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              style={{
                borderBottom: isUser
                  ? "1px solid hsla(0, 0%, 0%, 0.1)"
                  : "1px solid hsla(0, 0%, 100%, 0.08)",
                padding: "7px 10px",
                color: isUser ? "inherit" : "var(--white-2)",
                verticalAlign: "top",
                wordBreak: "normal",
              }}
              {...cleanProps(props)}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
