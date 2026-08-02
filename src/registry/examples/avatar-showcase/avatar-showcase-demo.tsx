import AvatarShowcase, {
  type AvatarShowcaseItem,
} from "@/registry/sonaui/avatar-showcase/avatar-showcase";

const FOLLOWERS: AvatarShowcaseItem[] = [
  { id: "1", name: "Maya Chen", imageUrl: "https://i.pravatar.cc/160?img=5" },
  {
    id: "2",
    name: "Noah Williams",
    imageUrl: "https://i.pravatar.cc/160?img=12",
  },
  {
    id: "3",
    name: "Aisha Rahman",
    imageUrl: "https://i.pravatar.cc/160?img=32",
  },
  { id: "4", name: "Leo Martin", imageUrl: "https://i.pravatar.cc/160?img=11" },
  {
    id: "5",
    name: "Sofia Silva",
    imageUrl: "https://i.pravatar.cc/160?img=47",
  },
  { id: "6", name: "Ethan Kim", imageUrl: "https://i.pravatar.cc/160?img=68" },
  {
    id: "7",
    name: "Amara Okafor",
    imageUrl: "https://i.pravatar.cc/160?img=44",
  },
  {
    id: "8",
    name: "Oliver Smith",
    imageUrl: "https://i.pravatar.cc/160?img=15",
  },
  { id: "9", name: "Priya Nair", imageUrl: "https://i.pravatar.cc/160?img=49" },
  {
    id: "10",
    name: "Mateo Garcia",
    imageUrl: "https://i.pravatar.cc/160?img=53",
  },
  { id: "11", name: "Hana Sato", imageUrl: "https://i.pravatar.cc/160?img=25" },
  { id: "12", name: "Jon Bell", imageUrl: "https://i.pravatar.cc/160?img=3" },
];

export default function AvatarShowcaseExample() {
  return (
    <AvatarShowcase
      items={FOLLOWERS}
      message="Thanks for following"
      totalCount={912}
    />
  );
}
