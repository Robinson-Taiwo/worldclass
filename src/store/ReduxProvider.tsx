// app/store/ReduxProvider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
