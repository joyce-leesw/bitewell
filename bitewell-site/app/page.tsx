import Bitewell from "@/components/bitewell";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bitewell - AI Generated Recipes</title>
        <meta
          name="description"
          content="Generate quick and healthy recipes"
        />
      </Head>
      <Bitewell />
    </div>
  )
}