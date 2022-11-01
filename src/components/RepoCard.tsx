import React, { useState, useEffect } from "react";
import { useActions } from "../hooks/actions";
import { IRepo } from "../models/models";
import { LS_FAV_KEY } from "../store/github/github.slice";

function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions();

  const [isFav, setIsFav] = useState(false);

  const data = JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]");

  useEffect(() => {
    if (data.includes(repo.url)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [data]);

  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavourite(repo.url);
  };

  const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavourite(repo.url);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover: shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFav && (
          <button
            onClick={addToFavourite}
            className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all"
          >
            Add
          </button>
        )}

        {isFav && (
          <button
            onClick={removeFromFavourite}
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
}

export default RepoCard;
