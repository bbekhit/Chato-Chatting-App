import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { updatePost, getPost } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";

class UpdatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.post.post) {
      const post = newProps.post.post;

      post.text = !isEmpty(post.text) ? post.text : "";

      // Set component fields state
      this.setState({
        text: post.text
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { _id } = this.props.post.post;

    const postData = {
      text: this.state.text,
      name: user.name,
      image: user.image
    };

    this.props.updatePost(postData, _id);
    this.props.history.push("/feed");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="post-form mb-3">
              <div className="card card-info">
                <div className="card-header bg-info text-white">
                  Say Somthing...
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                      />
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdatePostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
  // post: state.post.posts.find(post => post._id === props.match.params.id)
});

export default connect(
  mapStateToProps,
  { updatePost, getPost }
)(UpdatePostForm);

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// import { updatePost, getPost } from "../../actions/postActions";
// import isEmpty from "../../validation/is-empty";

// class UpdatePostForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "",
//       errors: {}
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentDidMount() {
//     this.props.getPost(this.props.match.params.id);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }

//     if (nextProps.post.post) {
//       const post = nextProps.post.post;

//       // If profile field doesnt exist, make empty string
//       post.text = !isEmpty(post.text) ? post.text : "";

//       // Set component fields state
//       this.setState({
//         text: post.text
//       });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     const { post } = this.props.post;

//     const updatedData = {
//       text: this.state.text,
//       id: post.id
//     };
//     this.props.updatePost(updatedData, id);
//     this.props.history.push("/feed");
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="post-form mb-3">
//         <div className="card card-info">
//           <div className="card-header bg-info text-white">Say Somthing...</div>
//           <div className="card-body">
//             <form onSubmit={this.onSubmit}>
//               <div className="form-group">
//                 <TextAreaFieldGroup
//                   name="text"
//                   value={this.state.text}
//                   onChange={this.onChange}
//                   error={errors.text}
//                 />
//               </div>
//               <button type="submit" className="btn btn-dark">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// UpdatePostForm.propTypes = {
//   updatePost: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   post: state.post,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { updatePost, getPost }
// )(UpdatePostForm);
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // import React, { Component } from "react";
// // import PropTypes from "prop-types";
// // import { connect } from "react-redux";
// // import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// // import { addPost, getPost } from "../../actions/postActions";
// // import isEmpty from "../../validation/is-empty";

// // class UpdatePostForm extends Component {
// //   constructor() {
// //     super();
// //     this.state = {
// //       text: "",
// //       errors: {}
// //     };

// //     this.onChange = this.onChange.bind(this);
// //     this.onSubmit = this.onSubmit.bind(this);
// //   }

// //   componentDidMount() {
// //     this.props.getPost(this.props.match.params.id);
// //   }

// //   componentWillReceiveProps(nextProps) {
// //     if (nextProps.errors) {
// //       this.setState({ errors: nextProps.errors });
// //     }
// //     if (nextProps.post.post) {
// //       const post = nextProps.post.post;

// //       // If profile field doesnt exist, make empty string
// //       post.text = !isEmpty(post.text) ? post.text : "";

// //       // Set component fields state
// //       this.setState({
// //         text: post.text
// //       });
// //     }
// //   }

// //   onSubmit(e) {
// //     e.preventDefault();
// //     const { user } = this.props.auth;
// //     const postData = {
// //       name: user.name,
// //       image: user.image,
// //       text: this.state.text
// //     };

// //     this.props.addPost(postData);
// //     this.setState({ text: "" });
// //   }

// //   onChange(e) {
// //     this.setState({ [e.target.name]: e.target.value });
// //   }

// //   render() {
// //     const { errors } = this.state;
// //     return (
// //       <div className="post-form mb-3">
// //         <div className="card card-inf">
// //           <div className="card-header bg-info text-white">Say Somthing...</div>
// //           <div className="card-body">
// //             <form onSubmit={this.onSubmit}>
// //               <div className="form-group">
// //                 <TextAreaFieldGroup
// //                   placeholder="Create a Post"
// //                   name="text"
// //                   value={this.state.text}
// //                   onChange={this.onChange}
// //                   error={errors.text}
// //                 />
// //               </div>
// //               <button type="submit" className="btn btn-dark">
// //                 Submit
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// // }

// // UpdatePostForm.propTypes = {
// //   addPost: PropTypes.func.isRequired,
// //   auth: PropTypes.object.isRequired,
// //   errors: PropTypes.object.isRequired
// // };

// // const mapStateToProps = state => ({
// //   errors: state.errors,
// //   auth: state.auth
// // });

// // export default connect(
// //   mapStateToProps,
// //   { addPost, getPost }
// // )(UpdatePostForm);
