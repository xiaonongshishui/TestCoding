import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from 'components/Prompt';

export default function prompt(props) { 
    let div = document.createElement('div');
    document.body.appendChild(div);

    const updateProps = (newProps) => {
        let updated = React.createElement(Prompt, Object.assign({}, props, newProps));
        ReactDOM.render(updated, div);
    };

    const close = () => {
        updateProps({ isOpen: false });
        setTimeout(() => { 
            const unmount = ReactDOM.unmountComponentAtNode(div);
            if (unmount && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        },300)
        
    };



    
    updateProps({isOpen:true})
    
    setTimeout(() => { 
        close();
    },3000);
}