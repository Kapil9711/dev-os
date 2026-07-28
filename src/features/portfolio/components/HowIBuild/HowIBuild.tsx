import React from "react";

import MarkdownFilePreview from "@/features/markdownPreview/components/MarkdownPreviewFile";
import Container from "../common/Container";

export const HowIBuild = () => {
  return (
    <section className="hidden py-5 @3xl:block" id="howibuild">
      <Container>
        <MarkdownFilePreview path="/docs/howIBuild.md" />
      </Container>
    </section>
  );
};
