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
      Page(page: 1, perPage: 30) {
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
    const [data, setData] = useState<any[]>([]);
    client.query({ query }).then(response => {
        setData(response.data.Page.media)
    });
    const UpdateDatabase = (e) => {
        const collection = fire.firestore().collection("listusers").doc(fire.auth().currentUser?.uid);
        if (fire.auth().currentUser) {
            
            alert("Added to favorite");

            collection.update({
                watched: fire.firestore.FieldValue.arrayUnion(e.target.id),
            });



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
                                        <Link href={item.siteUrl} passHref>KYS NIGGER</Link> |<Popup trigger={() => (<button className="button">Info</button>)} position="right center" closeOnDocumentClick><div className={styles.modal}><div className={styles.header}>Anime Info</div><div className={styles.content}>ID: {item.id}<br></br>Romaji: {item.title.romaji}<br></br>Native: {item.title.native}<br></br>English: {item.title.english}<br></br>Genres: {item.genres}<br></br>Episodes: {item.episodes} ({item.duration} min per episode)<br></br>Season: {item.season}<br></br>Start date: {item.startDate.day}.{item.startDate.month}. {item.startDate.year}<br></br>End date: {item.endDate.day}.{item.endDate.month}. {item.endDate.year}<br></br>Average Score: {item.averageScore}/100<br></br><br></br>{item.description}</div></div></Popup>
                                    </div>
                                    <div className={styles.btnfav}>
                                        <button id={item.title.romaji} onClick={UpdateDatabase}>♡</button>
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
export default Page;