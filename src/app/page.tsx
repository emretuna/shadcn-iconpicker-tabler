import { Separator } from "@/components/ui/separator";
import { Examples } from "@/components/examples";
import { Introduction } from "@/components/introduction";
import { Usage } from "@/components/usage";
import { Props } from "@/components/props";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-8">
        <Introduction />

        <Separator />
        <Usage />

        <Separator />
        <Examples />

        <Separator />
        <Props />
      </main>
      <footer className="text-sm text-muted-foreground text-center pb-4">
        <p>
          Made with ❤️ by{" "}
          <a href="https://github.com/emretuna" className="underline">
            Emre Tuna
          </a>
        </p>
      </footer>
    </div>
  );
}
