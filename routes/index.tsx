import { Head } from "$fresh/runtime.ts";
import generateSimpleRandomName from "../strategies/simple.ts";

const bigWord = "font-bold text(center 5xl black)";
const sectionHeader = "font-bold text(left 2xl gray-500)";
export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">
          Here's your random name!
        </p>
        <h1 class={sectionHeader}>Simple Strategy</h1>
        <h2 class={bigWord}>{generateSimpleRandomName()}</h2>
        <hr />
      </div>
    </>
  );
}
