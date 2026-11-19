"use client";

import { ContactSidebar } from "./ContactSidebar";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <div className="flex h-full">
      <ContactSidebar />
      <ContactForm />
    </div>
  );
}

export default Contact;
