import { buildResumeMarkdown } from "../data/resume";

export function printResume() {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.src = "/resume.html";

  iframe.onload = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    iframe.contentWindow?.addEventListener("afterprint", () => {
      iframe.remove();
    });
  };

  document.body.appendChild(iframe);
}

export function downloadPdfResume() {
  const link = document.createElement("a");
  link.href = "/docs/resume.pdf";
  link.download = "Kapil-Rajput-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadMarkdownResume() {
  const blob = new Blob([buildResumeMarkdown()], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Kapil_Rajput_Resume.md";
  a.click();
  URL.revokeObjectURL(a.href);
}
