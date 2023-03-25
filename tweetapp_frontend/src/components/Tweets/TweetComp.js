import React from 'react'
import { Search } from './Search'
import Tweet from './Tweet'
import { Pagination } from './Pagination'

export const TweetComp = () => {
  return (
    <div>TweetComp 
        <Search/>
        <Pagination/>
        <Tweet/>
    </div>
  )
}
