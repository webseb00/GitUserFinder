const api_link = 'https://api.github.com/search/users?q=';
const gifLoaderLink = 'http://www.ifmo.ru/images/loader.gif';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchingText: '',
            users: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({ searchingText: value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.handleSearch(this.state.searchingText);
        this.setState({ loading: true });
    }

    handleSearch(name) {
        fetch(`${api_link}${name}`)
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.items, loading: false }));
    }

    render() {
        const { searchingText, users } = this.state;
        return (
            <div className="wrapper">
                 <h1 className="wrapper-heading">Find github users!</h1>
                 <form className="form-app" onSubmit={e => this.onSubmit(e)}>
                 <label htmlFor="searchText">Search by user name</label>
                    <input 
                        type="text"
                        id="searchText"
                        placeholder="Search users..."
                        onChange={this.handleChange}
                        value={searchingText}
                    />
                </form>
                <UsersList users={users} loading={this.state.loading} />
            </div>
        )
    }
}

class UsersList extends React.Component {

    get users() {
        const { users } = this.props;
        const userList = users.map(user => <User key={user.id} user={user} />);
        console.log(this.props.loading);
        return !this.props.loading ? userList : <img src={gifLoaderLink} alt="loader" />;
        
    }

    render() {
        return (
            <div className="container">
                { this.users }
            </div>
        )
    }
}

class User extends React.Component {
    render() {
        const { avatar_url, login, html_url } = this.props.user;
        return (
            <div className="user-box user">
                <a href={html_url} target="_blank">
                    <img src={avatar_url} alt="User avatar" />
                    <p className="user-login">{login}</p>
                </a>
            </div>
        )
    }
}

const root = document.getElementById('app');

ReactDOM.render(<App />, root);