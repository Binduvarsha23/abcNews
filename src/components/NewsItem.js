import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, published, author, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ minHeight: '30rem' }}>
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}><span className="badge rounded-pill bg-danger">
            {source}</span></div>

          <img
            src={imageUrl ? imageUrl : "https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_16x9_992.jpg"}
            className="card-img-top"
            alt={title}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author} on {new Date(published).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
