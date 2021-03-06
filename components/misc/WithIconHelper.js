import { Spacer, Text } from "@geist-ui/react";
import React from "react";
import { XTRA_SMALL_GAP } from "../../src/constants";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

const style = {
  inline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const WithIcon = ({ icon, children }) => (
  <>
    {React.cloneElement(icon, { size: ".8em" })}
    <Spacer x={XTRA_SMALL_GAP} y={0} />
    {children}
  </>
);

export const ExternalLinkWithIcon = ({ href = "", icon, children }) => (
  <ExternalLink href={href} style={style.inline}>
    <WithIcon icon={icon}>{children}</WithIcon>
  </ExternalLink>
);

export const InternalLinkWithIcon = ({ href = "", icon, children }) => (
  <InternalLink href={href} style={style.inline}>
    <WithIcon icon={icon}>{children}</WithIcon>
  </InternalLink>
);

export const TextWithIcon = ({ icon, children }) => (
  <span style={style.inline}>
    <WithIcon icon={icon}>{children}</WithIcon>
  </span>
);
