import { FC, PropsWithChildren } from "react";
import { ThemeInit } from "../../../.flowbite-react/init";
import { createTheme, ThemeProvider } from "flowbite-react";
import { cardTheme } from "./components/card";
import { accordionTheme } from "./components/accordion";

const Provider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <ThemeInit />
      <ThemeProvider
        theme={createTheme({
          card: cardTheme,
          accordion: accordionTheme
        })}
        applyTheme={{
          card: "replace",
          accordion: "replace"
        }}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Provider;