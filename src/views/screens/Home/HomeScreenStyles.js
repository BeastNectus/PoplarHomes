import {StyleSheet} from 'react-native'

const HomeScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    buttonContainer: {
      marginVertical: 8,
      borderRadius: 10,
      overflow: "hidden",
      width: "80%"
    },
    header: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      width: 150,
      height: 50,
    },
    burgerIcon: {
      paddingHorizontal: 10,
    },
    searchBar: {
      marginVertical: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "100%",
      height: "100%",
      paddingHorizontal: 16,
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "80%",
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 16,
      paddingHorizontal: 10,
    },
    addButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#FF7400",
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    itemContainer: {
      marginBottom: 16,
      marginTop: 50,
    },
    image: {
      width: "100%",
      height: 200,
      marginBottom: 8,
      borderRadius: 5,
    },
    fullWidthDivider: {
      width: "100%",
      height: 1,
    },
    rentText: {
      color: "#FF7400",
      fontSize: 35,
      fontWeight: "bold",
    },
  });

  export default HomeScreenStyles