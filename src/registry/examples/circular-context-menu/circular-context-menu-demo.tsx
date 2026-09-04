"use client";

import { useState } from "react";

import CircularContextMenu from "@/registry/sonaui/circular-context-menu/circular-context-menu";

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-4"
      fill="currentColor"
    >
      <title>Add</title>
      <path d="m10.75,6.75H1.25c-.414,0-.75-.336-.75-.75s.336-.75.75-.75h9.5c.414,0,.75.336.75.75s-.336.75-.75.75Z" />
      <path d="m6,11.5c-.414,0-.75-.336-.75-.75V1.25c0-.414.336-.75.75-.75s.75.336.75.75v9.5c0,.414-.336.75-.75.75Z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="size-[18px]"
      fill="currentColor"
    >
      <title>Edit</title>
      <path d="m15.478,3.358-.835-.835c-.66-.662-1.813-.661-2.475,0L2.513,12.177c-.331,.331-.513,.77-.513,1.237s.182,.907,.513,1.237l.835,.835c.331,.331,.77,.513,1.238,.513s.907-.182,1.237-.513l9.656-9.653c.331-.331.513-.77.513-1.237s-.182-.907-.513-1.237Zm-1.061,1.414-1.78,1.78-1.189-1.189,1.78-1.78c.064-.063.138-.073.177-.073s.113.009.177.073l.836.836c.063.063.073.138.073.176s-.01.113-.073.177Z" />
      <path d="m7.243,3.492-.946-.315-.316-.947c-.102-.306-.609-.306-.711,0l-.316.947-.946.315c-.153.051-.257.194-.257.356s.104.305.257.356l.946.315.316.947c.051.153.194.256.355.256s.305-.104.355-.256l.316-.947.946-.315c.153-.051.257-.194.257-.356s-.104-.305-.257-.356Z" />
      <path d="m16.658,11.99-1.263-.421-.421-1.263c-.137-.408-.812-.408-.949,0l-.421,1.263-1.263.421c-.204.068-.342.259-.342.474s.138.406.342.474l1.263.421.421,1.263c.068.204.26.342.475.342s.406-.138.475-.342l.421-1.263 1.263-.421c.204-.068.342-.259.342-.474s-.138-.406-.342-.474Z" />
      <circle cx="9.25" cy="1.75" r=".75" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="size-[18px]"
      fill="none"
    >
      <title>Message</title>
      <path
        d="M9,1.75C4.996,1.75,1.75,4.996,1.75,9c0,1.319,.358,2.552,.973,3.617,.43,.806-.053,2.712-.973,3.633,1.25,.068,2.897-.497,3.633-.973,.489,.282,1.264,.656,2.279,.848,.433,.082,.881,.125,1.338,.125,4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="5.5" cy="9" r="1" fill="currentColor" />
      <circle cx="9" cy="9" r="1" fill="currentColor" opacity=".75" />
      <circle cx="12.5" cy="9" r="1" fill="currentColor" opacity=".5" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="size-[18px]"
      fill="none"
    >
      <title>Delete</title>
      <path
        d="M13.6977 7.75 13.35 14.35c-.056 1.0701-.934 1.9-1.997 1.9H6.64804c-1.064 0-1.94101-.83-1.99701-1.9L4.30334 7.75M2.75 4.75h12.5M6.75 4.75v-2c0-.55.448-1 1-1h2.5c.552 0 1 .45 1 1v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function CircularContextMenuDemo() {
  const [message, setMessage] = useState("Select the concept card");
  return (
    <div>
      <CircularContextMenu.Root>
        <CircularContextMenu.Anchor
          aria-label="Open checkout flow actions"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-sm"
        >
          <PlusIcon />
        </CircularContextMenu.Anchor>
        <CircularContextMenu.Content placement="right" radius={100}>
          <CircularContextMenu.Item
            aria-label="Edit checkout flow"
            onSelect={() => setMessage("Edit selected")}
          >
            <EditIcon />
          </CircularContextMenu.Item>
          <CircularContextMenu.Item
            aria-label="Message checkout flow"
            onSelect={() => setMessage("Message selected")}
          >
            <MessageIcon />
          </CircularContextMenu.Item>
          <CircularContextMenu.Item
            aria-label="Delete checkout flow"
            destructive
            onSelect={() => setMessage("Delete selected")}
          >
            <DeleteIcon />
          </CircularContextMenu.Item>
        </CircularContextMenu.Content>
      </CircularContextMenu.Root>
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </div>
  );
}
