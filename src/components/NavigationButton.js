import { Button } from 'react-native';

const NavigationButton = ({ color, message, screenName, navigation, data=null }) => {
    return (
        <Button
            color={color}
            title={message}
            onPress={() => navigation.navigate(screenName, data)}
        />
    );
};

export default NavigationButton;