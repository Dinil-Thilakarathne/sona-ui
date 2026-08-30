import ImageTrail from "@/registry/sonaui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailBlurExample() {
  return (
    <ImageTrail images={images} variant="blur" className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Blur trail
        </h3>
      </div>
    </ImageTrail>
  );
}
