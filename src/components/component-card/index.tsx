import Image from "next/image";
import type { ComponentItemsPropsType } from "@/lib/types";
import AnimatedLink from "../common/animated-link";
import Tag from "../common/tag";

const ComponentCard: React.FC<ComponentItemsPropsType> = ({
  imgSrc,
  name,
  tag,
  href,
}) => {
  return (
    <div className="flex overflow-clip flex-col p-2 bg-white border rounded-lg shadow-md">
      {/* Image Section */}
      <div className="flex relative grow items-center justify-center m-auto w-fit">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={name}
            width={720}
            height={250}
            className="w-auto rounded-t-lgk md:rounded-l-lg md:rounded-t-none"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start space-x-0.5">
          <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
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
