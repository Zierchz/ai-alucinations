type TokenType = "keyword" | "func" | "operator" | "string" | "number" | "text";

interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS: Record<string, string[]> = {
  Python: [
    "if",
    "for",
    "while",
    "def",
    "class",
    "import",
    "return",
    "pass",
    "try",
    "except",
    "with",
    "as",
    "in",
    "is",
    "not",
    "and",
    "or",
    "else",
    "elif",
    "None",
    "True",
    "False",
  ],
  Java: [
    "if",
    "for",
    "while",
    "class",
    "public",
    "private",
    "static",
    "void",
    "int",
    "String",
    "new",
    "return",
    "import",
    "package",
    "try",
    "catch",
    "var",
    "List",
    "null",
  ],
  TypeScript: [
    "if",
    "for",
    "while",
    "function",
    "const",
    "let",
    "var",
    "interface",
    "type",
    "class",
    "import",
    "export",
    "async",
    "await",
    "return",
    "null",
    "undefined",
    "true",
    "false",
  ],
  "C#": [
    "if",
    "for",
    "while",
    "class",
    "public",
    "private",
    "static",
    "void",
    "string",
    "int",
    "new",
    "return",
    "using",
    "namespace",
    "async",
    "await",
    "var",
    "null",
    "true",
    "false",
  ],
  PHP: [
    "if",
    "for",
    "while",
    "function",
    "class",
    "public",
    "private",
    "static",
    "return",
    "echo",
    "isset",
    "array",
    "foreach",
    "try",
    "catch",
    "null",
    "true",
    "false",
  ],
  Go: [
    "if",
    "for",
    "func",
    "package",
    "import",
    "return",
    "var",
    "const",
    "type",
    "struct",
    "interface",
    "defer",
    "go",
    "range",
    "select",
    "case",
    "nil",
    "true",
    "false",
  ],
};

export function tokenize(code: string, language: string): Token[] {
  const keywords = KEYWORDS[language] ?? [];
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    // String double quotes
    if (ch === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      j++;
      tokens.push({ type: "string", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // String single quotes
    if (ch === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      j++;
      tokens.push({ type: "string", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (ch >= "0" && ch <= "9") {
      let j = i;
      while (
        j < code.length &&
        ((code[j] >= "0" && code[j] <= "9") || code[j] === ".")
      )
        j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Words
    if (
      (ch >= "a" && ch <= "z") ||
      (ch >= "A" && ch <= "Z") ||
      ch === "_" ||
      ch === "$"
    ) {
      let j = i;
      while (j < code.length && (/\w/.test(code[j]) || code[j] === "$")) j++;
      const word = code.slice(i, j);
      if (keywords.includes(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (j < code.length && code[j] === "(") {
        tokens.push({ type: "func", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = j;
      continue;
    }

    // Operators
    const three = code.slice(i, i + 3);
    if (["===", "!==", "..."].includes(three)) {
      tokens.push({ type: "operator", value: three });
      i += 3;
      continue;
    }
    const two = code.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "&&", "||", ":=", "->", "=>"].includes(two)) {
      tokens.push({ type: "operator", value: two });
      i += 2;
      continue;
    }
    if ("=+-*/%<>!&|^~".includes(ch)) {
      tokens.push({ type: "operator", value: ch });
      i++;
      continue;
    }

    tokens.push({ type: "text", value: ch });
    i++;
  }

  return tokens;
}

export function tokensToHtml(tokens: Token[]): string {
  return tokens
    .map(({ type, value }) => {
      const escaped = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (type === "text") return escaped;
      return `<span class="code-${type}">${escaped}</span>`;
    })
    .join("");
}

export function highlight(code: string, language: string): string {
  return tokensToHtml(tokenize(code, language));
}
