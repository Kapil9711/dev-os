export interface ProjectImage {
  image: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  featured: boolean;

  description: string;
  shortDescription?: string; // falls back to `description` if omitted
  responsibilities: string[];
  technologies: string[];
  architecture: string[];

  images: ProjectImage[]; // images[0] = big hero image, rest = small thumbnails
  website?: string;
  github?: string;
}
