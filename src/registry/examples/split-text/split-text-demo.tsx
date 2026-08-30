import SplitText from "@/registry/sonaui/split-text/split-text";

export default function SplitTextExample() {
  return (
    <SplitText
      variant="words"
      className="max-w-md text-center"
      animationProps={{ duration: 0.3, stagger: 0.1 }}
    >
      <h2 className="font-semibold text-5xl text-foreground">
        Text that reveals itself, one word at a time.
      </h2>
    </SplitText>
  );
}
