import React from 'react';
import { Container, Spinner , Header, Content, Form, Item, Input , Button , Text } from 'native-base'
import axios from 'axios'
import { Font, AppLoading } from "expo";

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      email : "",
      password : "" ,
      loading:true ,
      isloading : false,
      networkproviders: []
    }
  }
  

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }


   
 



  login(){
      const data = {
        grant_type:'password',
        client_id: 3,
        client_secret: "zed2HIzZJFVVJUhHRRvngBMVRiH8d5VHxKcKltAa",
        username:this.state.email,
        password:this.state.password
    }

    this.setState({
      isloading:true
    })
    axios.get("https://735c569c.ngrok.io/api/networkproviders").then(response => {
      console.log(response.data.data)
      this.setState({
        networkproviders: response.data.data,
        isloading:false
      })
    }).catch(errors => {
     
      this.setState({
        isloading:false
      })
      console.log(errors.response.data)
    })

  }


  render() {
    if (this.state.loading) {
      return (
        
          <AppLoading />
        
      )
    }
    return (
      <Container>
      
        <Content>
          
            <Item>
              <Input value={this.state.email} placeholder="Username" onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item last>
              <Input value={this.state.password} placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})}  />
            </Item>
            {
              this.state.isloading ? <Spinner /> : <Button onPress={() => this.login()}  full light>
              <Text>Login</Text>
            </Button>
          }
          <ul>
      {elements.map((networkproviders, index) => {
        return <li key={index}>{networkproviders}</li>
      })}
    </ul>
        </Content>
      </Container>
    )
  }
}

