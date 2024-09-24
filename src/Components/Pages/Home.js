import { useState, useEffect, useCallback, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import './Home.css'; 
import NavBar from '../Nav/Navbar';
import Authcontext from '../../Store/Auth_Context';

function Home() {
    const Auth_ctx = useContext(Authcontext)
    const [selectedMove, setSelectedMove] = useState('');
    const [gameId, setGameId] = useState(null);
    const [inputGameId, setInputGameId] = useState('');
    const [gameState, setGameState] = useState(null);
    const token = Auth_ctx.Token
    const gamerName = Auth_ctx.GamerName

    const fetchGameState = useCallback(async () => {
        if (gameId) {
            try {
                const response = await axios.get(`http://localhost:4000/game/${gameId}`, {
                    headers: { Authorization: token },
                });
                setGameState(response.data.game);
            } catch (error) {
                console.error("Error fetching game state:", error);
            }
        }
    }, [gameId, token]);

    useEffect(() => {
        if (gameId) {
            const interval = setInterval(() => fetchGameState(), 2000);
            return () => clearInterval(interval); 
        }
    }, [gameId, fetchGameState]);

    const createGame = async () => {
        try {
            const response = await axios.post('http://localhost:4000/create', {}, {
                headers: { Authorization: token },
            });
            setGameId(response.data.gameId);
            setSelectedMove('');
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    const joinGame = async () => {
        if (inputGameId) {
            try {
                const response = await axios.post('http://localhost:4000/join', { gameId: inputGameId }, {
                    headers: { Authorization: token },
                });
                alert(response.data.message);
                setGameId(inputGameId);
                setInputGameId('');
            } catch (error) {
                console.error("Error joining game:", error);
            }
        }
    };

    const setMove = async () => {
        if (selectedMove) {
            try {
                const response = await axios.post('http://localhost:4000/move', { gameId, move: selectedMove }, {
                    headers: { Authorization: token },
                });
                alert(response.data.message);
                setSelectedMove('');
                fetchGameState();
            } catch (error) {
                console.error("Error submitting move:", error);
            }
        } else {
            alert("Please select a move.");
        }
    };

    const displayRoundResults = () => {
        return gameState?.rounds.map((round, index) => (
            <p key={index}>
                Round {round.roundNumber}: {round.player1Name} Move: {round.player1Move}, {round.player2Name} Move: {round.player2Move}, Winner: {round.winner}
            </p>
        ));
    };

    const displayFinalWinner = () => {
        return gameState?.status === 'finished' ? (
            <h3>Final Winner: {gameState.finalwinner === 'Tie' ? 'It\'s a Tie!' : gameState.finalwinner}</h3>
        ) : null;
    };

    return (
        <div className="game-container"> 
        <NavBar/>
            <h2>Stone! Paper! Scissors!</h2>
            <h3>Gamer Name: {gamerName}</h3>
            <Button onClick={createGame} className="game-button">New Game</Button>

            <Form className="form-section">
                <Form.Group>
                    <Form.Label>Join Game by ID:</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputGameId}
                        onChange={(e) => setInputGameId(e.target.value)}
                        className="input-field"
                    />
                </Form.Group>
                <Button onClick={joinGame} disabled={!inputGameId} className="game-button">Join Game</Button>
            </Form>

            <div className="game-info">
                {gameState && (
                    <>
                        <h3>Game Id: {gameId}</h3>
                        <h3>Game Status: {gameState.status}</h3>
                        <h3>{gameState.status === 'playing' ? `Round ${gameState.currentRound}` : ''}</h3>

                        {gameState.players.map(player => (
                            <p key={player.playerId}>
                                {player.playerName}: {player.move === 'null' ? 'Waiting for move...' : 'Selected move'} | Points: {player.point}
                            </p>
                        ))}

                        <h4>Round Results</h4>
                        {displayRoundResults()}

                        {displayFinalWinner()}
                    </>
                )}
            </div>

            {gameId && gameState?.status !== 'finished' && (
                <>
                    <p>Your Move: {selectedMove}</p>
                    <div className="move-buttons">
                        <Button onClick={() => setSelectedMove('stone')} disabled={gameState?.status === 'finished'}>Stone</Button>
                        <Button onClick={() => setSelectedMove('paper')} disabled={gameState?.status === 'finished'}>Paper</Button>
                        <Button onClick={() => setSelectedMove('scissors')} disabled={gameState?.status === 'finished'}>Scissors</Button>
                    </div>

                    <Button onClick={setMove} disabled={gameState?.status === 'finished'} className="confirm-button">Confirm</Button>
                </>
            )}
        </div>
    );
}

export default Home;
