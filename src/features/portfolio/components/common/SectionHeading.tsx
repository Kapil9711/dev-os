import Badge from "./Badge";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Badge className="mb-5">{eyebrow}</Badge>}

      <Heading>{title}</Heading>

      {description && <Paragraph className="mt-6">{description}</Paragraph>}
    </div>
  );
}
