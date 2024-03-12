import React from 'react'
import { DataContext } from "../../shared/containers/provider";
import { Fragment,useContext } from 'react';

const Home = () => {
  const { data } = useContext(DataContext);
  return (
    <Fragment>
      <div className='text-black font-bold text-4xl'>Home</div>
    </Fragment>
  )
}

export default Home
