import { Wordle } from "./components";
import { ModalsProvider, ThemeProvider, TimerProvider, WordleProvider } from "./context";

function App() {
  return (
    <ThemeProvider>
      <ModalsProvider>
        <WordleProvider>
          <TimerProvider>
            <Wordle />
          </TimerProvider>
        </WordleProvider>
      </ModalsProvider>
    </ThemeProvider>
  );
}

export default App;
