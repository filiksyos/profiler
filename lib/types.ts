export interface ProfileData {
  name: string;
  summary?: string;
  info?: Record<string, string>;
  personality?: string;
  interests?: string;
  story?: string;
  abilities?: string;
  trivia?: string;
  imageUrl?: string;
}

export interface SearchResult {
  title: string;
  url: string;
  text?: string;
  snippet?: string;
}
