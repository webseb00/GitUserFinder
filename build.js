"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var api_link = 'https://api.github.com/search/users?q=';
var gifLoaderLink = 'http://www.ifmo.ru/images/loader.gif';

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
    _this.state = {
      searchingText: '',
      users: [],
      loading: false
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(e) {
      var value = e.target.value;
      this.setState({
        searchingText: value
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      this.handleSearch(this.state.searchingText);
      this.setState({
        loading: true
      });
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(name) {
      var _this2 = this;

      fetch("".concat(api_link).concat(name)).then(function (resp) {
        return resp.json();
      }).then(function (resp) {
        return _this2.setState({
          users: resp.items,
          loading: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          searchingText = _this$state.searchingText,
          users = _this$state.users;
      return React.createElement("div", {
        className: "wrapper"
      }, React.createElement("h1", {
        className: "wrapper-heading"
      }, "Find github users!"), React.createElement("form", {
        className: "form-app",
        onSubmit: function onSubmit(e) {
          return _this3.onSubmit(e);
        }
      }, React.createElement("label", {
        htmlFor: "searchText"
      }, "Search by user name"), React.createElement("input", {
        type: "text",
        id: "searchText",
        placeholder: "Search users...",
        onChange: this.handleChange,
        value: searchingText
      })), React.createElement(UsersList, {
        users: users,
        loading: this.state.loading
      }));
    }
  }]);

  return App;
}(React.Component);

var UsersList =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(UsersList, _React$Component2);

  function UsersList() {
    _classCallCheck(this, UsersList);

    return _possibleConstructorReturn(this, _getPrototypeOf(UsersList).apply(this, arguments));
  }

  _createClass(UsersList, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "container"
      }, this.users);
    }
  }, {
    key: "users",
    get: function get() {
      var users = this.props.users;
      var userList = users.map(function (user) {
        return React.createElement(User, {
          key: user.id,
          user: user
        });
      });
      console.log(this.props.loading);
      return !this.props.loading ? userList : React.createElement("img", {
        src: gifLoaderLink,
        alt: "loader"
      });
    }
  }]);

  return UsersList;
}(React.Component);

var User =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(User, _React$Component3);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: "render",
    value: function render() {
      var _this$props$user = this.props.user,
          avatar_url = _this$props$user.avatar_url,
          login = _this$props$user.login,
          html_url = _this$props$user.html_url;
      return React.createElement("div", {
        className: "user-box user"
      }, React.createElement("a", {
        href: html_url,
        target: "_blank"
      }, React.createElement("img", {
        src: avatar_url,
        alt: "User avatar"
      }), React.createElement("p", {
        className: "user-login"
      }, login)));
    }
  }]);

  return User;
}(React.Component);

var root = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), root);
