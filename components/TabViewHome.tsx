import * as React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ArticlesList from "@/components/ArticlesList";
import usersStore from "@/store/UsersStore";
import LogInSuggestion from "@/components/LogInSuggestion";


const ForYou = () => (
    <View style={[styles.scene]}>
        <ArticlesList/>
    </View>
);

const Following = () => {
    let loggedInUser = usersStore.loggedInUser
    return (
        loggedInUser ?
            <View style={[styles.scene]}><Text>Nothing to show</Text></View> :
            <View style={[styles.scene]}>
                <LogInSuggestion/>
            </View>
    )
};

const renderScene = SceneMap({
    first: ForYou,
    second: Following,
});

const routes = [
    {key: 'first', title: 'For You'},
    {key: 'second', title: 'Following'},
];

export default function TabViewHome() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            style={styles.tabView}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    style={styles.tabBar}
                    indicatorStyle={{backgroundColor: 'blue', height: 3}} // Blue underline for selected tab
                    labelStyle={{color: 'blue', fontWeight: 'bold'}} // Blue text for tabs
                    activeColor="blue"
                    inactiveColor="gray"
                />
            )}
        />
    );
}


const styles = StyleSheet.create({
    tabView: {
        flex: 1, 
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    tabBar: {
        backgroundColor: 'white',
    },
})