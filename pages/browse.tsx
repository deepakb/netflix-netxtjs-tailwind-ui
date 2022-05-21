import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Panel from '../components/Panel';
import requests from '../utils/requests';
import { Movie } from '../utils/types';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const browse: NextPage<Props> = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) => {
  return (
    <div
      className={`lg:h-[140vh]' } relative h-screen bg-gradient-to-b from-gray-900/10
      to-[#010511]`}
    >
      <Head>
        <title>Netflix UI</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 flex-col px-5 pt-20">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="md:space-y-24">
          <Panel title="Trending Now" movies={trendingNow} />
          <Panel title="Top Rated" movies={topRated} />
          <Panel title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Panel title="Comedies" movies={comedyMovies} />
          <Panel title="Scary Movies" movies={horrorMovies} />
          <Panel title="Romance Movies" movies={romanceMovies} />
          <Panel title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </div>
  );
};

export default browse;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
