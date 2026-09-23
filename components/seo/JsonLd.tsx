/**
 * Renders structured data as a plain <script> so it is present in the
 * server-rendered HTML. next/script injects on the client, which crawlers
 * that don't execute JS never see.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a string containing "</script>" can't break out of the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
