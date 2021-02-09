import React, { Component } from 'react'
import { Form, Input, Button, Spin } from 'antd';
import '../assets/css/style.css';
import axios from '../Services/axios';
import { checkURL } from '../utils/commonFunctions.js'
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 9,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
 class CreateAmeme extends Component {

    constructor(props){
        super(props);
        this.state ={
            meme_url:"",
            isvalid:false,
            loading:false,
            meme_name:"",
            meme_caption:"",
        }
    }

     Handler = (e) => {

      this.setState({ [e.target.name]: e.target.value });
     }

     HandleSubmit = async () => {
      this.setState({loading:true});
        await axios.post(`/memes`, {
          name: this.state.meme_name,
          caption: this.state.meme_caption,
          url: this.state.meme_url,
          })
          .then(response => {
              this.setState({loading:false});
              this.props.Update();
              console.log(response);
          })
          .catch(error => {
              this.setState({loading:false});
              console.log(error.response.status);
              if(error.response.status==409){
                message.error('Meme already Exists!');
              }
          })
     }
      checkPrice = (rule, value, callback, source, options) => {

        var demo = checkURL(value);
        console.log(demo);
        if (checkURL(value)) {
          return Promise.resolve();
        }
      return Promise.reject('Please Enter a Valid URL');
    };

    render() {
        return (
            <div>
               <Spin indicator={antIcon} size="large" spinning={this.state.loading}>
                 <Form
              {...layout}
              name="basic"
              onFinish = {this.HandleSubmit}
              initialValues={{
                remember: true,
              }}>
              <Form.Item
                label="Name"
                name="meme_name"
                rules={[
                  {
                    required: true,
                    message: 'Please name of the meme!',
                  },
                ]}
              >
                <Input
                 placeholder="Your name"
                 name="meme_name"
                 value={this.state.meme_name}
                 onChange = {this.Handler}
                 />
              </Form.Item>

              <Form.Item
                label="Caption"
                name="meme_caption"
                rules={[
                  {
                    required: true,
                    message: 'Please input meme caption!',
                  },
                ]}
              >
                <Input 
                placeholder="Be Creative with the caption"
                name="meme_caption"
                value={this.state.meme_caption}
                onChange = {this.Handler}
                 />
              </Form.Item>

              <Form.Item
                label="Meme URL"
                name="meme_url"
                rules={[
                  {
                    required: true,
                    message: 'Please input meme caption!',
                  },
                  {
                    validator: this.checkPrice
                  }
                ]}
              >
                <Input 
                placeholder="Enter URL of the meme here"
                value={this.state.url}
                name="meme_url"
                onChange = {this.Handler}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </Spin>
            </div>
        )
    }
}

export default CreateAmeme
