import clsx from "clsx"; // Use this for importing clsx
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}
