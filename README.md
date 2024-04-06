# [Ether Editor](https://ether-editor-q2mv.onrender.com/) - Collaborative Real-Time Editor

Ether Editor is a cutting-edge collaborative editor that enables multiple users to edit JavaScript code in real-time. Built with the modern web in mind, it leverages React, TypeScript, Express, CodeMirror v6, and Socket.IO to provide an interactive coding environment. Ether Editor is perfect for live coding sessions, coding interviews, educational purposes, and any scenario where real-time code collaboration is required. With added support for light and dark modes, it offers a comfortable coding experience for all users.

## Features

- **Real-Time Collaboration**: files with multiple users in real-time, making it perfect for pair programming, teaching, or coding interviews.
- **Persistent Local Storage**: Users' progress is saved locally for the duration of the session, ensuring that no work is lost even if the page is refreshed.
- **Light and Dark Mode**: Cater to your preference or coding environment with easily toggleable light and dark modes.
- **Built with Modern Technologies**: Utilizes React, TypeScript, Express, CodeMirror v6, and Socket.IO for a smooth and responsive user experience.
- **Deployed and Accessible**: Available online at [Ether Editor](https://ether-editor-q2mv.onrender.com/ 'Collaborative Real-Time Editor')., ready for use at any time.

## Getting Started

To run Ether Editor locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- A modern web browser.

## Installation

### Clone the repository:

```console
git clone https://github.com/gaganPrasadOnGitHub/ether-editor.git
cd ether-editor
```

### Install dependencies:

```console
npm install
```

### Start the server:

```console
npm run build
npm run start
```

Open your browser and navigate to http://localhost:5000 to start using Ether Editor.

### Note

Update the CORS origin in server.js and hostUrl in socket.ts to http://localhost:5000 for local development.

## License

Ether Editor is open-sourced software licensed under the MIT license.

## Acknowledgments

The development and deployment of Ether Editor was realized by leveraging several key technologies and platforms. Gratitude is extended towards the following tools and services for their invaluable role in bringing this project to life:

- **React**: For crafting the user interface, providing a responsive and intuitive user experience.
- **TypeScript**: For adding type safety to the JavaScript code, enhancing development efficiency and reducing runtime errors.
- **Express**: As the backbone of backend services, enabling robust server-side functionality.
- **CodeMirror v6**: Chosen for the interactive code editor feature, offering extensive customization and support for various programming languages.
- **Socket.IO**: Crucial in enabling real-time bidirectional event-based communication, facilitating the collaborative aspect of the editor.
- **Render**: Streamlined the process of making Ether Editor public. The platform facilitated efficient deployment, ensuring global accessibility.

A special thanks goes to the open-source community and the contributors of these technologies. Your efforts and innovations continue to empower developers and creators around the globe.
