import { useState } from "react";
import { Button, Input } from "@/components/ui";

interface TaskInputFormProps {
  onSubmit: (payload: { title: string; description: string; outline: string }) => void;
  isLoading?: boolean;
}

export function TaskInputForm({ onSubmit, isLoading }: TaskInputFormProps) {
  const [title, setTitle] = useState("");
  const [outline, setOutline] = useState("");

  return (
    <form
      className="space-y-3 border-b border-white/5 pb-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title: title.trim(), description: "", outline });
        setTitle("");
        setOutline("");
      }}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name"
        required
      />
      <textarea
        value={outline}
        onChange={(e) => setOutline(e.target.value)}
        placeholder="Steps (one per line, optional)"
        rows={3}
        className="w-full resize-none border-0 border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none"
      />
      <Button type="submit" variant="ghost" size="sm" isLoading={isLoading}>
        Add checklist
      </Button>
    </form>
  );
}
