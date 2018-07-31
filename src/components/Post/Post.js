import React from 'react';
import './Post.css';

const post = (props) =>{
	return (
			<div className="Post" onClick={props.clicked}>
				<p><strong>{props.title}</strong></p>
				<p>{props.author}</p>
			</div>
		);
}

export default post;