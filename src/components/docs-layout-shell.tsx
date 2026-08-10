import { GuideframeGrid } from "@guideframe/react";
import type { ReactNode } from "react";

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="relative min-h-svh w-full">
      <GuideframeGrid
        panel={true}
        rulers={true}
        maxWidth={768}
        margin={8}
        columns={{ desktop: 6, tablet: 4, mobile: 3 }}
        gutter={8}
        defaultVisible={false}
      />
      {children}
    </main>
  );
};

export default DocsLayoutShell;
