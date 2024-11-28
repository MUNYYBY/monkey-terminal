"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import LandingWelcomeButton from "../LandingWelcomeButton/LandingWelcomeButton";
import moment from "moment";
import { ChatWithBot, GetChatHistory } from "@/Client/request";
import { Button, Input, Spin } from "antd";
import { MarkdownRenderer } from "./MardownRenderer";
import { Inter } from "next/font/google";

const InterFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Chatbot() {
  //** states */
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  //** auth */
  const auth = useAuth();

  const handleSendMessage = () => {
    if (input.trim()) {
      setLoading(true);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          role: "user",
          content: input,
          createdAt: moment().unix(),
        },
      ]);
      ChatWithBot({ query: input }).then((res: any) => {
        if (res.data) {
          setMessages(res.data.reverse());
        }
        setLoading(false);
      });
      setInput("");
    }
  };

  useEffect(() => {
    if (auth.user)
      GetChatHistory().then((res: any) => {
        if (res.data) {
          setMessages(res.data.reverse());
        }
        setLoading(false);
      });
  }, [auth.user]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={clsx(
        "fixed bottom-0 z-10 w-full",
        isOpen && "h-96",
        InterFont.className,
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-primary py-2 text-black transition-all hover:bg-primary/95"
      >
        <p className="text-sm">Chat With MonkeyAI</p>
        {isOpen ? (
          <ChevronDoubleDownIcon className="size-5" />
        ) : (
          <ChevronDoubleUpIcon className="size-5" />
        )}
      </div>
      {isOpen && (
        <div className="h-full bg-black">
          {auth.user ? (
            <div className="relative flex h-full w-full flex-col">
              <div className="flex-1 gap-3 overflow-y-auto p-3 pb-10">
                {messages.map((msg: any, index: number) =>
                  msg.role === "user" ? (
                    <div
                      key={index}
                      className="flex w-full flex-col items-end justify-end"
                    >
                      <div className="w-fit rounded-xl bg-primary p-3 text-sm text-white">
                        {msg.content}
                      </div>
                      <p className="my-3 text-xs">
                        {moment.unix(msg.createdAt).fromNow()}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex w-full flex-col items-start justify-start"
                    >
                      <div className="w-fit break-words rounded-xl bg-[#1B1C24] p-3 text-sm text-white">
                        <MarkdownRenderer content={msg.content} />
                      </div>
                      <p className="my-3 text-xs">
                        {moment.unix(msg.createdAt).fromNow()}
                      </p>
                    </div>
                  ),
                )}
                {loading && (
                  <div className="flex w-full animate-pulse flex-col items-start justify-start">
                    <div className="w-fit rounded-xl bg-gray-700 p-3 text-sm text-white">
                      Thinking{"        "}
                      <span>
                        <Spin />
                      </span>
                    </div>
                  </div>
                )}
                {/* Scroll to bottom marker */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="sticky bottom-0 flex w-full gap-2 bg-black p-4">
                <Input
                  className="mr-2 flex-1 !border-[#2A2D3C] !bg-[#1B1C24] px-3 py-2 text-sm !text-white placeholder:!text-white"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onPressEnter={handleSendMessage}
                />
                <Button
                  type="primary"
                  className="!bg-primary !py-5 hover:!bg-primary"
                  onClick={handleSendMessage}
                >
                  <PaperAirplaneIcon className="size-6 text-white" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <p className="text-lg">Please login to chat with Monkey</p>
              <LandingWelcomeButton isNormalButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
