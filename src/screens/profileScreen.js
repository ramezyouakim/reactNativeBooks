import React, { PureComponent } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, Modal, TextInput, Pressable } from 'react-native';
import { connect } from 'react-redux'
import mainStyle from '../modules/style/mainStyle';

// actions
import { fetchBooksList, fetchMoreBooksList } from '../actions/main';

// components
import WelcomeCard from '../components/welcomeCard';
import BookCard from '../components/bookCard';
import User from '../classes/user';
import ModalOptians from '../components/modalOptians';

const {
    homeContainer,
    noBooksCopy,
    booksListStyle,
    loadingIcon
} = mainStyle;

class ProfileScreen extends PureComponent {

    constructor(props) {
        super(props);
        let user = User.getInstance();
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            pagenumber: 2,
            userId: user.id,
            username: user.username,
            modalVisible: false,
            headerTitle: ""
        }
    }

    componentDidMount() {
        const {
            fetchBooksList
        } = this.props;

        const {
            userId
        } = this.state;

        fetchBooksList("author_id=" + userId);
    }

    renderForeground() {
        return (
            <>
                <WelcomeCard username={this.state.username} />
                <HeaderAction
                    title={"My Books"}
                    btnTitle={"Add"}
                    action={null}
                    headerTitle={"Add"}
                    setModalVisible={this.setModalVisible.bind(this)}
                />
            </>
        )
    }

    renderCardItem({ title, description, author_name, createdAt, id }) {
        return (
            <BookCard
                title={title}
                description={description}
                author_name={author_name}
                date={(new Date(createdAt).toDateString())}
                edit={true}
                headerTitle={"Edit"}
                bookId={id}
                showOptions={this.setModalVisible.bind(this)}
            />
        )
    }

    fetchMore() {
        const {
            fetchMoreBooksList,
            end
        } = this.props;

        const {
            pagenumber,
            userId
        } = this.state;
        if (!this.onEndReachedCalledDuringMomentum) {
            fetchMoreBooksList(pagenumber, "author_id=" + userId);
            if (!end)
                this.setState({ pagenumber: pagenumber + 1 })
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    onRefresh() {
        const { fetchBooksList } = this.props;
        this.setState({ pagenumber: 2 })
        const {
            userId
        } = this.state;

        fetchBooksList("author_id=" + userId);
    }

    setModalVisible(Visible, title, bookId) {
        this.setState({ modalVisible: Visible, headerTitle: title, bookId: bookId })
    }

    render() {
        const {
            modalVisible,
            headerTitle,
            bookId
        } = this.state;

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
                <ModalOptians
                    modalVisible={modalVisible}
                    setModalVisible={this.setModalVisible.bind(this)}
                    title={headerTitle}
                    bookId={bookId}
                />
                {
                    loading ? <View style={loadingIcon}><ActivityIndicator size={'large'} /></View>
                        :
                        <FlatList
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            style={booksListStyle}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => this.renderForeground()}
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
})(ProfileScreen)