"use client";

import { useEffect, useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import { storageKeys, loadFromStorage, saveToStorage } from "@/lib/local-storage";
import type { TaskKey } from "@/lib/site-config";

export function DirectoryHeaderActions({
  task,
  postId,
  shareUrl,
}: {
  task: TaskKey;
  postId: string;
  shareUrl: string;
}) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const key = task === "classified" ? storageKeys.adSaves : storageKeys.listingSaves;

  useEffect(() => {
    const ids = loadFromStorage<string[]>(key, []);
    setSaved(ids.includes(postId));
  }, [key, postId]);

  const toggleSave = () => {
    const ids = loadFromStorage<string[]>(key, []);
    const has = ids.includes(postId);
    const next = has ? ids.filter((id) => id !== postId) : [postId, ...ids];
    saveToStorage(key, next);
    setSaved(!has);
  };

  const onShare = async () => {
    try {
      const absoluteUrl = shareUrl.startsWith("http")
        ? shareUrl
        : `${window.location.origin}${shareUrl}`;
      if (navigator.share) {
        await navigator.share({ url: absoluteUrl });
        return;
      }
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // no-op for cancelled share action
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onShare}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        <Share2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Share"}
      </button>
      <button
        type="button"
        onClick={toggleSave}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        <Bookmark className="h-3.5 w-3.5" /> {saved ? "Saved" : "Save"}
      </button>
    </>
  );
}
