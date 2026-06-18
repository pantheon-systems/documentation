/**
 * Normalizes custom tags in markdown content by converting them to lowercase and handling self-closing tags.
 * This function processes markdown content while preserving code blocks to avoid modifying code examples.
 * Uses regex patterns to match and transform tag names while preserving attributes and content.
 *
 * @param input - The markdown string to process
 * @param tagName - The tag name to normalize (case-insensitive)
 * @returns The processed markdown string with normalized tags
 *
 * @example
 * // Converts <Check foo="bar" /> to <check foo="bar"></check>
 * // Converts <Check foo="bar"> to <check foo="bar">
 * // Converts </Check> to </check>
 * normalizeCustomTags('<Check foo="bar" />', 'Check')
 * // Returns: '<check foo="bar"></check>'
 */
export function normalizeCustomTags(input: string, tagName: string): string {
  const lower = tagName.toLowerCase();

  // Find all code block boundaries and mark lines to skip
  const codeBlockLines: [number, number][] = [];
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line starts with ``` (code block start)
    // Pattern: ``` (three backticks at start of line, optionally followed by language identifier)
    if (line.trim().startsWith("```")) {
      const start = i;

      // Look for the closing ``` in subsequent lines
      // Pattern: ``` (three backticks at start of line)
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim().startsWith("```")) {
          codeBlockLines.push([start, j]);
          i = j; // Skip to the end of this code block
          break; // Found the closing ```
        }
      }
      // If we reach here without finding a closing ```, treat the rest as code block
      // This prevents infinite loops and handles unclosed code blocks
    }
  }

  if (codeBlockLines.length === 0) {
    // Regex: <\s*tagName([^>]*)\/\s*>
    // Matches: <Check foo="bar" />, <  Check   />, <Check/>
    // Groups: tagName = Check, props = ' foo="bar" '
    // Converts self-closing: <Check foo="bar" /> → <check foo="bar"></check>
    input = input.replace(
      new RegExp(`<\\s*${tagName}([^>]*)\\/\\s*>`, "gi"),
      (_match, props) => `<${lower}${props}></${lower}>`
    );

    // Regex: <\s*tagName([^>]*)>
    // Matches: <Check foo="bar">, <  Check   >, <Check>
    // Groups: tagName = Check, props = ' foo="bar" '
    // Converts opening tags: <Check foo="bar"> → <check foo="bar">
    input = input.replace(
      new RegExp(`<\\s*${tagName}([^>]*)>`, "gi"),
      (_match, props) => `<${lower}${props}>`
    );

    // Regex: <\/\s*tagName\s*>
    // Matches: </Check>, <  /  Check  >, </Check>
    // Groups: tagName = Check
    // Converts closing tags: </Check> → </check>
    input = input.replace(
      new RegExp(`<\\/\\s*${tagName}\\s*>`, "gi"),
      `</${lower}>`
    );

    return input;
  }

  // If there are code block boundaries, we need to process the input line by line
  // and skip the lines that are inside the code block boundaries
  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check if this line is inside a code block
    const isInCodeBlock = codeBlockLines.some(
      ([start, end]) => i >= start && i <= end
    );

    if (isInCodeBlock) {
      newLines.push(line);
      continue;
    }

    // Regex: <\s*tagName([^>]*)\/\s*>
    // Matches: <Check foo="bar" />, <  Check   />, <Check/>
    // Groups: tagName = Check, props = ' foo="bar" '
    // Converts self-closing: <Check foo="bar" /> → <check foo="bar"></check>
    line = line.replace(
      new RegExp(`<\\s*${tagName}([^>]*)\\/\\s*>`, "gi"),
      (_match, props) => `<${lower}${props}></${lower}>`
    );

    // Regex: <\s*tagName([^>]*)>
    // Matches: <Check foo="bar">, <  Check   >, <Check>
    // Groups: tagName = Check, props = ' foo="bar" '
    // Converts opening tags: <Check foo="bar"> → <check foo="bar">
    line = line.replace(
      new RegExp(`<\\s*${tagName}([^>]*)>`, "gi"),
      (_match, props) => `<${lower}${props}>`
    );

    // Regex: <\/\s*tagName\s*>
    // Matches: </Check>, <  /  Check  >, </Check>
    // Groups: tagName = Check
    // Converts closing tags: </Check> → </check>
    line = line.replace(
      new RegExp(`<\\/\\s*${tagName}\\s*>`, "gi"),
      `</${lower}>`
    );

    newLines.push(line);
  }

  return newLines.join("\n");
}

/**
 * Parses JSX props string and converts it to HTML attribute format.
 * Handles various prop formats including boolean props, quoted strings, and JSX expressions.
 * Uses a state machine approach with character-by-character parsing to handle nested braces,
 * quoted strings, and escaped characters without relying on regex for the main parsing logic.
 *
 * @param propsString - The JSX props string to parse (e.g., 'foo="bar" baz={true} qux={"value"}')
 * @returns A space-separated string of HTML attributes
 *
 * @example
 * parseJsxProps('foo="bar" baz={true} qux={"value"}')
 * // Returns: 'foo="bar" baz="true" qux="value"'
 *
 * parseJsxProps('disabled')
 * // Returns: 'disabled="true"'
 */
function parseJsxProps(propsString: string): string {
  const props: string[] = [];
  let i = 0;
  const len = propsString.length;
  let key = "";
  let val = "";
  let state: "key" | "beforeValue" | "inValue" = "key";
  let quoteChar: string | null = null;
  let braceDepth = 0;

  const flush = () => {
    const trimmedKey = key.trim();
    const trimmedVal = val.trim();

    if (trimmedKey) {
      if (!trimmedVal) {
        props.push(`${trimmedKey}="true"`);
      } else {
        let v = trimmedVal;
        // Only process JSX expressions, leave quoted HTML values as-is
        if (v.startsWith("{") && v.endsWith("}")) {
          const innerContent = v.slice(1, -1).trim();
          // If the inner content is already quoted, remove those quotes too
          if (
            (innerContent.startsWith('"') && innerContent.endsWith('"')) ||
            (innerContent.startsWith("'") && innerContent.endsWith("'"))
          ) {
            v = innerContent.slice(1, -1);
          } else {
            v = innerContent;
          }
          props.push(`${trimmedKey}="${v}"`);
        } else {
          // Already a quoted HTML value, do not strip quotes
          props.push(`${trimmedKey}=${v}`);
        }
      }
    }

    key = "";
    val = "";
    state = "key";
    quoteChar = null;
    braceDepth = 0;
  };

  while (i < len) {
    const char = propsString[i];

    if (state === "key") {
      if (char === "=") {
        state = "beforeValue";
      } else if (!/\s/.test(char)) {
        key += char;
      } else if (key) {
        // key followed by space (boolean prop)
        flush();
      }
    } else if (state === "beforeValue") {
      if (char === "{") {
        state = "inValue";
        braceDepth = 1;
        val += char;
      } else if (char === '"' || char === "'") {
        state = "inValue";
        quoteChar = char;
        val += char;
      } else if (!/\s/.test(char)) {
        state = "inValue";
        val += char;
      }
    } else if (state === "inValue") {
      val += char;

      if (quoteChar) {
        // Check for escaped quotes
        if (char === quoteChar && propsString[i - 1] !== "\\") {
          flush();
        }
      } else if (braceDepth > 0) {
        if (char === "{") braceDepth++;
        else if (char === "}") braceDepth--;
        if (braceDepth === 0) flush();
      } else if (/\s/.test(char)) {
        flush();
      }
    }

    i++;
  }

  flush(); // final prop
  return props.join(" ");
}

/**
 * Converts JSX-style props in markdown content to HTML attribute format.
 * This function processes markdown content and converts JSX expressions like {"value"}
 * to standard HTML attributes, while preserving self-closing tags.
 * Uses regex to match HTML/JSX tags and their attributes, then delegates prop parsing
 * to the parseJsxProps function for detailed attribute conversion.
 *
 * @param markdown - The markdown string containing JSX-style tags
 * @returns The markdown string with converted HTML attributes
 *
 * @example
 * convertJsxPropsToHtml('<div foo="bar" baz={true} qux={"value"} />')
 * // Returns: '<div foo="bar" baz="true" qux="value" />'
 *
 * convertJsxPropsToHtml('<span className="test" />')
 * // Returns: '<span className="test" />'
 */
export function convertJsxPropsToHtml(markdown: string): string {
  // Regex: <(\w+)([^>]*)\s*(\/?)>
  // Matches: <div foo="bar" />, <span className="test">, <hr/>
  // Groups: tag = 'div', props = ' foo="bar" ', selfClosing = '/'
  // Groups: tag = 'span', props = ' className="test"', selfClosing = ''
  // Groups: tag = 'hr', props = '', selfClosing = '/'
  return markdown.replace(
    /<(\w+)([^>]*)\s*(\/?)>/g,
    (full, tag, props, selfClosing) => {
      const trimmedProps = (props || "").trim();
      // If props is only a slash, treat as no props
      const isOnlySlash = trimmedProps === "/";
      // If props ends with a slash, remove it for parsing
      // Regex: /\/$/
      // Matches: trailing slash at end of props string
      const propsForParse = isOnlySlash
        ? ""
        : trimmedProps.replace(/\/$/, "").trim();
      const convertedProps = propsForParse ? parseJsxProps(propsForParse) : "";
      // Always output the slash for self-closing tags
      if (full.endsWith("/>")) {
        if (convertedProps.trim()) {
          return `<${tag} ${convertedProps} />`;
        } else {
          return `<${tag}/>`;
        }
      } else {
        return `<${tag}${convertedProps.trim() ? " " + convertedProps : ""}>`;
      }
    }
  );
}
