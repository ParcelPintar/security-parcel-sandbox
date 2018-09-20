import React, { Component } from "react";
import { db } from "../config/firebase";
import ReactJson from "react-json-view";

export default class FirebaseDBViewer extends Component {
	constructor() {
		super();
		this.state = {
			firebaseDBContent: {}
		};
	}

	firebaseDBUpdate = () => {
		let self = this;
		db.ref("/").on("value", function(snapshot) {
			self.setState({
				firebaseDBContent: snapshot.val()
			});
		});
	};

	render() {
		return <ReactJson src={this.state.firebaseDBContent} theme="monokai" />;
	}

	componentDidMount() {
		this.firebaseDBUpdate();
	}
}
