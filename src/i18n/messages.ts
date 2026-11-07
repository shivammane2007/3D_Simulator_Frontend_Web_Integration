import React, { type ReactNode } from 'react';
import messagesData from '@/data/procedure-messages';

function getNestedValue(obj: any, path: string): any {
  if (!obj) return path;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return path;
    }
  }
  return current;
}

export type Translator = {
  (key: string, params?: Record<string, string | number>): string;
  raw: (key: string) => any;
  rich: (key: string, values?: Record<string, any>) => ReactNode;
};

export function createTranslator(namespace?: string): Translator {
  const root = namespace ? getNestedValue(messagesData, namespace) : messagesData;

  const t = ((key: string, params?: Record<string, string | number>): string => {
    let val = getNestedValue(root, key);
    if (typeof val !== 'string') {
      return typeof val === 'object' && val !== null ? '' : String(val ?? key);
    }
    if (params) {
      for (const [pKey, pVal] of Object.entries(params)) {
        val = val.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
      }
    }
    return val;
  }) as Translator;

  t.raw = (key: string) => {
    return getNestedValue(root, key);
  };

  t.rich = (key: string, values?: Record<string, any>): ReactNode => {
    let text = getNestedValue(root, key);
    if (typeof text !== 'string') return '';

    if (values) {
      for (const [k, v] of Object.entries(values)) {
        if (typeof v === 'string' || typeof v === 'number') {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }
    }

    if (!values) return text;

    const tagRegex = /<([a-zA-Z0-9]+)>([\s\S]*?)<\/\1>/g;
    const elements: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyIdx = 0;

    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
      const tagName = match[1];
      const content = match[2];
      const renderer = values[tagName];
      if (typeof renderer === 'function') {
        elements.push(React.createElement('span', { key: keyIdx++ }, renderer(content || undefined)));
      } else {
        elements.push(content);
      }
      lastIndex = tagRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  return t;
}

export async function getTranslations(namespace?: string): Promise<Translator> {
  return createTranslator(namespace);
}

export async function getLocale(): Promise<string> {
  return 'en';
}

export function useLocale(): string {
  return 'en';
}

export function useTranslations(namespace?: string): Translator {
  return createTranslator(namespace);
}

export function setRequestLocale(_locale: string): void {
  // no-op
}
