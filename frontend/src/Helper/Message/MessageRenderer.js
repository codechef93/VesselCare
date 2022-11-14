import React, { useState } from "react";
import AlertDismissible from "./dismissableMessage.js";
import hoistStatics from "hoist-non-react-statics";
const MessageContext = React.createContext();
function MessageProvider(props) {
  const [messages, setMessages] = useState([]);
  return (
    <MessageContext.Provider value={{ messages, setMessages }} {...props}>
      {props.children}
    </MessageContext.Provider>
  );
}
class Messages extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
    };
  }

  renderMessages = () => {
    if (!Array.isArray(this.props.messages)) {
      return;
    }
    var messages = [],
      messageArr = this.props.messages;
    for (var i = 0; i < messageArr.length; i++) {
      var msg = messageArr[i];
      messages.push(
        <AlertDismissible
          key={i}
          message={msg.message}
          type={msg.type}
          id={i}
          onClose={(j) => {
            messageArr.splice(j, 1);
            this.setState({ messages: messageArr });
            this.props.setMessages(messageArr);
          }}
        />
      );
    }
    return messages;
  };
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "auto",
        }}
      >
        {this.renderMessages()}
      </div>
    );
  }
}
function withMessageManager(Component) {
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <MessageContext.Consumer>
        {(context) => {
          return (
            <Component
              {...remainingProps}
              {...context}
              ref={wrappedComponentRef}
            />
          );
        }}
      </MessageContext.Consumer>
    );
  };
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
}
export { Messages, MessageProvider, MessageContext, withMessageManager };
