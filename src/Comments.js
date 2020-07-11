import React, {Component} from 'react';
import './App.css'
import axios from 'axios'

export default class Comments extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: "",
            content: "",
            imageUrl: "",
            author: "",
            authorId: "",
            loggedInUserId: this.props.loggedInUserId
        }
    }
