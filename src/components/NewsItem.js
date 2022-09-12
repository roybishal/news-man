import React  from 'react'

const NewsItem = (props) => {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 0
          }          
          }>
            <span className="badge rounded-pill text-bg-warning">{source}</span>
          </div>

          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/img/2022/09/04/1600x900/Virat_Kohli_and_Deepak_Hooda_1662311527862_1662311537807_1662311537807.jpg"} />
          <div className="card-body">
            <h5 className="card-title">{title ? title : ""}</h5>
            <p className="card-text">{description ? description : ""}</p>
            <p className="card-text"><small className="text-danger">By {author ? author : "UnKnown"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="blank" className="btn btn-secondary">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem