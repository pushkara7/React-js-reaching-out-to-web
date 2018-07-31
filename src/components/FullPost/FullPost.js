import React,{Component} from 'react';
import './FullPost.css';
import axios from 'axios';

class fullPost extends Component{
	state={
		loadedPost : null,
		error:false
	}
	componentDidUpdate(){
		if(this.props.id && !this.state.error){
			if((!this.state.loadedPost )|| (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
				axios.get('/posts/'+ this.props.id)
				.then(response =>{
					this.setState({loadedPost:response.data})
				})
				.catch(error=>{
					this.setState({error:true});
				})
			}
		}
	}

	deletePostHandler = () =>{
		axios.delete('/posts/'+ this.props.id)
		.then(response =>{
			alert("Post deleted successfully");
		})
		.catch(error=>{
			this.setState({error:true});
		})
	}
	render(){
		let post = <p style={{textAlign:'center'}}>Please select a Post.</p>
		if(this.state.error){
			post = <p style={{textAlign:'center'}}>Something went wrong!</p>
		}
		if(this.props.id && !this.state.error){
			post = <p style={{textAlign:'center'}}>Loading!!!</p> 
		}
		if(this.state.loadedPost){
			post = (<div className="FullPost">
				<h1>{this.state.loadedPost.title}</h1>
				<p>{this.state.loadedPost.body}</p>
				<div className="Edit">
                    <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                </div>
			</div>);
		}
	return post;
	}
}



export default fullPost;