"use client"
import React, { useState } from "react";

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
        <form onSubmit={submitUrl}>
          <input
            className="dog"
            placeholder="Search"
            name="urlInput"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {animeData && (
        <div id="animeData">
          <h2>Anime Data</h2>
          {animeData.result.map((item, index) => (
            <div key={index}>
              <video width="420" height="340" src={item.video} controls="true"></video> <br></br>
              <h2>{item.filename}</h2>
              <p>Duration (in seconds): {item.from} - {item.to}</p>
              <p>Episode: {item.episode}</p>
              <p>Similarity: {item.similarity}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
