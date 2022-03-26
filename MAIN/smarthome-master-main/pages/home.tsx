import React from 'react'
import { Menu } from '../components/menu'
import styled from "styled-components"

const Background = styled.main`
background-image: url('../components/images/background.png');
height:100%;
background-position: center;
background-attachment: fixed;
background-size: cover;
`

const Home = () => {
    return (
        
        <Background>
            <Menu />
            <div>
                <h1>Welcome to AnimeList</h1>
                <div>
                    <p>Biggest anime portal on internet</p>
                    <p>We are providing:</p>
                    <ul>
                        <li>Anime List</li>
                        <li>Login and Register for account</li>
                        <li>Add to favorites</li>
                    </ul>
                </div>
            </div>

        </Background>
        
    )
}

export default Home