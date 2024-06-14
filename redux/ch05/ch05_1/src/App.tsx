import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from './store';

function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <main>
        {/* 여기에 애플리케이션 컴포넌트를 추가합니다. */}
      </main>
    </ReduxProvider>
  );
}

export default App;
