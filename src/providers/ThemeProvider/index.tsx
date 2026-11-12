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
import { modalTheme } from "./components/modal";
import { badgeTheme } from "./components/badge";
import { progressTheme } from "./components/progress";
import { labelTheme } from "./components/label";
import { tooltipTheme } from "./components/tooltip";

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
          modal: modalTheme,
          badge: badgeTheme,
          progress: progressTheme,
          label: labelTheme,
          tooltip: tooltipTheme,
        })}
        applyTheme={{
          card: "replace",
          button: "replace",
          accordion: "replace",
          select: "replace",
          radio: "replace",
          checkbox: "replace",
          textInput: "replace",
          modal: "replace",
          badge: "replace",
          progress: "replace",
          label: "replace",
          tooltip: "replace",
        }}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Provider;
