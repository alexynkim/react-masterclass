// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mode: boolean;
    textColor: string;
    bgColor: string;
    textMenuColor: string;
    bgHovorColor: string;
    textHoverColor: string;
    borderShadow: string;
    accentColor: string;
  }
}
