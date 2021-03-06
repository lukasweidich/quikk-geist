import { GeistProvider, CssBaseline } from "@geist-ui/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DefaultSEO from "../components/meta/DefaultSEO";
import { QUIKK_light, QUIKK_dark } from "../styles/themes";
import "../styles/globals.css";
import "../node_modules/devicon/devicon.min.css";
import useHeaderHeight from "../components/hooks/useHeaderHeight";
import React, { useEffect, useState } from "react";
import ContactRef from "../components/misc/ContactRef";
import { LOADING_CLASS_NAME } from "../src/constants";

const _app = ({ Component, pageProps }) => {
	const [headerHeight, setHeaderHeight] = useState("0px");

	useEffect(() => {
		const main = document.getElementsByTagName("main")[0];
		const height = useHeaderHeight();
		main?.setAttribute("style", `padding-top: ${height}`);
		setHeaderHeight(`${useHeaderHeight()}px`);
		document?.body?.classList?.remove(LOADING_CLASS_NAME);
	}, []);

	return (
		<GeistProvider themes={[QUIKK_light, QUIKK_dark]} themeType="QUIKK_light">
			<CssBaseline />
			<DefaultSEO />
			<Header />
			<main style={{ paddingTop: `${headerHeight}` }}>
				<Component {...pageProps} />
			</main>
			<ContactRef />
			<Footer />
		</GeistProvider>
	);
};

export default _app;

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 1,
	};
}
