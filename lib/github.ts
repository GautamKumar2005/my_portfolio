export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
}

export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      "https://api.github.com/users/GautamKumar2005/repos?type=owner&per_page=100"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos: GitHubRepo[] = await response.json();

    const pinnedRepos = [
      "insipreShop",
      "QuantEdge",
      "PTX-Analyzer-Static-Analysis-Optimization-Tool-for-GPU-Kernels",
      "CuisineAI-Food-Image-to-Recipe-Generation",
      "Vehicle-Number-plate-detection",
      "AI_Driven_Solutions_for_farmers_in_India"
    ];

    // Filter to only include pinned repos and preserve the order
    const topRepos = pinnedRepos
      .map(name => repos.find(repo => repo.name === name))
      .filter((repo): repo is GitHubRepo => repo !== undefined);

    return topRepos;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    Python: "bg-blue-600",
    Java: "bg-orange-600",
    "C++": "bg-blue-700",
    C: "bg-gray-700",
    Go: "bg-cyan-500",
    Rust: "bg-orange-700",
    SQL: "bg-purple-600",
  };

  return colors[language || ""] || "bg-gray-600";
}
