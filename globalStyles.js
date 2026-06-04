import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12
    },
    row: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },
    button: {
        backgroundColor: "#333",
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 8,
    },
    btnText: {
        color: "#fff"
    },
    cancelText: {
        margin: 10,
        color: "red",
        textAlign: "center"
    },
    taskItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "white",
    },
    taskText: {
        fontSize: 16,
        marginBottom: 8
    },
    actions: {
        flexDirection: "row",
        gap: 16
    },
    actionText: {
        color: "blue"
    },
    notice: {
        backgroundColor: "#fffec4",
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    noticeText:{
        textAlign: "center",
        color: "#000000",
        fontSize: 20,
    },
    btnRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 80,
    },
    display:{
        fontSize: 120,
        fontVariant: ["tabular-nums"],
        marginVertical: 20,
    },
    controls:{
        flexDirection: 'row',
        gap: 20,
        marginTop: 30,
    },
    counterText:{
        fontSize: 68,
    },
    centering:{
        alignItems: "center",
        justifyContent: "center",
    },
    changeTheme:{
        backgroundColor: "black",
        borderRadius: 10,
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    changeThemeText:{
        color: "white",
        fontSize: 40,
    }
});