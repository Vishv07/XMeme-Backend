import React, { Component } from "react";
import { List, Avatar, Space } from "antd";
import '../assets/css/style.css';
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from "../Services/axios";

export class MemeList extends Component {

  constructor(props){
    super(props);
    this.state = {
        Memes:[],
        loading: false,
    }
  }



  async componentDidMount(){
  
    await axios.get("/memes")
    .then((response) =>{
      this.setState({
        Memes:response.data
      })
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  

  render() {
    return (
      <div>
        <List
        className="meme-list"
           
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={this.props.Memes}
          renderItem={(item) => (
            <List.Item
              key={item.name}
            >
              <List.Item.Meta
                avatar={<img src={item.url} height="100" width="100" />}
                title={<a href={item.href}>{item.name}</a>}
                description={item.caption}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default MemeList;
