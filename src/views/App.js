import logo from "../logo.svg";
import "../styles/App.css";
import TodoList from "./TodoList";
import { Layout, theme } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="App">
      <Header className="App-header" style={{ display: "flex" }}>
        <img src={logo} className="App-logo" />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 470,
            width: "100%",
            padding: 24,
            borderRadius: borderRadiusLG,
            alignContent: "center",
          }}
        >
          <TodoList />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
