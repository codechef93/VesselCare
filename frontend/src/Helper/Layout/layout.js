import React, { useState } from 'react';
import hoistStatics from "hoist-non-react-statics";
const LayoutContext = React.createContext(0);
function LayoutManagerProvider(props) {
    const [renderFor, setRenderFor] = useState(0);
    return (
        <LayoutContext.Provider value={renderFor} {...props} >
            <LayoutManager setRenderFor={setRenderFor}>
                {props.children}
            </LayoutManager>
        </LayoutContext.Provider>
    )
}
class LayoutManager extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            renderFor : 0, // 0 for desktop, 1 for ipad, 2 for mobile 
        };
    }

    updateSize = () => {
        var width = window.innerWidth
        if (window.orientation === 90) {
            if (navigator.userAgent.match(/Android/) === null) {
                // android's innerheight has issues
                width = window.innerHeight
            }
        }
        if (width >= 1200) {
            this.props.setRenderFor(0)
        } else if (width >= 768) {
            this.props.setRenderFor(1)
        } else {
            this.props.setRenderFor(2)
        }
    }
    componentDidMount() {
        this.updateSize()
        window.addEventListener('resize', this.updateSize);
        window.addEventListener("orientationchange", this.updateSize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
        window.removeEventListener('orientationchange', this.updateSize);
    }
    render() {
        return(
            <>
            {this.props.children}
            </>
        )
    }
}
function withLayoutManager(Component) {
    const C = props => {
      const { wrappedComponentRef, ...remainingProps } = props;
      return (
        <LayoutContext.Consumer>
          {context => {
                return (
                <Component
                    {...remainingProps}
                    {...context}
                    renderFor = {context}
                    ref={wrappedComponentRef}
                />
                );
          }}
        </LayoutContext.Consumer>
      );
    };
    C.WrappedComponent = Component;
    return hoistStatics(C, Component);
  }
  
  export { withLayoutManager, LayoutManagerProvider };