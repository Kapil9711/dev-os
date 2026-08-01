import React from "react";

import MarkdownFilePreview from "@/features/markdownPreview/components/MarkdownPreviewFile";
import Container from "../common/Container";
import SpecularButton from "../common/SpecularButton";
import { useWindowManager } from "@/features/window-manager";

export const HowIBuild = () => {
  const { openWindow } = useWindowManager();
  return (
    <section className="hidden py-5 @3xl:block" id="howibuild">
      <Container>
        <MarkdownFilePreview path="/docs/thoughtProcess.md" />
        <div className="flex items-center justify-center">
          <SpecularButton
            size="lg"
            radius={18}
            tint="#0986a5"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#067c9d"

            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            onClick={() => {
              openWindow("thoughtProcess", {
                height: 550,
                width: 900,
              });
            }}
          >
            Explore More
          </SpecularButton>
        </div>
      </Container>
    </section>
  );
};
