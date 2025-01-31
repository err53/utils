import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        utils
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">by err53</p>

      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li className="underline">
          <Link href="/car-loan">car-loan</Link>
        </li>
      </ul>
    </div>
  );
}
