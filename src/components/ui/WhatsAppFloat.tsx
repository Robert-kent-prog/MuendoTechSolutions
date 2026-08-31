import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/seo";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello Muendo Tech Solutions, I would like to enquire about a software development project.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 size-12 rounded-full bg-[#25D366] text-white shadow-lg grid place-items-center hover:scale-105 transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <MessageCircle className="size-6 fill-current" />
    </a>
  );
}
