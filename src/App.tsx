import { useState } from "react";
import "./App.css";
import { FaktsProvider, FaktsGuard, useFakts } from "fakts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Callback } from "./contrib/Callback";
import { NoFakts } from "./NoFakts";
import { HerreGuard, HerreProvider, useHerre } from "herre";
import { PortGuard, PortProvider, withPort } from "./port";
import { PortAutoConfigure } from "./contrib/PortAutoConfigure";
import { NoPort } from "./NoPort";
import {
  useMyExperimentsQuery,
  useMySamplesEventSubscription,
} from "./api/mikro/graphql";

export const Test = () => {
  const { data } = withPort(useMyExperimentsQuery)();

  return <>{JSON.stringify(data)}</>;
};

export const TestSubscription = () => {
  const { data } = withPort(useMySamplesEventSubscription)();

  return <>{JSON.stringify(data)}</>;
};

export const ProtectedApp = () => {
  return (
    <HerreGuard fallback={<NoPort />}>
      <PortProvider>
        <PortAutoConfigure />
        <PortGuard fallback={<NoPort />}>
          <Test />
          <TestSubscription />
        </PortGuard>
      </PortProvider>
    </HerreGuard>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const doRedirect = (url: string) => {
    console.log("Redirecting to", url);
    window.location.replace(url);
  };

  return (
    <div className="App">
      <FaktsProvider>
        <FaktsGuard fallback={<NoFakts />}>
          <HerreProvider doRedirect={doRedirect}>
            <Router>
              <Routes>
                <Route path="/" element={<ProtectedApp />} />
                <Route path="/callback" element={<Callback />} />
              </Routes>
            </Router>
          </HerreProvider>
        </FaktsGuard>
      </FaktsProvider>
    </div>
  );
}

export default App;
