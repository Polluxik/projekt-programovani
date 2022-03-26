import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';
import Link from "next/link"
import Popup from 'reactjs-popup'
import fire from '../pages/api/firebase'



const restLink = new HttpLink({ uri: "https://graphql.anilist.co" });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
});

const query = gql`
 query {
      Page(page: 1, perPage: 20) {
        media(sort: ID) {
          id
          title {
            romaji
            native
            english
          }
          coverImage {
            large
          }
          siteUrl
          episodes
          genres
          startDate {
            year
            month
            day
      }
	    endDate {
	        year
	        month
	        day
	}
    season
    averageScore
    duration
    description
        }
      }
    }
`;



export const Page = () => {
    const [data, setData] = useState([]);
    client.query({ query }).then(response => {
        setData(response.data.Page.media)
    });

    const UpdateDatabase = () => {
        const collection = fire.firestore().collection("animelist-users").doc(fire.auth().currentUser?.uid);
        if (fire.auth().currentUser) {
            data.map((item, key) => {
                

                collection.update({
                    fav: fire.firestore.FieldValue.arrayUnion(item.id)
                    
                });
                console.log("updated");
            })

        }
    }
    return (
        <div>
            <Head>
                <title>Anime List</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
            </Head>
            <Menu />
            <main className={styles.body}>
                <br></br>   
                <div className={styles.search}>
                    <input id="search" placeholder="Search your favorite anime"></input>
                </div>
                <div className={styles.contentcenter}>
                    {
                        data.map((item, key) => {
                            return (<div className={styles.screencenter} key={key}>
                                <img src={item.coverImage.large}></img>
                                <p>{item.title.romaji}  <br></br>
                                    <div className={styles.info}>
                                        <Link href={item.siteUrl} passHref>Open link</Link>
                                    </div>
                                    <div className={styles.btnfav}>
                                        <button onClick={UpdateDatabase}>♡</button>
                                    </div>

                                </p>
                            </div>)

                        })
                    }
                </div>
            </main>
        </div>
    )
}
// export const getLabel = (index: number) => ;
export default Page;