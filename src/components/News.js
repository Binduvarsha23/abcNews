import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    document.title = `abcNews - ${this.props.category}`
    this.fetchArticles(this.state.page);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchArticles = async (page) => {
    this.props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=46fffc51c92d4fa5808e85d250c79449&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    try {
      this.props.setProgress(30);
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      this.props.setProgress(50);
      let parsedData = await response.json();

      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
        page,
      }));

      this.props.setProgress(100);

    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;

    this.props.setProgress(scrollProgress);

    const { loading, totalResults, articles } = this.state;
    if (loading) return;
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      const totalPages = Math.ceil(totalResults / this.props.pageSize);
      if (articles.length < totalResults && this.state.page < totalPages) {
        this.fetchArticles(this.state.page + 1);
      }
    }
  }

  render() {
    const { articles, loading } = this.state;

    return (
      <div className='container' style={{ paddingTop: '70px' }}>  {/* Add padding to push content down */}
        <h2 className='text-center my-7 mt-7'>News-Page</h2>
        {loading && articles.length === 0 ? <Spinner /> : (
          <div>
            <div className="row">
              {articles.map((element, index) => (
                <div className="col-sm-12 col-md-6 col-lg-4 my-2" key={element.url + index}>
                  <NewsItem 
                    title={element.title}
                    description={element.description} 
                    imageUrl={element.urlToImage} 
                    url={element.url}
                    published={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
            {loading && <Spinner />} 
          </div>
        )}
      </div>
    );
  }
}
