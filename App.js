import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/routes/mainRoute';
import store from './src/store';

console.disableYellowBox = true;

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}
export default App;