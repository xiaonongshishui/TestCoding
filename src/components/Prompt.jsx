import React, { Component } from 'react';

const Prompt = ({ isOpen, message }) =>
    <div className={`prompt ${isOpen?"prompt-active":"prompt-leave"}`}>
    <div className="prompt-content">{message}</div>
</div>;

export default Prompt;