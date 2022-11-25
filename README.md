<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available. 

**[PROJECT PHILOSOPHY](https://github.com/jaafarhawli/vote-chain#-project-philosophy) • [WIREFRAMES](https://github.com/jaafarhawli/vote-chain#-wireframes) • [TECH STACK](https://github.com/jaafarhawli/vote-chain#-tech-stack) • [IMPLEMENTATION](https://github.com/jaafarhawli/vote-chain#-impplementation) • [HOW TO RUN?](https://github.com/jaafarhawli/vote-chain#-how-to-run)**

</div>

<br><br>


<img src="./readme/title2.svg"/>

> Vote Chain is a decentralized online voting wesbite that is built to run any election using blockchain. Any user can create an account and launch elections by adding parties, candidates, voters, and moderators in order to help him take control of the election
> 
> When election is launched, voters can access the voting poll after logging in using their generated ID and key sent to them by email, they can then vote for their candidate, deploy the vote on the blockchain, and check statistical results after the election ends.

### User Stories
- As a user, I want to launch an election in a specific time interval
- As a user, I want to be able to add moderators to my election to help me add voters to the election
- As a user, I want to receive a notification when someone wants to add me as a moderator to his election
- As a user, I want to be able to add my own list of parties and candidates to my election
- As a user, I want to be able to add voters to my election
- As a user, I want to be able to check election statistical data while running the election
- As a user, I want my election to be trusted and run securely without people being able to alter the data

### Voter Stories
- As a voter, I want my vote to be delivered without being manipulated by anyone
- As a voter, I want to be able to view all parties and their candidates before voting
- As a voter, I want to see the election statistical live results after the election ends
- As a voter, I want to keep track of how much time is left for election to start/end

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that I used TailwindCSS as a styling framework

| Voter Landing Page  | Register Page  |
| -----------------| -----|
| ![Voter Landing Page](./readme/Mockups/landing-page.png) | ![Register Page](./readme/Mockups/register.png) |

| Admin Elections Page  | Admin Panel  |
| -----------------| -----|
| ![Admin Elections Page](./readme/Mockups/elections-page.png) | ![Admin Panel](./readme/Mockups/admin-panel.png) |

| Voter Main Page  | Voting Page  |
| -----------------| -----|
| ![Voter Main Page](./readme/Mockups/voting-main-page.png) | ![Voting Page](./readme/Mockups/voting-page.png) |


<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses the [React app library](https://reactjs.org/). React makes it painless to create interactive UIs, is component-based and is reusable.
- As database, [MongoDB](https://www.mongodb.com/) was used. MongoDB is a NoSQL database which is well-suited for handling off-chain data, it can easily store and access data that is spread across multiple servers. It is scalable and this means that it can handle large amounts of data without becoming bogged down. This makes it ideal for storing data that is used by blockchain applications.
- Vote Chain uses Node.js Express framework for backend. [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- The project uses [Truffle](https://trufflesuite.com/truffle/) framework which is widely considered the most popular tool for blockchain application development. It uses Solidity for writing smart contracts to blockchain. [Solidity](https://docs.soliditylang.org/en/v0.8.17/) is an object-oriented, high-level language for implementing smart contracts.


<br><br>
<img src="./readme/title5.svg"/>

> Uing the above mentioned tecch stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app

| Landing  | Register  |
| -----------------| -----|
| ![Landing](./readme/Gifs/landing-gif-3.gif) | ![Register](./readme/Gifs/register.gif) |

| Admin Elections Page  | Create Election  |
| -----------------| -----|
| ![Admin Elections Page](./readme/Gifs/main-preview.gif) | ![Create Election](./readme/Gifs/create-election-gif.gif) |

| Admin Panel  | Notifications  |
| -----------------| -----|
| ![Admin Panel](./readme/Gifs/view-election-gif.gif) | ![Notifications](./readme/Gifs/notification-gif.gif) |

| Voter Login  | Voting  |
| -----------------| -----|
| ![Voter Login](./readme/Gifs/voter-login-gif.gif) | ![Voting](./readme/Gifs/vote-gif.gif) |


<br><br>
<img src="./readme/title6.svg"/>


To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a list of things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Ganache using this [link](https://trufflesuite.com/ganache/)
* Metamask wallet extension using this [link](https://metamask.io/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jaafarhawli/Vote-Chain.git
   ```
2. Create a new ganache workspace and load the "blockchain" folder path inside "Truffle Projects" box
3. Login/Create a metamask wallet. Add localhost network and import any account from your Ganache workspace into it
3. Install NPM packages
   ```sh
   cd frontend
   npm install
   ```
   ```sh
   cd backend
   npm install
   ```
4. Rename .env.example to .env inside the backend folder and add your own gmail and gmail app password
5. Rename .env.example to .env inside the frontend folder
5. Start the application
   ```sh
   cd backend
   npm start
   ```
   ```sh
   cd frontend
   npm start
   ```


