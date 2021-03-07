import { StyleSheet } from 'react-native';
import values from '../values/mainValues';
import colors from './colors';
import fontMaker from '../utilities/fontMaker';


/**Global Style Sheet */
export default mainStyle = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    welcomeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: values.marginMeduim,
        marginBottom: values.marginSmall,
        marginTop: values.marginBig,
    },
    bookCard: {
        backgroundColor: colors.white,
        borderRadius: values.BorderRadius,
        padding: values.paddingMeduim,
        margin: values.marginMeduim,
        marginBottom: values.marginSmall,

    },
    bookCardTitle: {
        ...fontMaker(values.fontBig, '600', values.header),
        flex: 6,
        marginRight: 2
    },
    bookCardInfoContainer: {
        flexDirection: 'row',
        margin: values.marginSmall,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookCardInfoItem: {
        marginBottom: values.marginSmall,
        ...fontMaker(values.fontMini, '600', values.infoText)
    },
    bookCardInfoAuthorName: {
        flex: 4,
        backgroundColor: colors.headers,
        paddingHorizontal: values.paddingSmall,
        paddingVertical: values.paddingMini,
        borderRadius: 100,
        alignItems: 'center'
    },
    bookCardInfoAuthorNameText: {
        ...fontMaker(values.fontMini, '600', colors.white)
    },
    bookCardDescription: {
        ...fontMaker(values.fontSmall, 'normal', colors.headers)
    },
    ParallaxContainer: {
        backgroundColor: colors.white,
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    profileImage: {
        width: values.imagesMeduim,
        height: values.imagesMeduim,
        resizeMode: 'contain'
    },
    welcomeCardBody: {
        marginLeft: values.marginBig,
    },
    welcomeCardHeader: {
        ...fontMaker(values.fontMeduim, 'bold')
    },
    welcomeCardProfileType: {
        marginTop: values.marginSmall,
        ...fontMaker(values.fontSmall, '500', values.subHeader)
    },
    HeaderActionBar: {
        margin: values.marginMeduim,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    HeaderActionBarTitle: {
        ...fontMaker(values.fontMeduim, '300', values.header)
    },
    noBooksCopy: {
        alignSelf: 'center',
        ...fontMaker(values.fontMeduim, '300', values.header),
        marginTop: values.marginBig
    },
    loadingIcon: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    AuthContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    AuthContainerHeader: {
        textAlign: 'center',
        marginBottom: values.marginBig,
        ...fontMaker(values.fontBig, '300', values.header),
    },
    AuthInputContainer: {
        backgroundColor: colors.white,
        marginHorizontal: values.marginBig,
        marginVertical: values.marginSmall,
    },
    AuthContainerInput: {
        padding: values.paddingMeduim,
        borderBottomWidth: 0.3,
        borderBottomColor: colors.info
    },
    AuthContainerMainButton: {
        marginHorizontal: values.marginBig * 2,
        marginVertical: values.marginSmall * 4,
        backgroundColor: colors.headers,
        padding: values.paddingMeduim,
        paddingVertical: values.paddingSmall * 1.5,
        borderRadius: values.BorderRadiusBig
    },
    AuthContainerMainButtonText: {
        textAlign: 'center',
        ...fontMaker(values.fontMeduim, '400', colors.white),
    },
    AuthContainerSecButton: {
        marginTop: values.marginMeduim
    },
    AuthContainerSecButtonText: {
        textAlign: 'center',
        ...fontMaker(values.fontSmall, '400', colors.link),
    },
    errorMessageStyle: {
        textAlign: 'center',
        marginBottom: values.marginMeduim,
        ...fontMaker(values.fontMini, '400', colors.error)
    },
    addMoreButton: {
        backgroundColor: colors.headers,
        paddingHorizontal: values.paddingMeduim,
        paddingVertical: values.paddingSmall / 2,
        borderRadius: values.BorderRadiusBig
    },
    addMoreButtonText: {
        ...fontMaker(values.fontSmall, '400', colors.white),
    },
    booksListStyle: {
        flex: 1
    },
    icon: {
        width: values.imagesMini,
        height: values.imagesMini,
        marginLeft: values.marginSmall
    },
    ModalStyleContant: {
        backgroundColor: colors.white,
        marginTop: values.marginBig,
        flex: 1
    },
    BookContainerInput: {
        margin: values.marginMeduim
    },
    BookContainerLable: {
        marginLeft: values.marginMeduim,
        ...fontMaker(values.fontSmall, '400', colors.link),
    }
})