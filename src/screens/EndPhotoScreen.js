import { View, Image, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';

const EndPhotoScreen = ({ route, navigation }) => {
    const { uri, end } = route.params;
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }} />
            <NavigationButton color='green' message='Done' screenName='ScorecardEnd' navigation={navigation} data={{ image: { uri: uri, end: end } }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch'
    }
});

export default EndPhotoScreen;