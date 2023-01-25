import Head from 'next/head'

export default function CoreLayout(props: {
  children: JSX.Element
}): JSX.Element {
  return (
    <>
      <Head>
        <title>GOATify</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </>
  )
}
