export interface ProjectImage {
  id: string;

  title: string;

  image: string;
}

export interface Project {
  id: string;

  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  technologies: string[];

  images: ProjectImage[];

  github?: string;

  website?: string;

  featured: boolean;
}
