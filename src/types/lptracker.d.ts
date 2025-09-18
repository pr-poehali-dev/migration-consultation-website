declare global {
  interface Window {
    lptWg?: {
      push: (event: [string, string, any?]) => void;
      projectId?: number;
      parser?: boolean;
    };
  }
}

export {};