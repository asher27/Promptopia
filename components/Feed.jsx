'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className={'mt-16 prompt_layout'}>
      {data.map((post, index) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`, {
        next: { cache: 'no-store' }
      });
      const data = await response.json();

      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  const filteredPrompt = (searchText) => {
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search

    return allPosts.filter(
      (post) => regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompt(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filteredPrompt(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className={'feed'}>
      <form className={'relative w-full flex-center'}>
        <input
          type="text"
          placeholder={'Search for a tag or a username'}
          value={searchText}
          onChange={handleSearchChange}
          required={true}
          className={'search_input peer'}
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
