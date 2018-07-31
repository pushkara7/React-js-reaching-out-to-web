import React,{Component} from 'react';
import './Blog.css';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

class Blog extends Component{
	state={
		posts:[],
		selectedPost : null,
		error: false
	}
	componentDidMount (){
		axios.get('/posts')
			 	.then(response =>{
			 		const posts = response.data.slice(0,6);
			 		const updatedPosts = posts.map(post=>{
			 			return {
			 				...post,
			 				author:'Max'
			 			}
			 		})
			 		this.setState({posts:posts})
			 	})
			 	.catch(error=>{
					this.setState({error:true});
				})
	}

	postClickHandler = (id) =>{
		console.log(id);
		this.setState({selectedPost : id});
	}
	render(){

			let post = <p style={{textAlign:'center'}}>Something went wrong!</p>
			if(!this.state.error){
			 post = this.state.posts.map(post=>{
				return <Post 
						key={post.id} 
						title={post.title}
						author={post.author}
						clicked={()=>this.postClickHandler(post.id)} />
			})
			}		
		return(
				<div>
					<section className="Posts">
					{post}
					</section>
					<section>
						<FullPost id={this.state.selectedPost}/>
					</section>
					<section>
						<NewPost />
					</section>
				</div>
			);
	}
}

export default Blog;