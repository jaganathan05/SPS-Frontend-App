import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameStates.css'; 
import NavBar from '../Nav/Navbar';

const GameStates = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:4000/games'); 
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="game-states-container">
            <NavBar/>
            <h2>Finished Game States</h2>
            {games.length > 0 ? (
                <ul>
                    {games.map((game, index) => (
                        <li key={index} className="game-item">
                            <h4>Game {index + 1}</h4>
                            <h5>Rounds</h5>
                            <ul>
                                {game.rounds.map((round, idx) => (
                                    <li key={idx}>
                                        Round {round.roundNumber}: {round.player1Move} vs {round.player2Move} - Winner: {round.winner}
                                    </li>
                                ))}
                            </ul>
                            <h4>Final Winner: {game.finalWinner === 'Tie' ? 'It\'s a Tie!' : game.finalwinner}</h4>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No finished games found.</p>
            )}
        </div>
    );
};

export default GameStates;
