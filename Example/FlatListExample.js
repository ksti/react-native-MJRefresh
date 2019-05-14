import React, {Component} from 'react';
import {StyleSheet, View, Text,ListView,FlatList} from 'react-native';
import PropTypes from 'prop-types';
import HuaWeiRefreshControl from './HuaWeiRefreshControl';
import {ScrollView} from 'react-native-mjrefresh'

export default class FlatListExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                'row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8','row 9','row 10',
                'row 11', 'row 12','row 13','row 14','row 15','row 16','row 17','row 18','row 19',
            ],
        };
    }
    _onRefresh=()=>{
        setTimeout(()=>{
            this._hw && this._hw.finishRefresh()
        },1000)
    }
    onItemPress = () => {
        alert(111)
        this._flatList && this._flatList._listRef._scrollRef && this._flatList._listRef._scrollRef.scrollTo({x: 0, y: 0})
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    //legacyImplementation 如果需要使用此属性，应从mjrefresh插件中引入Flatlist
                    keyExtractor={(item)=>item}
                    ref={ref=>this._flatList = ref}
                    data={this.state.data}
                    renderItem={({item,index}) => <Text key={index} onPress={this.onItemPress} style={{height:100}}>{item}</Text>}
                    renderScrollComponent={props=><ScrollView
                        style={{flex:1}}
                        refreshControl={
                            <HuaWeiRefreshControl
                                ref={ref=>this._hw = ref}
                                onRefresh={this._onRefresh}
                            />
                        }
                        {...props}
                    />}
                />
            </View>
        )
    }
}