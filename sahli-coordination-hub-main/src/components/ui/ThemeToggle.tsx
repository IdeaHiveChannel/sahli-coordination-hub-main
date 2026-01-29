import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5 md:gap-2 px-1"
    >
      <Sun size={12} className={isDark ? "text-muted-foreground" : "text-primary"} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
        className="scale-75 md:scale-90"
      />
      <Moon size={12} className={isDark ? "text-primary" : "text-muted-foreground"} />
    </motion.div>
  );
}
