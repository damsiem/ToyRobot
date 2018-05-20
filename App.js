import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Dimensions
} from 'react-native';
import { place, left, right, up, down, move, initTable } from './actions/index';
import { SOUTH, PLACE, LEFT, RIGHT, MOVE, WEST, NORTH, EAST, DIRECTION_OF } from './actions/Constant';
const { width } = Dimensions.get('window');
const mapStateToProps = (state) => {

  return {
      cols: state.toyRobot.cols,
      rows: state.toyRobot.rows,
      x: state.toyRobot.x,
      y: state.toyRobot.y,
      direction: state.toyRobot.direction,
      isPlaced: state.toyRobot.isPlaced
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      onPlace: (data)=>{
          dispatch(place(data));
      },
      onLeft: (data)=>{
          dispatch(left(data));
      },

      onRight: (data)=>{
          dispatch(right(data));
      },
      onUp: (data)=>{
          dispatch(up(data));
      },
      onDown: (data)=>{
          dispatch(down(data));
      },
      onMove: (data)=>{
          dispatch(move(data));
      },
      onInitTable: (data)=>{
          dispatch(initTable(data))
      }

  }
}
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          errorMsg: '',
          direction: 'NONE',
          commandTxt:''
      }
      this.props.onInitTable({cols: 9, rows:9})
      
      
  }
  parseData =()=> {
      const {commandTxt} = this.state;

      this.setState({errorMsg: '', commandTxt: ''});
      this.refs.inputCommand.focus();
      const { direction, cols, rows, x, y, isPlaced } = this.props;

      if(commandTxt && commandTxt.trim().length > 0){
          let commands = commandTxt.trim().split(' ');
          if(commands.length > 0){
              let command = commands[0].toUpperCase();
              if(commands.length > 1){
                
              if(command == PLACE){
                  let params = commands[1].split(',');
                  if(params.length != 3){
                      this.setState({errorMsg: 'Robot: Command Invalid'});
                      return null;
                  }
                  let x = parseInt(params[0]);
                  let y = parseInt(params[1]);
                  let d = params[2];
                  if( !this.validatePosition(x, y, rows, cols)){
                    this.setState({errorMsg: 'Robot: Position Invalid'});
                    return null;
                  }
                  if(!d || [WEST, NORTH, SOUTH, EAST].indexOf(d.trim().toUpperCase()) < 0){
                      this.setState({errorMsg: 'Robot: Direction Invalid'});
                      return null;
                  }
                  return {command: command, params: {x: x, y: y, direction: d}};
              } else if(!isPlaced && command){

                    this.setState({errorMsg: 'You need place robot within the table grid'});
                    return null;
          
              } else if(command == MOVE){
                  let unit = parseInt(commands[1]);

                  if(!isNaN(unit) ){
                      if(this.isOutOfTable(x,y,direction,cols, rows, unit)){
                          this.setState({errorMsg: 'Robot: You only move within the table grid'});
                          return null;
                      } else {
                          return {command: command, params: {unit:unit}};
                      }
                  }
                  this.setState({errorMsg: 'Robot: Command invalid'});
                  return null;
              } else {
                  this.setState({errorMsg: 'Robot: Command invalid'});
                  return null;
              }
        } else {
            if(!isPlaced){

                this.setState({errorMsg: 'You need place robot within the table grid'});
                return null;
            }
              if([LEFT, RIGHT].indexOf(command) > -1){
                  return {command: command};
              } else if(MOVE == command){
                if(this.isOutOfTable(x,y,direction,cols, rows, 1)){
                    this.setState({errorMsg: 'Robot: You only move within the table grid'});
                    return null;
                } else {
                    return {command: command, params: {unit:1}};
                }

              }else {
                  this.setState({errorMsg: 'Robot: Command invalid'});
                  return null;
              }
          }
          }
          
      } 
      return null;

  }
isOutOfTable = (x,y,direction, cols, rows, unit)=>{
    
    if(NORTH == direction && (x + DIRECTION_OF[direction].dx*unit >= rows||x + DIRECTION_OF[direction].dx*unit < 0)){
        return true;
    } else if(SOUTH == direction && (x + DIRECTION_OF[direction].dx*unit >= rows||x + DIRECTION_OF[direction].dx*unit < 0)) {
        return true;
    } else if(EAST == direction && (y + DIRECTION_OF[direction].dy*unit < 0 || y + DIRECTION_OF[direction].dy*unit >= cols)) {
        return true;
    } else if(WEST == direction && (y + DIRECTION_OF[direction].dy*unit < 0 || y + DIRECTION_OF[direction].dy*unit >= cols)) {
        return true;
    }

    return false;
}
command=()=>{
    let data = this.parseData();
        
    if(data){
        let {command, params} = data;

        if(command == PLACE){
            this.props.onPlace(params);
        } else if(command == LEFT){
            this.props.onLeft(command);
        } else if(command == RIGHT){
            this.props.onRight(command);
        } else if(command == MOVE){
            this.props.onMove({unit: params && params.unit});
        }
    }


  }

  validatePosition =(x, y, rows, cols)=>{
    return (x > -1 && x < rows && y > -1 && y < cols);
  }

  render() {

    const { rows, cols, x, y, direction} = this.props;

    const {commandTxt, errorMsg } = this.state;
    const matrix = Array.from(new Array(rows), (val, row) => {
      const elms = Array.from(new Array(cols), (val, col) => {
        return <View key={col} style={[styles.col, row === x && col === y 
            && styles.selected, {width: width/rows,height: width/rows, justifyContent: 'center', alignItems:'center'}]}>
            <Text>{row === x && col === y?direction.substring(0,1):""}</Text></View>
      });
      return <View key={row} style={styles.row}>{elms}</View>
    });
    return (
      <View style={styles.container}>
        {matrix}
        
      {
          errorMsg &&
        <View style={{padding: 10}}>
            <Text>{errorMsg}</Text>
        </View>
      }
        <View style={styles.inputContainer}>
            <TextInput
                ref="inputCommand"
            onSubmitEditing={()=>{
                this.command(commandTxt)
            }}
            placeholder="Input Command"
            keyboardType="default"
            autoCapitalize="characters"
            returnKeyType="done"
            style={styles.input}
            onChangeText={commandTxt => this.setState({commandTxt})}
            disableFullscreenUI={true}
            value={commandTxt}
            underlineColorAndroid="transparent"
            />
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

var styles = StyleSheet.create({
  container: {
    borderColor: '#aaa',
    borderWidth: 1,
    alignContent: 'center',
    paddingTop:25,
    paddingBottom:25
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    borderColor: '#aaa',
    borderWidth: 1,
    
  },
  selected: {
    backgroundColor: 'green'
  },
  inputContainer: {
    alignSelf: 'stretch',
    // paddingHorizontal: 10,
    padding: 10
  },
  input: {
    borderColor: '#eee',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: 0
  }
});