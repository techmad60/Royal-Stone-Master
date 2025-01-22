// types.ts
export interface Faq {
    id: string; // Use the correct type based on your API, e.g., `number` if `id` is numeric
    question: string;
    answer: string;
    status: string; // Include this field even if the API sometimes omits it
  }
  