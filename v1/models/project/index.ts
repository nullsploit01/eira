export type IProject = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string | null;
  url: string | null;
  githubLink: string | null;
  tags: string | null;
  image: string | null;
};
