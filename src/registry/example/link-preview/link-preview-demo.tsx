import LinkPreview from "@/registry/sonaui/link-preview/link-preview";

export default function LinkPreviewExample() {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex h-full w-full items-center justify-center"
          />
        </li>
      </ul>
    </div>
  );
}
