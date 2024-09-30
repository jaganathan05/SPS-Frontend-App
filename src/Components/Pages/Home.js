import { useState, useEffect, useCallback, useContext } from 'react';
import { Button, Col, Row, Form } from "react-bootstrap";
import axios from 'axios';
import './Home.css'; 
import NavBar from '../Nav/Navbar';
import Authcontext from '../../Store/Auth_Context';

function Home() {
    const Auth_ctx = useContext(Authcontext);
    const [selectedMove, setSelectedMove] = useState('');
    const [gameId, setGameId] = useState(null);
    const [inputGameId, setInputGameId] = useState('');
    const [gameState, setGameState] = useState({ game: {}, finishedRounds: [] }); // Ensure initial structure
    const token = Auth_ctx.Token;
    const gamerName = Auth_ctx.GamerName;

    const fetchGameState = useCallback(async () => {
        try {
            const response = await axios.get(`http://54.85.8.79:4000/game/${gameId}`, {
                headers: { Authorization: token },
            });
            setGameState(response.data.gameState || { game: {}, finishedRounds: [] }); // Ensure structure
        } catch (error) {
            console.error("Error fetching game state:", error);
        }
    }, [gameId, token]);
    
    useEffect(() => {
        if (!gameId) return;

        const interval = setInterval(() => {
            fetchGameState();
        }, 2000); 

        if (gameState?.game?.status === 'finished') {
            clearInterval(interval); 
        }

        return () => clearInterval(interval);
    }, [gameId, fetchGameState, gameState?.game?.status]);

    const createGame = async () => {
        try {
            const response = await axios.post('http://54.85.8.79:4000/create', {}, {
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
                const response = await axios.post('http://54.85.8.79:4000/join', { gameId: inputGameId }, {
                    headers: { Authorization: token },
                });
                alert(response.data.message);
                setGameId(response.data.gameId);
                setSelectedMove('');
                setInputGameId('');
            } catch (error) {
                console.error("Error joining game:", error);
            }
        }
    };

    const setMove = async () => {
        if (selectedMove) {
            try {
                const response = await axios.post('http://54.85.8.79:4000/move', { gameId, move: selectedMove }, {
                    headers: { Authorization: token },
                });
                setSelectedMove('');
                fetchGameState();
            } catch (error) {
                console.error("Error submitting move:", error);
            }
        }
    };

    const displayRoundResults = () => {
        const rounds = gameState.finishedRounds;
        if (rounds && rounds.length > 0) {
            return (
                <>
                    <div className="round-wrapper" key={rounds[0].id}>
                        <div className="player-info">
                            <p className="player-name">{rounds[0].player1Name}</p>
                            <p className="move">Move: {rounds[0].player1Move}</p>
                            <p className="points">Points: {rounds[0].player1Point}</p>
                        </div>
                        <div className="vs-text">VS</div>
                        <div className="player-info">
                            <p className="player-name">{rounds[0].player2Name}</p>
                            <p className="move">Move: {rounds[0].player2Move}</p>
                            <p className="points">Points: {rounds[0].player2Point}</p>
                        </div>
                    </div>
                    <div className='round-result'>Winner is <p className='round-winner'>{rounds[0].winner} </p></div>
                </>
            );
        }
        return <p> No results </p>;
    };

    const displayFinalWinner = () => {
        return gameState?.game?.status === 'finished' ? (
            <div className="final-winner">
                Final Winner: {gameState.game.finalwinner === 'Tie' ? 'It\'s a Tie!' : gameState.game.finalwinner}
            </div>
        ) : null;
    };

    const handlecloseGame = () => {
        setGameId('');
        setGameState({ game: {}, finishedRounds: [] }); 
    }

    return (
        <>
            <NavBar />
            <div className="game-container"> 
                <h2 className='Game-Title'>Stone  !  Paper  ! Scissors <i className="bi bi-scissors"></i></h2>
                <h3 className='gamername text-uppercase'>{gamerName}</h3>
                {!gameId && 
                    <Row>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <Button onClick={createGame} className="game-button">New Game</Button>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center'><p>Or</p></Col>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <Form className="form-section">
                                <Form.Group>
                                    <Form.Label className='text-capitalize text-dark'>Join Game by ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={inputGameId}
                                        onChange={(e) => setInputGameId(e.target.value)}
                                        className="input-field border-primary"
                                    />
                                </Form.Group>
                                <Button onClick={joinGame} disabled={!inputGameId} className="game-button">Join Game</Button>
                            </Form>
                        </Col>
                    </Row>
                }
                <div className="game-info">  
                    <div className="d-flex justify-content-end">
                        {gameId && <Button variant="danger" onClick={handlecloseGame}>X</Button>}
                    </div>
                    {gameState?.game?.gameId ? (
                        <>
                            <p>
                                Game Id: {gameState.game.gameId || 'Unavailable'}
                               
                            </p>
                            <h3>Game Status: {gameState.game.status || 'Unavailable'}</h3>
                            <h3>{gameState.game.status === 'playing' ? `Round ${gameState.game.currentRound || ''}` : ''}</h3>
                            <p className='text-secondary'>
                                {gameState.game.status === 'waiting' ? 'Waiting For Player to Join' : ''}
                            </p>
                            {gameState.rounds && (
                                <>
                                    <p key={gameState.rounds.Player1Id}>
                                        {gameState.rounds.player1Name}: {gameState.rounds.player1Move === null ? 'Waiting for move...' : `Selected is move`} 
                                    </p>
                                    <p key={gameState.rounds.Player2Id}>
                                        {gameState.rounds.player2Name}:{gameState.rounds.player2Move === null ? 'Waiting for move...' : `Selected is move`} 
                                    </p>
                                </>
                            )}
                        </>
                    ) : <p> </p>}
                    { gameState.game.status === 'playing' ? displayRoundResults() : ''}
                    { gameState.game.status === 'finished' ? displayFinalWinner() : ''}
                </div>

                {gameId && gameState.game.status === 'playing' && (
                    <>
                        <p>Your Move: {selectedMove}</p>
                        <div className="move-buttons">
                            <Button onClick={() => setSelectedMove('stone')} disabled={gameState.game.status === 'finished' || selectedMove}>Stone</Button>
                            <Button onClick={() => setSelectedMove('paper')} disabled={gameState.game.status === 'finished' || selectedMove}>Paper</Button>
                            <Button onClick={() => setSelectedMove('scissors')} disabled={gameState.game.status === 'finished' || selectedMove}>Scissors</Button>
                        </div>
                        <Button onClick={setMove} disabled={gameState.game.status === 'finished'} className="confirm-button">Confirm</Button>
                    </>
                )}
            </div>
        </>
    );
}

export default Home;
