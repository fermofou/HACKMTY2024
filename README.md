# HACKMTY2024 - One Pot

## Inspiration
We were inspired by the common problems everyone faces when organizing group payments with friends, such as pooling money for events, trips, or gifts. We wanted a simple and efficient solution that would eliminate confusion and disorganization, allowing everyone to contribute without complications.

## What it does
The app allows users to create shared money pools and generate a virtual card to facilitate group payments. It also offers the possibility of setting up shared savings accounts with a common goal, such as a trip. This way, each member can contribute in an organized and quick manner, keeping everything under control.

## How we built it
We used React for the frontend, achieving a fast and responsive user experience, and Node.js for a robust backend. We chose MongoDB as the database due to its scalability as the users' needs grow. Additionally, we opted for a Progressive Web App (PWA) so the app could be accessible from any device, regardless of the operating system.

## Challenges we ran into
One of the main challenges was realizing that the API we had been using initially wasn’t sufficient for our needs. This led us to develop our own API in record time. We also faced difficulties optimizing the user experience and ensuring that creating money pools and shared savings accounts was smooth and easy for everyone.

Another issue we encountered was that, when attempting to deploy our application to the cloud via Defang, we discovered that our Wi-Fi network had blocked the ability to ping other addresses, which was necessary for the page setup. We successfully resolved this by hosting our servers on a Node.js server through Render and deploying our Vite app via Vercel.

## Accomplishments we are proud of
We are very glad that this project was awarded 1st place by Capital One on their challenge, having created a platform that simplifies how friends can organize and manage money as a group. Developing our own API was a major achievement, as it allowed the project to move forward as planned. We are also proud of the app’s design, which is intuitive and easy to use. 

## What we learned
We learned a lot about the importance of user experience and how small design decisions can have a big impact. We also gained valuable skills in quickly solving critical technical issues, such as developing an API from scratch.

