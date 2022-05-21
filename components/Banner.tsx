import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../utils/constants';
import { Movie } from '../utils/types';

interface Props {
  netflixOriginals: Movie[];
}

const Banner: React.FC<Props> = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[40vh] w-screen md:h-[50vh] lg:h-[80vh]">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
          priority={true}
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-xs md:text-sm lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <PlayArrowIcon className="h-6 w-6 text-black md:h-7 md:w-7" />
          Play
        </button>

        <button className="bannerButton bg-[gray]/70">
          <InfoOutlinedIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
