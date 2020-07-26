import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { elapsed, handleImage, showPosts, activeButton, resetShowMore } from './Helper.js';

class Button extends React.Component {
  render() {
    return <button id={this.props.value} className={this.props.class} onClick={this.props.onButtonClick}><img src={process.env.PUBLIC_URL + '/' + this.props.value + '.png' } alt='' /> {this.props.value}</button>
  }
}

class ShowMore extends React.Component {
  render() {
    return <button id='verMais'>+ ver mais</button>
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className='topicCard'>
        <a href={this.props.url} target='_blank'>
          <img src={this.props.thumb} alt='' />
          {/* <div className='thumbImage' style={ { backgroundImage: 'url(' +this.props.thumb + ')' } }></div> */}
          <div>
            <h3>{this.props.title}</h3>
            <p>enviado há {this.props.time} por <span>{this.props.author}</span></p>
            <h6>acessar <img src='https://image.flaticon.com/icons/svg/150/150533.svg' alt='' /></h6>
            {/* <p>{this.props.url}</p> */}
          </div>
        </a>
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: 'hot',
      posts: []
    }
    this.handleSort = this.handleSort.bind(this);
  }
  
  loadPosts() {
    let postInfo = [];
    
    fetch('https://www.reddit.com/r/reactjs/' + this.state.sort + '.json?&limit=100')
    .then(res => res.json())
    .then(json => {
        json.data.children.map(i => {
          postInfo.push({
            id: i.data.id,
            thumb: i.data.thumbnail,
            title: i.data.title,
            time: i.data.created_utc,
            author: i.data.author,
            url: i.data.url 
          })
        })
        this.setState(state => { 
          const posts = state.posts.concat(postInfo);
          return {posts};
        })
      })
    .catch(e => console.log('Error:', e))
  }
    
  componentDidMount() {
    this.loadPosts();
  }

  handleSort(value) {
    this.setState({
      sort: value
    })
    activeButton(value);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sort !== this.state.sort) {
      this.setState({
        posts: []
      })
      this.loadPosts();
    }
    showPosts();
    resetShowMore();
  }
  
  
  render() {
    handleImage(this.state.posts);

    return (
      <div>
        <header>
            <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='' />
            <p>r/react<span>js</span></p>
            <Button value='hot' class='activeButton' onButtonClick={() => this.handleSort('hot')} />
            <Button value='new' onButtonClick={() => this.handleSort('new')}/>
            <Button value='rising' onButtonClick={() => this.handleSort('rising')}/>
        </header>

        <div className='allPosts'>
          {this.state.posts.map(i => <Card key={i.id} thumb={i.thumb} title={i.title} time={elapsed(i.time)} author={i.author} url={i.url} />)}
        </div>

        <ShowMore />
     
      </div>
    )
  }

}

export default App;
