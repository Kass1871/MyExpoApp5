import React, {useContext, useEffect, useState} from "react";
import {View, Text, TextInput, Pressable, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../globalStyles";
import {ThemeContext} from "../contexts/themeContext";

export default function TaskList() {
    const {theme} = useContext(ThemeContext);
    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [input, setInput] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [notice, setNotice] = useState("");

    useEffect(() => {
        const loadTasks = async () => {
            try{
                const saved = await AsyncStorage.getItem("tasks");
                if(saved){
                    setTasks(JSON.parse(saved));
                }
            } catch(error){
                console.log("Error loading tasks: ", error);
            } finally {
                setLoaded(true);
            }
        };

        loadTasks();
    }, []);

    useEffect(() => {
        if(!loaded) return;

        const saveTasks = async () => {
            try{
                await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
            } catch(error){
                console.log("Error saving tasks: ", error);
            }
        };

        saveTasks();
    }, [tasks, loaded]);

    const handleAddOrUpdate = () => {
        const value = input.trim();
        if (!value) return;

        if(editingId) {
            setTasks(prev => prev.map((task) => task.id === editingId ? {...task, title: value} : task));
            setNotice("Task edited.")
            setEditingId(null);
        } else {
            const newTask = {
                id: Date.now().toString(),
                title: value,
            };
            setTasks((prev) => [newTask, ...prev]);
            setNotice("New task added!");
        }

        setInput("");
    };

    const handleEdit = (task) => {
        setInput(task.title);
        setEditingId(task.id);
    };

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        setNotice("Task removed.")
    }

    const handleEditCancel = () => {
        setEditingId(null);
        setInput("");
        setNotice("Edit canceled.")
    }

    const renderItem = ({ item }) => {
        return (
            <View style={globalStyles.taskItem}>
                <Text style={globalStyles.taskText}>{item.title}</Text>

                <View style={globalStyles.actions}>
                    <Pressable onPress={() => handleEdit(item)}>
                        <Text styles={globalStyles.actionText}>Edit</Text>
                    </Pressable>

                    <Pressable onPress={() => handleDelete(item.id)}>
                        <Text style={globalStyles.actionText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const textColor = theme === "dark" ? "#ffffff" : "#000000";
    const darkBtnColor = theme === "dark" ? "#000000" : "#ffffff";
    const bgColor = theme === "dark" ? "#ffffff" : "#333";

    return(
      <View style={globalStyles.container}>
          <Text style={[globalStyles.title, {color: textColor}]}>Todo List</Text>

          {notice.length > 0?(
              <View style={globalStyles.notice}>
                  <Text style={globalStyles.noticeText}>{notice}</Text>
              </View>
          ) : null}

          <View style={globalStyles.row}>
              <TextInput value={input} onChangeText={setInput} placeholder="Enter a task..." style={globalStyles.input}/>
              <Pressable style={[globalStyles.button, {backgroundColor: bgColor}]} onPress={handleAddOrUpdate}>
                  <Text style={[globalStyles.btnText, {color: darkBtnColor}]}>{editingId ? "Save" : "Add"}</Text>
              </Pressable>
          </View>

          {editingId ?(
              <Pressable style={globalStyles.button} onPress={handleEditCancel}>
                  <Text style={globalStyles.cancelText}>Cancel Editing</Text>
              </Pressable>
          ) : null}

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
      </View>
    );
}