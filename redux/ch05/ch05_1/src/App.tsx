import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from './store';
import ReduxClock from './pages/ReduxClock';

function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <main>
        <ReduxClock />
      </main>
    </ReduxProvider>
  );
}

export default App;
