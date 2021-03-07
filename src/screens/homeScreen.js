import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import mainStyle from '../modules/style/mainStyle';

// actions
import { fetchBooksList, fetchMoreBooksList } from '../actions/main';

// components
import WelcomeCard from '../components/welcomeCard';
import BookCard from '../components/bookCard';

const {
    homeContainer,
    HeaderActionBar,
    HeaderActionBarTitle,
    noBooksCopy,
    booksListStyle,
    loadingIcon
} = mainStyle;

class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            pagenumber: 2
        }
    }

    componentDidMount() {
        const {
            fetchBooksList
        } = this.props;
        fetchBooksList();
    }

    renderCardItem({ title, description, author_name, createdAt }) {
        return (
            <BookCard
                title={title}
                description={description}
                author_name={author_name}
                date={(new Date(createdAt).toDateString())}
                edit={false}
            />
        )
    }

    fetchMore() {
        const {
            fetchMoreBooksList,
            end
        } = this.props;

        const {
            pagenumber
        } = this.state;
        if (!this.onEndReachedCalledDuringMomentum) {
            fetchMoreBooksList(pagenumber);
            if (!end)
                this.setState({ pagenumber: pagenumber + 1 })
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    onRefresh() {
        const { fetchBooksList } = this.props;
        this.setState({ pagenumber: 2 })
        fetchBooksList();
    }

    render() {
        const {
            booksList,
            loading,
            loadMore,
            errorTitle,
            errorMessage
        } = this.props;

        return (
            <View style={homeContainer}>
                <StatusBar barStyle={'dark-content'} />
                {
                    loading ? <View style={loadingIcon}><ActivityIndicator size={'large'} /></View>
                        :
                        <FlatList
                            style={booksListStyle}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            showsVerticalScrollIndicator={false}
                            data={booksList}
                            renderItem={({ item }) => this.renderCardItem(item)}
                            keyExtractor={({ id }) => id}
                            onRefresh={() => this.onRefresh()}
                            refreshing={loading}
                            onEndReachedThreshold={0}
                            onEndReached={() => this.fetchMore()}
                            ListEmptyComponent={() => <Text style={noBooksCopy}>No Books Added Yet</Text>}
                            ListFooterComponent={() => loadMore && <ActivityIndicator size={'large'} />}
                        />
                }
            </View >
        )

    }

}

const mapStateToProps = ({ books }) => {
    const {
        booksList,
        loading,
        errorTitle,
        errorMessage,
        loadMore,
        end
    } = books;

    return {
        booksList,
        loading,
        errorTitle,
        errorMessage,
        loadMore,
        end
    }
}

export default connect(mapStateToProps, {
    fetchBooksList,
    fetchMoreBooksList
})(HomeScreen)