import { isBrowser, isTablet, isMobile } from "react-device-detect";

export const matchPc = isBrowser;
export const matchTablet = isTablet;
export const matchMobile = isMobile;
