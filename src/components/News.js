import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  const update = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(70);
    setArticles(parsedata.articles);
    setTotalResults(parsedata.totalResults);
    setLoading(false) 
    props.setProgress(100); 
  }

  useEffect(() =>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMan`;
    update();
  },[]) 

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage( page + 1 );
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles))
    setTotalResults(parsedata.totalResults)
    
  };
 
    return (

      <>
        <h1 className='text-center' style={{ margin: '35px', marginTop:'70px' }}>NewsMan's - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          
          <div className='container'>
            <div className='row'>
              {articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>

    )
  
}

export default News