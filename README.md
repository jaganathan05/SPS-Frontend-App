
# Stone! Paper! Scissors! - Frontend Application

## Project Overview

This is a frontend application for a 2-player Stone, Paper, Scissors game. The application allows users to register, log in, create or join games, and view finished game states. It utilizes React and React Bootstrap for the UI, and Axios for making API requests to the backend.

## Features

- **User Registration:** Users can register as gamers by providing their information.
- **User Login:** After registration, users can log in to receive a token and their name from the backend. This information is stored in `localStorage` and managed using an authentication context.
- **Game Options:** Once logged in, users can choose to start a new game or join an existing game by entering a game ID.
- **Gameplay:** The game consists of six rounds where both players select their moves. The winner is determined based on the following rules:
  - Stone beats Scissors
  - Scissors beat Paper
  - Paper beats Stone
- **Game States:** After the game concludes, users can view all finished game states, including the rounds played and the final winner.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd your-project-name
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Ensure your backend server is running on `http://localhost:4000`.

## Usage

1. **Register:** Navigate to the registration page and create a new account.
2. **Login:** After successful registration, log in with your credentials. Upon login, your user token and name will be stored in `localStorage`.
3. **Game Page:** Choose to start a new game or join an existing game using a game ID.
4. **Gameplay:** Play six rounds and view the results after each round. The final winner will be displayed.
5. **Game States:** Visit the "All Game States" page to see a list of finished games, including round details and winners.

## Technologies Used

- **React:** For building the user interface.
- **React Router:** For navigation between pages.
- **React Bootstrap:** For styling components.
- **Axios:** For making HTTP requests to the backend API.
- **Context API:** For managing authentication state.

## Author

Jaganathan V

