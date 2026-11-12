import { FC, PropsWithChildren } from "react";
import { ThemeInit } from "../../../.flowbite-react/init";
import { createTheme, ThemeProvider } from "flowbite-react";
import { cardTheme } from "./components/card";
import { accordionTheme } from "./components/accordion";
import { selectTheme } from "./components/select";
import { textInputTheme } from "./components/textInput";
import { buttonTheme } from "./components/button";
import { checkboxTheme } from "./components/checkbox";
import { radioTheme } from "./components/radio";

const Provider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <ThemeInit />
      <ThemeProvider
        theme={createTheme({
          card: cardTheme,
          button: buttonTheme,
          accordion: accordionTheme,
          select: selectTheme,
          checkbox: checkboxTheme,
          radio: radioTheme,
          textInput: textInputTheme,
        })}
        applyTheme={{
          card: "replace",
          button: "replace",
          accordion: "replace",
          select: "replace",
          radio: "replace",
          checkbox: "replace",
          textInput: "replace",
        }}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Provider;
