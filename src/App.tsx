import { TriviaDeck } from './components/TriviaDeck';
import { Disclaimer } from './components/Disclaimer';
import triviaDataRaw from './data/trivia.sample.json';
import type { TriviaData } from './types/trivia';

// Type assertion for imported JSON
const triviaData = triviaDataRaw as TriviaData;

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-3 text-shadow">
          {triviaData.title}
        </h1>
        <p className="text-slate-400 text-lg">{triviaData.description}</p>
      </header>

      <main className="w-full max-w-4xl">
        <TriviaDeck questions={triviaData.questions} />
      </main>

      <footer className="mt-auto w-full max-w-4xl px-4">
        <Disclaimer />
      </footer>
    </div>
  );
}

export default App;
