import React, { Component } from "react";
import axios from 'axios';
import Welcome from "./welcome";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import "./destination/style.css";
import { Link } from "react-router-dom"


class Header extends Component {


  // const uname = ''

  componentDidMount()
  {
    if(this.props.authenticated)
    {
      console.log('true')
      const token = localStorage.getItem('token')
      const info = jwt.decode(token,process.env.JWT_SECRET)
      let uname = info.uname;
    }
  }



renderLinks() {
  if (this.props.authenticated) {
    console.log('true')
    return (
      <div className="navbar-nav nav-item dropdown ml-auto">
  <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
    );
  } else {
    console.log("false")
    return (
      <ul className="navbar-nav">
        <li className="nav-item" key={1}>
          <Link className="btn btn-primary" to="/signin">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" key={2}>
          <Link className="btn btn-secondary ml-sm-2" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}

render() {
  return (
    <nav class="navbar navbar-expand-lg flex-shrink-0  navbar-dark fixed-top bg-dark">
      <div className="container">
      <a href="/" class="navbar-brand">Connect</a>
        <div
          className="collapse navbar-collapse"
          id="navbarsExampleContainer"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Post"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="ml-auto">{this.renderLinks()}</div>
        </div>
      </div>
    </nav>
  );
}
}




// onChangedepartment(e) {
//   this.setState({department : e.target.value.toUpperCase() })
//   console.log(this.state.department)
// }



// onSubmit(e) {
//     e.preventDefault()

//     const userObject = {
//       department: this.state.department
//   };

//     console.log(this.state.department)

//     axios.post('http://localhost:5000/find',{
//               "department" : userObject.department
//         })
//         .then((res) => {
//             res.send(res.data);
//             console.log(res.data);
//         }).catch((error) => {
//             console.log(error)
//         });


//         this.setState({ department: ''})
//   }
    

//   render() {
//     return (
//       <nav class="navbar navbar-expand-lg flex-shrink-0  navbar-dark fixed-top bg-dark">
//   <div class="container-fluid flex-shrink-0 ">
//     <a href="/" class="navbar-brand">Connect</a>
//     <div class="navbar" id="navbarSupportedContent">
//       {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0"> */}
//       <ul class = "w-full block flex-grow sm:flex text-white sm:items-center sm:w-auto">
//       {/* <li class="nav-item"> */}
//       <li class = "text-sm sm:flex">
//           <a class="nav-link" aria-current="page" href="/signin">SignUp</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="/login">login</a>
//               {/* <a
//               href="#"
//               class="block mt-1 sm:inline-block sm:mt-0 text-white-700 hover:text-white mr-4"
//               >
//               Your Business
//               </a> */}
//          </li>
//        </ul>
//        </div>
//      <form class="d-flex" onSubmit= {this.onSubmit}>
//        <input class="form-control me-2" value={this.state.department} onChange={this.onChangedepartment} type="search" placeholder="Search" aria-label="Search" />
//        <button class="btn btn-outline-success" type="submit">Search</button>
//      </form>
//    </div>
//  </nav>
//       //   <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-2">
//       //   <div class="flex items-center flex-shrink-0 text-white mr-6">
//       //     <span class="font-bold text-xl">Biznet</span>
//       //   </div>
  
//       //   <div class="w-full block flex-grow sm:flex text-white sm:items-center sm:w-auto">
//       //     <div class="text-sm sm:flex-grow">
//       //       <a
//       //         href="#"
//       //         class="block mt-4 sm:inline-block sm:mt-0 text-teal-700 hover:text-white mr-4"
//       //       >
//       //         Your Business
//       //       </a>
//       //       <a
//       //         href="#"
//       //         class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
//       //       >
//       //         Networking
//       //       </a>
//       //       <a
//       //         href="#"
//       //         class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white"
//       //       >
//       //         Blog
//       //       </a>
//       //     </div>
//       //     <div>
//       //       <a
//       //         href="#"
//       //         class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
//       //         >Login</a
//       //       >
//       //     </div>
//       //   </div>
//       // </nav> 
//     );
//   }
// }


function mapStatetoProps(state) {
  console.log(state)
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStatetoProps)(Header);