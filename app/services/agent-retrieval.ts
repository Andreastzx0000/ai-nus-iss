/**
 * Retrieval Agent - Executes scoped retrieval from allowlisted sources
 * Returns ranked passages with citations
 */

import type { RetrievalResult, Citation } from "~/types/agent";
import { mockPolicies } from "~/data/mock-policies";

export class RetrievalAgent {
  /**
   * Retrieve relevant passages from policy documents
   */
  async retrieve(query: string): Promise<RetrievalResult> {
    const startTime = Date.now();

    // Simulate semantic search with simple keyword matching
    const results = this.searchPolicies(query);

    const queryLatencyMs = Date.now() - startTime;

    return {
      passages: results.map((policy, idx) => ({
        id: `passage-${idx}`,
        content: policy.sections[0]?.content || policy.content,
        source: policy.title,
        score: 0.85 - idx * 0.05,
        metadata: {
          title: policy.title,
          lastUpdated: policy.lastUpdated,
          section: policy.sections[0]?.title,
        },
      })),
      sources: results.map((p) => p.title),
      totalResults: results.length,
      queryLatencyMs,
    };
  }

  /**
   * Generate citations from retrieval results
   */
  generateCitations(result: RetrievalResult): Citation[] {
    return result.passages.slice(0, 3).map((passage) => ({
      id: passage.id,
      source: passage.source,
      title: passage.metadata.title,
      excerpt: this.truncateText(passage.content, 150),
      confidence: passage.score,
    }));
  }

  /**
   * Simple keyword-based search (simulates vector search)
   */
  private searchPolicies(query: string) {
    const keywords = query.toLowerCase().split(" ");

    return mockPolicies
      .filter((policy) => {
        const searchText = `${policy.title} ${policy.content} ${policy.tags.join(" ")}`.toLowerCase();
        return keywords.some((keyword) => searchText.includes(keyword));
      })
      .slice(0, 5);
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
}
