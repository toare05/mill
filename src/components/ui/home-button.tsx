"use client";

import Link from "next/link";
import { Button } from "./button";
import { Home } from "lucide-react";

export function HomeButton() {
  return (
    <Link href="/" className="absolute top-4 left-4 z-10">
      <Button variant="outline" size="icon" aria-label="홈으로 이동">
        <Home className="h-4 w-4" />
      </Button>
    </Link>
  );
} 