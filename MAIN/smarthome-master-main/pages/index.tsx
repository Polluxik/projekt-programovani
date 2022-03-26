import Link from 'next/link'
import React, { useState } from 'react'
import {useViewerTwitchQuery} from '../lib/channels.graphql'
import { initializeApollo } from '../lib/apollo'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Menu } from '../components/menu'

const Index = () => {
  const [newName, setNewName] = useState('')

  
  const {data, loading, error} = useViewerTwitchQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <p>{data?.viewerTwitch.id}</p>
      <p>{data?.viewerTwitch.name}</p>
      <p>{data?.viewerTwitch.followers}</p>
      <p>{data?.viewerTwitch.subscribers}</p>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.graphql}>
          {loading && <>Loading....</>}
          {error && <>Error</>}
          {data && (
            <>
              You're signed in as {data.viewerTwitch.name} and you're{' '}
              {data.viewerTwitch.name}. Go to the{' '}
              <Link href="/about">
                <a>about</a>
              </Link>{' '}
              page.
              <div>
                <input
                  type="text"
                  value={newName}
                  placeholder="your new name..."
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()


  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
