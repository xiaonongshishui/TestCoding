import React from 'react';

const Prompt = ({ isOpen, message }) =>
    <div className={`prompt ${isOpen?"prompt-active":"prompt-leave"}`}>
    <div className="prompt-content"><i className="fa fa-exclamation-circle"></i>{message}</div>
</div>;

export default Prompt;