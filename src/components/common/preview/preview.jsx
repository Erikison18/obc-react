import React from 'react';
// import Loadable from 'react-loadable';
// import Loading from '../loading/loading.jsx';

function Header(props){

    return (
        <div>{props.children}</div>
    )

}

// const LoadableHeader = Loadable({
//   loader: () => new Promise((resolve)=> Header),
//   loading: Loading,
// })


export default Header