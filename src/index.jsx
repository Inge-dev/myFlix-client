import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

import Container from "react-bootstrap/Container";

import { MainView } from './components/main-view/main-view';

// Main component (will eventually use all the others)
const App = () => {

  return (
    <BrowserRouter>
      <Container>
        <MainView />
      </Container>
    </BrowserRouter>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);