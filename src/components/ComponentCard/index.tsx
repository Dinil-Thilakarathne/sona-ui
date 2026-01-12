import Image from "next/image";

import Tag from "../Common/tag";
import { type ComponentItemsPropsType } from "@/lib/types";
import AnimatedLink from "../Common/animated-link";

const ComponentCard: React.FC<ComponentItemsPropsType> = ({
  imgSrc,
  name,
  tag,
  href,
}) => {
  return (
    <div className="flex flex-col overflow-clip rounded-lg border bg-white p-2 shadow-md">
      {/* Image Section */}
      <div className="relative m-auto flex w-fit grow items-center justify-center">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={name}
            width={720}
            height={250}
            className="rounded-t-lgk w-auto md:rounded-t-none md:rounded-l-lg"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start space-x-0.5">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
        </div>

        {/* CTA Section */}
        <div className="mt-2 text-right">
          <AnimatedLink href={href} variant="outline" className="text-sm">
            View More
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
