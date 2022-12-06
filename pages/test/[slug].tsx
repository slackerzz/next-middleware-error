import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const DATA: { [k: string]: { name: string } } = {
  foo: { name: "foo" },
  bar: { name: "bar" },
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  if (!Object.keys(DATA).includes(params?.slug!)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: DATA[params?.slug!],
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {params: {slug: 'foo'}},
      {params: {slug: 'bar'}},
    ],
    fallback: "blocking",
  };
}
const Slug = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("props:", JSON.stringify(props))

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <code>name: {props.data.name}</code>
        </h1>
        <div>
          <Link href="/">back</Link>
        </div>
      </main>
    </div>
  );
};

export default Slug;
