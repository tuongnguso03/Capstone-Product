
import Dictionary from './components/Dictionary';
import Translator from './components/Translator';

function App() {
  return (
    <div className="container p-4">
      <h1 className="flex">
        <img src="/Alice_Halo.ico" alt="Icon" className="w-8 h-8" />
        Dictionary & Translator
      </h1>
      <Translator />
      <Dictionary />
    </div>
  );
}
export default App;
