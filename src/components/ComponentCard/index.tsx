import React from "react";
import Image from "next/image";

import Button from "../Button";
import Tag from "../Common/Tag";
import { ComponentItemsProps } from "@/libs/types";

const ComponentCard: React.FC<ComponentItemsProps> = ({
  imgSrc,
  name,
  tag,
  href,
}) => {
  return (
    <div className="flex flex-col overflow-clip rounded-lg border bg-white p-2 shadow-md">
      {/* Image Section */}
      <div className="relative mx-auto h-fit w-fit">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={name}
            width={720}
            height={250}
            className="w-auto rounded-t-lg md:rounded-t-none md:rounded-l-lg"
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
          <Button link={href} variant="outline" className="text-sm">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
