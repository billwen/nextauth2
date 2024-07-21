import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <header>Image Toolkits</header>
      <section>
        Upload your image
      </section>
      <section>
        Select your action
      </section>
      <section>
        Download your image
      </section>
    </main>
  );
}
