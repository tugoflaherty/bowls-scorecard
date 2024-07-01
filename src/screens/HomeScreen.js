import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationButton from '../components/NavigationButton';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Bowls Scorecard</Text>
                <Text style={styles.subtitle}>Kingston Bowls Club</Text>
                <Image style={styles.image} source={require('../../assets/icon.jpg')} />
                <Text style={styles.welcomeMessage}>Welcome to the Bowls Scorecard.</Text>
                <Text style={styles.infoMessage}>Would you like to?</Text>
                <NavigationButton color='green' message='View Game History' screenName='GameHistory' navigation={navigation} />
                <NavigationButton color='green' message='Create New Game' screenName='NewGame' navigation={navigation} />
                <NavigationButton color='green' message='Help' screenName='Help' navigation={navigation} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 45,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 30,
        marginTop: 25,
        textAlign: 'center'
    },
    image: {
        margin: 25,
        height: 150,
        width: 150,
        alignSelf: 'center'
    },
    welcomeMessage: {
        fontSize: 20,
        marginTop: 25,
        textAlign: 'center'
    },
    infoMessage: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 25
    }
});

export default HomeScreen;