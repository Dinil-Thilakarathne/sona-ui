"use client";
import { useState } from "react";
import AssignmentCluster from "@/registry/sonaui/assignment-cluster/assignment-cluster";

const people = [
  "Maya Chen",
  "Noah Williams",
  "Ava Patel",
  "Leo Martin",
  "Sofia Kim",
].map((name, index) => ({ id: String(index + 1), name }));
export default function AssignmentClusterDemo() {
  const [value, setValue] = useState(["1", "2"]);
  return <AssignmentCluster items={people} value={value} onChange={setValue} />;
}
