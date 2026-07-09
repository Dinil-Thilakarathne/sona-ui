import LinkPreview from "@/registry/sonaui/link-preview/link-preview";

export default function LinkPreviewExample() {
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex items-center justify-center h-full w-full"
          />
        </li>
      </ul>
    </div>
  );
}
