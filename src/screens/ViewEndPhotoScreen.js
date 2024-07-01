import { View, Image, Button, StyleSheet } from 'react-native';

const ViewEndPhotoScreen = ({ route, navigation }) => {
    const { uri } = route.params;
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }} />
            <Button title='Done' color='green' onPress={() => navigation.pop()} />
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

export default ViewEndPhotoScreen;