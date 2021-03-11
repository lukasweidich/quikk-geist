import { Breadcrumbs, Grid, Image, Loading, Spacer } from "@geist-ui/react";
import { Calendar, Clock } from "@geist-ui/react-icons";
import React from "react";
import ReactMarkdown from "react-markdown";
import Container from "../../components/layout/Container";
import TitleAndDesc from "../../components/meta/TitleAndDesc";
import AlignedUser from "../../components/misc/AlignedUser";
import InternalLink from "../../components/misc/InternalLink";
import TitleWithDesc from "../../components/misc/TitleWithDesc";
import { TextWithIcon } from "../../components/misc/WithIconHelper";
import { breakpoints, MEDIUM_GAP, XTRA_LARGE_GAP } from "../../src/constants";
import { getPreviewText, getReadingTimeInMinutes } from "../../utils/blog";
import { getArticleBySlug, getArticles } from "../../utils/strapi";

const Article = ({
  title = "",
  content = "",
  image,
  author,
  published_at = "",
}) => {
  const { url } = image ?? { url: "" };
  const { name, avatar, position } = author ?? {
    name: "",
    avatar: "",
    position: "",
  };

  const notFound =
    !title ||
    !content ||
    !image ||
    !author ||
    !published_at ||
    !url ||
    !name ||
    !avatar ||
    !position;

  return notFound ? (
    <Grid.Container
      alignItems="center"
      justify="center"
      style={{ height: "50vh" }}
    >
      <Grid xs={24} alignItems="center" justify="center">
        <Loading />
      </Grid>
    </Grid.Container>
  ) : (
    <>
      <TitleAndDesc {...{ title, desc: getPreviewText(content, 150) }} />
      <Container spacing>
        <Grid.Container gap={XTRA_LARGE_GAP} justify="center">
          <Grid {...breakpoints}>
            <Breadcrumbs>
              <Breadcrumbs.Item>
                <InternalLink href="/">Home</InternalLink>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>
                <InternalLink href="/blog">Blog</InternalLink>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>Dieser Artikel</Breadcrumbs.Item>
            </Breadcrumbs>
          </Grid>
          <TitleWithDesc {...{ title }} breakpoints={breakpoints} />
          <Grid {...breakpoints}>
            <Grid.Container
              justify="space-between"
              alignItems="center"
              gap={MEDIUM_GAP}
            >
              <Grid>
                <InternalLink href="/team">
                  <AlignedUser {...{ avatar, name, position }} />
                </InternalLink>
              </Grid>
              <Grid>
                <Grid.Container>
                  <TextWithIcon icon={<Calendar />}>
                    {new Date(published_at).toLocaleDateString()}
                  </TextWithIcon>
                  <Spacer />
                  <TextWithIcon icon={<Clock />}>
                    {getReadingTimeInMinutes(content)} min
                  </TextWithIcon>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid {...breakpoints}>
            <Image alt={title} src={url} />
          </Grid>
          <Grid {...breakpoints} direction="column">
            <ReactMarkdown>{content}</ReactMarkdown>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default Article;

export async function getStaticProps(ctx) {
  const {
    params: { slug },
  } = ctx;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      redirect: {
        destination: `/blog`,
        statusCode: 302,
      },
    };
  } else {
    return {
      revalidate: 1,
      props: {
        ...article,
      },
    };
  }
}

export async function getStaticPaths() {
  const articles = await getArticles();
  const paths = articles.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}