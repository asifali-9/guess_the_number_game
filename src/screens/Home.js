import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let value = 0;
let tempMin = 0;
let tempMax = 100;

let random = Math.floor(Math.random() * 100 + 1);

const Home = () => {
  const [suggestedValue, setSuggestedValue] = useState({
    startValue: "Number between " + 1 + " to ",
    endValue: 100,
  });
  const [remainingChance, setRemainingChance] = useState(10);
  const [isCorrect, setIsCorrect] = useState("?");
  const [inputField, setInputField] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState('');
  const [percent, setPercent] = useState('');

  // console.log(random)

  const reset = () => {
    random = Math.floor(Math.random() * 100 + 1);
    setRemainingChance(10);
    setSuggestedValue({
      startValue: "Number between " + 1 + " to ",
      endValue: 100,
    });
    setIsCorrect("?");
    value = 0;
    tempMin = 0;
    tempMax = 100;
    setInputField(value.toString());
  };

  const handleInput = (id) => {
    if (id === 0) {
      if (value !== 0) {
        value = value - 1;
        setInputField(value.toString());
      }
    } else {
      if (value !== 100) {
        value = value + 1;
        setInputField(value.toString());
      }
    }
  };

  const playAgain = () => {
    setIsVisible(false);
    reset();
  }

  const getResult = () => {
    temp = parseInt(inputField);
    
    if (temp <= 100) {
        value = temp;
        setInputField("");
        setRemainingChance(remainingChance - 1);
        
        if(remainingChance === 1 || value === random){
            setIsVisible(true);
            if(value === random){
                setResult("You Win!")
                let p = (remainingChance * 10)
                setPercent(p +"%");
            }
            else{
                setResult("You Lose!")
                let p = (remainingChance * 10)
                setPercent("0%");
            }

        }
        
        else{
        if (value === random) {
            setIsCorrect("Correct");
            setSuggestedValue({
              startValue: random,
              endValue: " is the correct answer",
            });
          } else if (value < random) {
            tempMin = value;
            setSuggestedValue({
              startValue: "Number between " + tempMin + " to " + tempMax,
            });
            setIsCorrect("InCorrect");
          } else if (value > random) {
            tempMax = value;
            setSuggestedValue({
              endValue: "Number between " + tempMin + " to " + tempMax,
            });
            setIsCorrect("InCorrect");
          }
      } 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          {suggestedValue.startValue}
          {suggestedValue.endValue}
        </Text>
      </View>
      <View style={styles.outputContainer}>
        <View style={styles.countOfIncorrect}>
          <Text style={styles.remaining}>{remainingChance} Chance left</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{isCorrect}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            onPress={() => handleInput(0)}
            name="minus-circle-outline"
            size={50}
            color="teal"
          />
        </TouchableOpacity>
        <TextInput
          value={inputField}
          onChangeText={(inputNumber) => setInputField(inputNumber)}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Enter number"
        />
        <TouchableOpacity>
          <MaterialCommunityIcons
            onPress={() => handleInput(1)}
            name="plus-circle-outline"
            size={50}
            color="teal"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => getResult()} style={styles.btnContainer}>
        <Text style={styles.btnAnswer}>Check Answer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => reset()} style={styles.resetContainer}>
        <Text style={styles.reset}>Reset</Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <View style={[styles.container, { justifyContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}>
          <View style={styles.modalInterface}>
            <View style={styles.scoreContainer}>
              <Text style={{ fontSize: 34, color: "white" }}>{result}</Text>
              <Text style={{ fontSize: 54, color: "white" }}>{percent}</Text>
            </View>
            <TouchableOpacity style={styles.playAgainContainer}>
              <Text onPress={()=> playAgain()} style={{ fontSize: 34, color: "white" }}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  hintContainer: {
    height: "15%",
    width: "90%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'skyblue',
  },
  hint: {
    fontSize: 26,
    fontWeight: "bold",
    color: "purple",
  },
  outputContainer: {
    height: "40%",
    width: "80%",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#a4e5e5",
    borderWidth: 8,
    backgroundColor: "#defaf9",
  },
  countOfIncorrect: {
    height: "30%",
    width: "90%",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    // borderColor: 'teal'
  },
  remaining: {
    fontSize: 30,
  },
  resultContainer: {
    height: "30%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'blue'
  },
  result: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#9c66ed",
  },
  inputContainer: {
    flexDirection: "row",
    height: "15%",
    width: "80%",
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#a4e5e5",
    borderWidth: 5,
    backgroundColor: "#defaf9",
  },
  input: {
    height: "50%",
    width: "60%",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 25,
    borderColor: "#54e5e5",
    borderWidth: 2,
    // backgroundColor: "#d4e5e5"
  },
  btnContainer: {
    marginTop: 20,
    height: "9%",
    width: "60%",
    borderRadius: 39,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ba1f5",
  },
  btnAnswer: {
    fontSize: 24,
    color: "white",
  },
  resetContainer: {
    marginTop: 20,
    marginRight: 10,
    height: "7%",
    width: "30%",
    borderRadius: 39,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#0d9eb8",
  },
  reset: {
    fontSize: 18,
    color: "white",
  },
  modalInterface: {
    height: "50%",
    width: "80%",
    borderRadius: 30,
    borderColor: "#dfc4f2",
    borderWidth: 10,
    backgroundColor: "#cc96ff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  scoreContainer: {
    height: "60%",
    width: "90%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#dfc4f2",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: 'red'
  },
  playAgainContainer: {
    height: "30%",
    width: "90%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#dfc4f2",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: 'blue'
  },
});

export default Home;
