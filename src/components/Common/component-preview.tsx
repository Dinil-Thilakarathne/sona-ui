"use client";
import { useEffect, useState } from "react";

interface ComponentPreviewProps {
  componentPath: string; // Path to the component example file relative to the `registry/example/` directory
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentPath,
}) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const importedModule = await import(
          `@/registry/example/${componentPath}`
        );
        setComponent(() => importedModule.default);
      } catch (error) {
        console.error(`Error loading component at ${componentPath}:`, error);
      }
    };

    loadComponent();
  }, [componentPath]);

  if (!Component) {
    return <div>Loading component preview...</div>;
  }

  return (
    <div className="py-4">
      <Component />
    </div>
  );
};

export default ComponentPreview;
