import { Pressable, SafeAreaView, StyleSheet, View, Text, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../Components/InputField'
import { AppLogo, IconClose, IconNotify, IconOption, IconSearch } from '../../assets/images'
import { LinkMediumBold, TextSmall } from '../../assets/constants/Typography'
import NewsCard from '../../Components/Card'
import Spacing from '../../Components/Spacing'
import AxiosIntance from '../../utils/AxiosIntance'
import { Skeleton } from '@rneui/themed'
import ItemLoading from '../../Components/ItemLoading'
import { Colors } from '../../assets/constants/Colors'
import { AppContext } from '../../utils/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ navigation }) => {

    const [dataList, setDataList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [dataListLastest, setDataListLastest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { infoUser, setInfoUser } = useContext(AppContext);

    const handleSearchValue = (newText) => {
        setSearchValue(newText);
    }

    const handleOnClickNews = (data) => {
        navigation.navigate('DetailScreen', { ...data });
    }

    const handleFetchData = async () => {
        try {
            setIsLoading(true);
            const res = await AxiosIntance().get("/articles");
            // console.log(res);
            if (!res.error) {
                setDataList(res.data);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleFetchData();
        // console.log(currentPass);
        return () => { }
    }, [])

    const handleRenderItem = ({ item, index }) => {
        if (index > 0) {
            return (
                <NewsCard
                    key={item._id} data={item} horizontal={true}
                    onPress={() => { handleOnClickNews(item) }}
                    onPressMoreButton={() => { console.log("Press into more button"); }}
                    onPressNewsAuthor={() => { console.log("Press into news author"); }} />
            )
        }
    }

    const getKey = (item) => {
        return item._id;
    }

    const handleInfoUser = async () => {
        if (JSON.stringify(infoUser) === "{}") {
            const resInfoUser = await AsyncStorage.getItem("infoUser");
            setInfoUser(JSON.parse(resInfoUser))
        }
        console.log(infoUser);
    }

    return (
        <SafeAreaView style={styles.screenContainer}
            onLayout={handleInfoUser}>
            <View style={styles.headerContainer}>
                <AppLogo />
                <Pressable onPress={() => { console.log("notify icon clicked"); }}>
                    <IconNotify style={styles.iconNotify} />
                </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollView} scrollEnabled={true} showsVerticalScrollIndicator={false}>
                <View style={styles.searchBar}>
                    <Pressable style={styles.leftContainer} onPress={() => { navigation.navigate("SearchScreen") }}>
                        <IconSearch />
                        <Text style={[TextSmall, { color: Colors.placeHolder }]}>Search</Text>
                    </Pressable>
                    <Pressable onPress={() => { console.log("filter button presss"); }}>
                        <IconOption />
                    </Pressable>
                </View>
                {/* header content */}
                <View style={[styles.headerContent]}>
                    <Text style={[LinkMediumBold, { color: "#000" }]}>Trending</Text>
                    <Text style={[TextSmall]}>See all</Text>
                </View>

                <View style={styles.topTrendingNews}>
                    {dataList.length > 0 ?
                        <NewsCard
                            horizontal={false} data={dataList[0]}
                            onPress={() => { handleOnClickNews(dataList[0]) }}
                            onPressMoreButton={() => { console.log("Press into more button"); }}
                            onPressNewsAuthor={() => { console.log("Press into news author"); }} />
                        : isLoading ?
                            <ItemLoading vertical={true} />
                            :
                            <></>
                    }
                </View>
                <View style={[styles.headerContent, { marginVertical: 0, marginTop: 16 }]}>
                    <Text style={[LinkMediumBold, { color: "#000" }]}>Latest</Text>
                    <Text style={[TextSmall]}>See all</Text>
                </View>
                {
                    dataList.length > 2 ?
                        <FlatList
                            ItemSeparatorComponent={<Spacing />}
                            data={dataList}
                            keyExtractor={getKey}
                            renderItem={handleRenderItem}
                            scrollEnabled={false}
                            removeClippedSubviews={true}
                            updateCellsBatchingPeriod={70}
                        /> :
                        isLoading ?
                            <>
                                <ItemLoading />
                                <ItemLoading />
                                <ItemLoading />
                            </> :
                            <></>
                }
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: 45
    },
    scrollView: {
        flex: 1,
        marginBottom: 3
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16
    },
    inputStyle: {
        height: 48,
    },
    iconNotify: {
        marginEnd: 0,
    },
    inputContainerStyle: {
        height: 0
    },
    searchBar: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.bodyText,
        height: 48,
        borderRadius: 6,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12
    },
    leftContainer: {
        flexDirection: "row",
        gap: 10,
        flex: 1
    }
})