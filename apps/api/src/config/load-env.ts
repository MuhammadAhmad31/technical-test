import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const parseEnvLine = (line: string) => {
  const separatorIndex = line.indexOf("=");

  if (separatorIndex === -1) {
    return null;
  }

  const key = line.slice(0, separatorIndex).trim();
  const rawValue = line.slice(separatorIndex + 1).trim();

  if (!key || key.startsWith("#")) {
    return null;
  }

  return {
    key,
    value: unquote(rawValue)
  };
};

const unquote = (value: string) => {
  const first = value.at(0);
  const last = value.at(-1);

  if ((first === `"` && last === `"`) || (first === `'` && last === `'`)) {
    return value.slice(1, -1);
  }

  return value;
};

const loadEnv = (filePath = resolve(process.cwd(), ".env")) => {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const parsed = parseEnvLine(line);

    if (parsed && process.env[parsed.key] === undefined) {
      process.env[parsed.key] = parsed.value;
    }
  }
};

loadEnv();
