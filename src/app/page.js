"use client"
import React, { useState } from "react";
import Link from "next/link";
export default function Main() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [animeData, setAnimeData] = useState(null);

  async function submitUrl(e) {
    e.preventDefault();
    const submittedValue = e.target.elements.urlInput.value;
    setUrl(submittedValue);
    setSubmittedUrl(submittedValue);

    const data = await getAnimeData(submittedValue);
    setAnimeData(data);
  }

  async function getAnimeData(submittedValue) {
    try {
      const res = await fetch(
        `https://api.trace.moe/search?url=${encodeURIComponent(submittedValue)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return null;
    }
  }

  return (
    <main>
      <div id="inputsearch">
        <text id="heading"> anitrace </text> <br></br>
        copy paste the link of the scene to trace back to
        <form onSubmit={submitUrl}>
        <br></br>

          <input
            className="dog"
            placeholder="image url"
            name="urlInput"
            value={url}
            autoComplete="off"
            onChange={(e) => setUrl(e.target.value)}
          />
                    <button
            className="dog2"
            type="submit"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      {animeData && (
        <div id="animeData">
          <h2>Results</h2>
          {animeData.result.map((item, index) => (
            <div key={index}>
              <video src={item.video} controls="true"></video> <br></br>
             <Link href = {`https://anilist.co/anime/${item.anilist}`}>   <h3 id='linkk'>{item.filename}</h3> </Link>
             <p>Timestamps: {Math.floor(item.from / 60)}:{Math.floor(item.from % 60)} - {Math.floor(item.to / 60)}:{Math.floor(item.to % 60)}</p>
              <p>Episode: {item.episode}</p>
              <p>Similarity: {item.similarity}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
