import React from "react";

import MarkdownFilePreview from "@/features/markdownPreview/components/MarkdownPreviewFile";
import Container from "../common/Container";

export const HowIBuild = () => {
  return (
    <section className="py-5" id="howibuild">
      {/* <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      /> */}
      <Container>
        <MarkdownFilePreview path="/docs/howIBuild.md" />
      </Container>
    </section>
  );
};
