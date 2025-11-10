# Profiler

AI-powered personality wiki profiler that generates detailed profiles about people using web search and AI.

## Features

- 🔍 **Web Search Integration**: Search the web using Exa API to gather information from multiple sources
- 🤖 **AI-Powered Profile Generation**: Automatically generate structured profiles using OpenRouter
- 📚 **Wiki-Like UI**: Fandom wiki-style layout with collapsible sections
- 📝 **Rich Content Display**: Markdown support for formatted profile content
- ⚡ **Fast & Modern**: Built with Next.js 15 and React 19

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))
- Exa API key ([Get one here](https://exa.ai))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/filiksyos/profiler.git
cd profiler
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your API keys:
```bash
cp .env.example .env
```

Then edit `.env` and add your keys:
```
OPENROUTER_API_KEY=your_openrouter_api_key_here
EXA_API_KEY=your_exa_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. Enter a person's name in the search bar
2. Profiler searches the web using Exa to gather information
3. AI analyzes the results and generates a structured wiki-style profile
4. View the profile with sections like Info, Personality, Story, Abilities, and Trivia

## Tech Stack

- **Framework**: Next.js 15
- **AI**: Vercel AI SDK with OpenRouter
- **Search**: Exa API
- **UI**: React 19, Tailwind CSS, Radix UI
- **Markdown**: react-markdown with remark-gfm

## License

MIT
