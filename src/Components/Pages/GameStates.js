import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameStates.css'; 
import NavBar from '../Nav/Navbar';

const GameStates = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://54.85.8.79:4000/games'); 
                setGames(response.data.games);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="game-states-container">
            <NavBar />
            <h2 className='text-warning'>Finished Game States</h2>
            {games.length > 0 ? (
                <ul>
                    {games.map((game, index) => (
                        <li key={index} className="game-item">
                            <h4>Game {index + 1}</h4>
                            <h4>
                                Final Winner: {game.finalwinner === 'Tie' ? 'It\'s a Tie!' : game.finalwinner || 'Unknown'}
                            </h4>
                            <br />
                            <p>{game.Player1Name || 'Player 1'}: {game.Player1Point} points</p>
                            <p>{game.Player2Name || 'Player 2'}: {game.Player2Point} points</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-light'>No finished games found.</p>
            )}
        </div>
    );
};

export default GameStates;
