"use client";

import { Archive, Flag, RotateCcw, Trash2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import SwipeActionRow from "@/registry/sonaui/swipe-action-row/swipe-action-row";

const initialMessages = [
  {
    id: 1,
    sender: "Maya Chen",
    subject: "Reviewing the motion pass",
    preview: "The settling behavior feels much closer to the native pattern.",
    flagged: false,
  },
  {
    id: 2,
    sender: "Noah Williams",
    subject: "Updated project timeline",
    preview: "I moved the interaction review to Friday afternoon.",
    flagged: false,
  },
  {
    id: 3,
    sender: "Ava Patel",
    subject: "Notes from yesterday",
    preview: "Keyboard and touch behavior are ready for another pass.",
    flagged: true,
  },
];

export default function SwipeActionRowDemo() {
  const [messages, setMessages] = useState(initialMessages);
  const shouldReduceMotion = useReducedMotion();

  const removeMessage = (id: number) =>
    setMessages((current) => current.filter((message) => message.id !== id));

  const toggleFlag = (id: number) =>
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, flagged: !message.flagged } : message,
      ),
    );

  return (
    <div className="w-full max-w-md overflow-clip rounded-2xl border border-border bg-background">
      <SwipeActionRow.Root render={<ul className="divide-y divide-border" />}>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <SwipeActionRow.Item
              key={message.id}
              closeOnScroll
              render={
                <motion.li
                  layout={!shouldReduceMotion}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.18, ease: [0.32, 0.72, 0, 1] }
                  }
                />
              }
            >
              <SwipeActionRow.Actions side="left">
                <SwipeActionRow.Action
                  fullSwipe
                  className="bg-sky-600 text-white"
                  onClick={() => removeMessage(message.id)}
                >
                  <Archive />
                  Archive
                </SwipeActionRow.Action>
              </SwipeActionRow.Actions>

              <SwipeActionRow.Actions side="right">
                <SwipeActionRow.Action
                  fullSwipe
                  className="bg-amber-500 text-white"
                  onClick={() => toggleFlag(message.id)}
                >
                  <Flag />
                  {message.flagged ? "Unflag" : "Flag"}
                </SwipeActionRow.Action>
                <SwipeActionRow.Action
                  variant="destructive"
                  onClick={() => removeMessage(message.id)}
                >
                  <Trash2 />
                  Delete
                </SwipeActionRow.Action>
              </SwipeActionRow.Actions>

              <SwipeActionRow.Content>
                <button
                  type="button"
                  className="flex min-h-24 w-full flex-col items-start justify-center gap-1 px-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex items-center gap-1.5 font-medium text-sm">
                    {message.sender}
                    {message.flagged && (
                      <Flag className="size-3.5 fill-amber-500 text-amber-500" />
                    )}
                  </span>
                  <span className="text-foreground text-sm">
                    {message.subject}
                  </span>
                  <span className="w-full truncate text-muted-foreground text-xs">
                    {message.preview}
                  </span>
                </button>
              </SwipeActionRow.Content>
            </SwipeActionRow.Item>
          ))}
        </AnimatePresence>
      </SwipeActionRow.Root>

      {messages.length === 0 && (
        <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">No messages left.</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            onClick={() => setMessages(initialMessages)}
          >
            <RotateCcw className="size-4" />
            Restore messages
          </button>
        </div>
      )}
    </div>
  );
}
