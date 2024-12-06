import Chatbot from "@/components/Chatbot/chatbot";
import LandingWelcomeButton from "@/components/LandingWelcomeButton/LandingWelcomeButton";
import clsx from "clsx";
import { Jersey_15_Charted } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const Jersey_15_Charted_Font = Jersey_15_Charted({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="monkey-terminal">
      <div className="mt-10">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="relative w-full">
              <p
                className={clsx(
                  Jersey_15_Charted_Font.className,
                  "flex-grow text-center text-5xl md:text-7xl",
                )}
              >
                $MONKEYAI
              </p>
              <LandingWelcomeButton isNormalButton={false} />
            </div>

            <Image
              src="/monkey-terminal.gif"
              height={500}
              width={500}
              alt="monkey terminal"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-4xl">
                THE ERA OF SUPER INTELLIGENT APES IS
                <br className="hidden md:block" /> UPON US.
              </h1>
              <h2 className="text-center text-4xl">COMING SOON.</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-3xl">JUNGLE ADDRESS:</h1>
              <h2 className="text-center text-xl">
                6cnDfXAG9EsGn5BB1QF3i6Xx1SNJ88Qcc1nckJp6pump
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <Link
                href={
                  "https://dexscreener.com/solana/5fev8jhdrgqebzfox4m4bl2qmjxjcheywsseplu68pu6"
                }
                target="_blank"
              >
                <button className="w-32 rounded-lg bg-primary py-2 text-xl text-black">
                  DEXTOOLS
                </button>
              </Link>
              <Link href={"https://t.me/monkeyaipf"} target="_blank">
                <button className="w-32 rounded-lg bg-primary py-2 text-xl text-black">
                  TELEGRAM
                </button>
              </Link>
              <Link href={"https://x.com/MonkeyAIPF"} target="_blank">
                <button className="w-32 rounded-lg bg-primary py-2 text-xl text-black">
                  TWITTER
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full items-center justify-center bg-primary py-3">
          <p
            className={clsx(
              Jersey_15_Charted_Font.className,
              "text-4xl text-black",
            )}
          >
            $MONKEYAI
          </p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
